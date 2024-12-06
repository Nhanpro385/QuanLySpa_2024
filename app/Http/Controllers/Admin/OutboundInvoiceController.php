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
        
            // Lấy danh sách tồn kho của sản phẩm theo thứ tự LIFO (mới nhất trước)
            $inventories = Inventory::where('product_id', $productId)
                ->orderBy('created_at', 'desc') // Ưu tiên tồn kho mới nhất
                ->lockForUpdate() // Khóa dữ liệu trong transaction
                ->get();
        
            foreach ($inventories as $inventory) {
                if ($quantityExport <= 0) {
                    break; // Đã xuất đủ số lượng
                }
        
                if ($inventory->quantity >= $quantityExport) {
                    // Giảm tồn kho và thoát vòng lặp nếu đủ
                    $inventory->quantity -= $quantityExport;
                    $inventory->save();
                    $quantityExport = 0;
                } else {
                    // Sử dụng toàn bộ tồn kho của dòng này
                    $quantityExport -= $inventory->quantity;
                    $inventory->quantity = 0;
                    $inventory->save();
                }
            }
        
            // Nếu vẫn còn số lượng cần xuất nhưng không đủ tồn kho
            if ($quantityExport > 0) {
                throw new \Exception("Sản phẩm ID $productId không đủ số lượng tồn kho để xuất.");
            }
        
            // Tạo chi tiết hóa đơn xuất
            OutboundInvoiceDetail::create([
                'outbound_invoice_id' => $invoice->id,
                'product_id' => $productId,
                'quantity_export' => $detail['quantity_export'],
                'quantity_olded' => $inventory->quantity ?? 0, // Lưu số lượng tồn kho ban đầu của dòng cuối cùng
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
                $request->only(['staff_id', 'note', 'total_amount', 'status']),
                ['updated_by' => $updatedBy]
            ));
    
            // Duyệt qua từng chi tiết hóa đơn để xử lý
            foreach ($request->details as $detail) {
                $outboundDetail = OutboundInvoiceDetail::find($detail['id']);
    
                if ($outboundDetail) {
                    // Lấy thông tin tồn kho sản phẩm
                    $inventory = Inventory::where('product_id', $outboundDetail->product_id)->first();
                    if (!$inventory) {
                        throw new \Exception("Sản phẩm ID {$outboundDetail->product_id} không tồn tại trong kho.");
                    }
    
                    // Hoàn lại số lượng tồn kho trước khi cập nhật
                    $inventory->quantity += $outboundDetail->quantity_export;
    
                    // Kiểm tra tồn kho mới
                    if ($inventory->quantity < $detail['quantity_export']) {
                        throw new \Exception("Sản phẩm ID {$outboundDetail->product_id} không đủ số lượng trong kho.");
                    }
    
                    // Cập nhật chi tiết hóa đơn
                    $outboundDetail->update([
                        'quantity_export' => $detail['quantity_export'],
                        'quantity_olded' => $inventory->quantity, // Lưu số lượng trước khi giảm
                        'unit_price' => $detail['unit_price'],
                        'updated_by' => $updatedBy,
                    ]);
    
                    // Giảm tồn kho sau khi cập nhật
                    $inventory->quantity -= $detail['quantity_export'];
                    $inventory->save();
                } else {
                    // Xử lý thêm chi tiết mới nếu cần
                    $productId = $detail['product_id'];
    
                    // Lấy tồn kho sản phẩm
                    $inventory = Inventory::where('product_id', $productId)->first();
                    if (!$inventory || $inventory->quantity < $detail['quantity_export']) {
                        throw new \Exception("Sản phẩm ID $productId không đủ số lượng trong kho.");
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
