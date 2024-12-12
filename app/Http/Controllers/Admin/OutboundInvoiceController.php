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
        $userId = auth()->id(); // Lấy ID người dùng đang đăng nhập
    
        DB::beginTransaction();
        try {
            // Tạo hóa đơn xuất với staff_id là ID người đăng nhập
            $invoice = OutboundInvoice::create([
                'staff_id' => $userId, // Gán staff_id từ user đang đăng nhập
                'note' => $validated['note'] ?? null,
                'total_amount' => $validated['total_amount'],
                'status' => true,
                'created_by' => $userId,
            ]);
    
            // Lặp qua từng chi tiết hóa đơn
            foreach ($validated['details'] as $detail) {
                $productId = $detail['product_id'];
                $quantityExport = $detail['quantity_export'];
    
                // Lấy dòng tồn kho mới nhất cho sản phẩm (LIFO - Last In First Out)
                $inventory = Inventory::where('product_id', $productId)
                    ->orderBy('created_at', 'desc') // Lấy tồn kho mới nhất
                    ->lockForUpdate() // Khóa dữ liệu trong transaction
                    ->first();
    
                // Kiểm tra tồn kho có đủ số lượng để xuất không
                if (!$inventory || $inventory->quantity < $quantityExport) {
                    throw new \Exception("Sản phẩm ID $productId không đủ số lượng tồn kho để xuất.");
                }
    
                // Giảm tồn kho (chỉ sử dụng dòng mới nhất)
                $quantityOlded = $inventory->quantity; // Lưu lại số lượng ban đầu của dòng tồn kho
                $inventory->quantity -= $quantityExport;
                $inventory->save();
    
                // Tạo chi tiết hóa đơn xuất
                OutboundInvoiceDetail::create([
                    'outbound_invoice_id' => $invoice->id,
                    'product_id' => $productId,
                    'quantity_export' => $quantityExport,
                    'quantity_olded' => $quantityOlded, // Số lượng tồn kho ban đầu
                    'unit_price' => $detail['unit_price'],
                    'created_by' => $userId,
                ]);
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
                $request->only(['note', 'total_amount', 'status']),
                [
                    'updated_by' => $updatedBy,
                    'staff_id' => $updatedBy,
                ]
            ));
    
            foreach ($request->details as $detail) {
                $outboundDetail = OutboundInvoiceDetail::find($detail['id']);
    
                if ($outboundDetail) {
                    // Lấy dòng tồn kho mới nhất
                    $inventory = Inventory::where('product_id', $outboundDetail->product_id)
                        ->orderBy('created_at', 'desc') // Sắp xếp để lấy dòng mới nhất
                        ->first();
    
                    if (!$inventory) {
                        throw new \Exception("Sản phẩm ID {$outboundDetail->product_id} không tồn tại trong kho.");
                    }
    
                    // Hoàn lại số lượng tồn kho trước khi cập nhật
                    $inventory->quantity += $outboundDetail->quantity_export;
    
                    // Kiểm tra tồn kho có đủ số lượng để xuất
                    if ($inventory->quantity < $detail['quantity_export']) {
                        throw new \Exception("Sản phẩm ID {$outboundDetail->product_id} không đủ số lượng trong kho. Số lượng tồn hiện tại: {$inventory->quantity}.");
                    }
    
                    // Cập nhật chi tiết hóa đơn xuất
                    $outboundDetail->update([
                        'quantity_export' => $detail['quantity_export'],
                        'quantity_olded' => $inventory->quantity, // Lưu số lượng tồn kho trước khi xuất
                        'unit_price' => $detail['unit_price'],
                        'updated_by' => $updatedBy,
                    ]);
    
                    // Giảm tồn kho sau khi cập nhật
                    $inventory->quantity -= $detail['quantity_export'];
                    $inventory->save();
                } else {
                    // Xử lý thêm chi tiết mới nếu cần
                    $productId = $detail['product_id'];
    
                    // Lấy dòng tồn kho mới nhất
                    $inventory = Inventory::where('product_id', $productId)
                        ->orderBy('created_at', 'desc') // Sắp xếp để lấy dòng mới nhất
                        ->first();
    
                    if (!$inventory || $inventory->quantity < $detail['quantity_export']) {
                        throw new \Exception("Sản phẩm ID $productId không đủ số lượng trong kho. Số lượng tồn hiện tại: {$inventory->quantity}.");
                    }
    
                    // Tạo chi tiết hóa đơn mới
                    OutboundInvoiceDetail::create([
                        'outbound_invoice_id' => $invoice->id,
                        'product_id' => $productId,
                        'quantity_export' => $detail['quantity_export'],
                        'quantity_olded' => $inventory->quantity, // Lưu số lượng trước khi giảm
                        'unit_price' => $detail['unit_price'],
                        'created_by' => $updatedBy,
                    ]);
    
                    // Giảm tồn kho
                    $inventory->quantity -= $detail['quantity_export'];
                    $inventory->save();
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
