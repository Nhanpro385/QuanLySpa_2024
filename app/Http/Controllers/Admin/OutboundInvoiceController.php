<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\Admin\OutboundInvoices\StoreOutboundInvoiceRequest;
use App\Http\Requests\Admin\OutboundInvoices\StoreOutboundInvoiceDetailRequest;
use App\Http\Requests\Admin\OutboundInvoices\UpdateOutboundInvoiceRequest;
use App\Http\Resources\Admin\OutboundInvoice\OutboundInvoiceResource;
use App\Http\Resources\Admin\OutboundInvoice\OutboundInvoiceCollection;
use App\Models\OutboundInvoice;
use App\Models\Product;
use App\Models\OutboundInvoiceDetail;
use App\Http\Controllers\Controller;
use App\Models\Inventory;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OutboundInvoiceController extends Controller
{
    /**
     * Lấy danh sách hóa đơn xuất.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 10);
        $invoices = OutboundInvoice::query()
            ->with(['details.product', 'createdBy', 'updatedBy', 'staff'])
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

        return (new OutboundInvoiceCollection($invoices))->additional(['status' => true]);
    }

    /**
     * Tạo hóa đơn xuất hàng.
     */
    public function store(StoreOutboundInvoiceRequest $request)
    {
        $validated = $request->validated();
        $userId = auth()->id();
    
        DB::beginTransaction();
        try {
            // Tạo hóa đơn xuất
            $invoice = OutboundInvoice::create([
                'staff_id' => $userId,
                'note' => $validated['note'] ?? null,
                'total_amount' => $validated['total_amount'],
                'status' => true,
                'created_by' => $userId,
            ]);
    
            // Lặp qua từng chi tiết hóa đơn
            foreach ($validated['details'] as $detail) {
                $productId = $detail['product_id'];
    
                // Lấy dữ liệu từ bảng `inventories`
                $inventory = Inventory::where('product_id', $productId)->first();
                $quantityOlded = $inventory->quantity ?? 0; // Nếu không có dữ liệu, gán mặc định là 0
    
                // Kiểm tra tồn kho
                if (!$inventory || $inventory->quantity < $detail['quantity_export']) {
                    throw new \Exception("Sản phẩm ID $productId không đủ số lượng tồn kho.");
                }
    
                // Lấy dữ liệu từ bảng `products`
                $product = Product::findOrFail($productId);
    
                // Validate chi tiết hóa đơn
                $validator = Validator::make($detail, [
                    'product_id' => 'required|exists:products,id',
                    'quantity_export' => 'required|integer|min:1',
                    'unit_price' => 'required|numeric|min:0',
                ], [
                    'product_id.required' => 'Sản phẩm là bắt buộc.',
                    'product_id.exists' => 'Sản phẩm không tồn tại.',
                    'quantity_export.required' => 'Số lượng xuất là bắt buộc.',
                    'unit_price.required' => 'Đơn giá là bắt buộc.',
                ]);
    
                if ($validator->fails()) {
                    DB::rollBack();
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Chi tiết hóa đơn không hợp lệ.',
                        'errors' => $validator->errors(),
                    ], 422);
                }
    
                // Tạo chi tiết hóa đơn
                OutboundInvoiceDetail::create([
                    'outbound_invoice_id' => $invoice->id,
                    'product_id' => $productId,
                    'quantity_export' => $detail['quantity_export'],
                    'quantity_olded' => $quantityOlded,
                    'unit_price' => $detail['unit_price'],
                    'created_by' => $userId,
                ]);
    
                // Cập nhật tồn kho
                $inventory->quantity -= $detail['quantity_export'];
                $inventory->save();
            }
    
            DB::commit();
            return response()->json([
                'status' => 'success',
                'message' => 'Hóa đơn xuất được tạo thành công.',
                'data' => new OutboundInvoiceResource($invoice->load('details.product', 'createdBy', 'updatedBy', 'staff')),
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình tạo hóa đơn xuất.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    

    /**
     * Lấy thông tin chi tiết một hóa đơn xuất.
     */
    public function show($id)
{
    // Lấy dữ liệu hóa đơn với các quan hệ cần thiết
    $invoice = OutboundInvoice::with([
        'staff',
        'details',
        'details.product',
        'createdBy',
        'updatedBy',
    ])->findOrFail($id);

    // Trả về resource
    return new OutboundInvoiceResource($invoice);
}


    /**
     * Cập nhật hóa đơn xuất.
     */
    public function update(UpdateOutboundInvoiceRequest $request, $id)
{
    DB::beginTransaction();
    try {
        $invoice = OutboundInvoice::findOrFail($id);
        $updatedBy = auth()->id();

        // Cập nhật thông tin hóa đơn chính
        $invoice->update(array_merge(
            $request->only(['staff_id', 'note', 'total_amount', 'status']),
            ['updated_by' => $updatedBy]
        ));

        foreach ($request->details as $detail) {
            $outboundDetail = OutboundInvoiceDetail::find($detail['id']);

            if ($outboundDetail) {
                // Lấy thông tin tồn kho sản phẩm
                $inventory = Inventory::where('product_id', $outboundDetail->product_id)->first();

                if (!$inventory) {
                    throw new \Exception("Sản phẩm ID {$outboundDetail->product_id} không tồn tại trong kho.");
                }

                // Hoàn lại số lượng tồn kho cũ trước khi cập nhật
                $inventory->quantity += $outboundDetail->quantity_export;
                $inventory->save();

                // Kiểm tra tồn kho mới có đủ để cập nhật không
                if ($inventory->quantity < $detail['quantity_export']) {
                    throw new \Exception("Sản phẩm ID {$outboundDetail->product_id} không đủ số lượng trong kho.");
                }

                // Cập nhật chi tiết hóa đơn
                $outboundDetail->update([
                    'quantity_export' => $detail['quantity_export'],
                    'quantity_olded' => $inventory->quantity, // Lưu lại số lượng tồn kho trước khi giảm
                    'unit_price' => $detail['unit_price'],
                    'updated_by' => $updatedBy,
                ]);

                // Giảm số lượng tồn kho sau khi cập nhật
                $inventory->quantity -= $detail['quantity_export'];
                $inventory->save();
            } else {
                throw new \Exception("Không tìm thấy chi tiết hóa đơn ID: {$detail['id']}");
            }
        }

        DB::commit();
        return response()->json([
            'status' => 'success',
            'message' => 'Hóa đơn xuất được cập nhật thành công.',
            'data' => new OutboundInvoiceResource($invoice->load('details.product', 'createdBy', 'updatedBy', 'staff')),
        ]);
    } catch (\Exception $e) {
        DB::rollBack();
        return response()->json([
            'status' => 'error',
            'message' => 'Đã xảy ra lỗi trong quá trình cập nhật.',
            'error' => $e->getMessage(),
        ], 500);
    }
}


    /**
     * Xóa một hóa đơn xuất (soft delete).
     */
    public function destroy(OutboundInvoice $outboundInvoice)
    {
        try {
            $outboundInvoice->delete();
            return response()->json(['message' => 'Hóa đơn xuất đã được xóa thành công.']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi xóa hóa đơn xuất.'], 500);
        }
    }
}
