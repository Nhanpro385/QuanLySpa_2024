<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\Admin\InboundInvoices\StoreInboundInvoiceDetailRequest;
use App\Http\Requests\Admin\InboundInvoices\StoreInboundInvoiceRequest;
use App\Http\Resources\Admin\InboundInvoice\InboundInvoiceResource;
use App\Http\Requests\Admin\InboundInvoices\UpdateInboundInvoiceRequest;
use App\Http\Resources\Admin\InboundInvoice\InboundInvoiceCollection;
use App\Models\InboundInvoice;
use App\Models\Product;
use App\Models\InboundInvoiceDetail;
use App\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;
use App\Filters\Admin\InboundInvoiceFilter;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\Models\Inventory;

use Illuminate\Support\Facades\Validator;

use Illuminate\Http\Request;


class InboundInvoiceController extends Controller
{
    /**
     * Lấy danh sách hóa đơn nhập.
     */
    public function index(Request $request, InboundInvoiceFilter $filter)
    {
        // Lấy filter từ lớp InboundInvoiceFilter
        $filters = $filter->transform($request);

        // Khởi tạo query
        $query = InboundInvoice::query();

        // Áp dụng filter chính
        foreach ($filters['filter'] as $filterCondition) {
            $query->where(...$filterCondition);
        }

        // Áp dụng filter quan hệ
        foreach ($filters['relations'] as $relationFilter) {
            [$relation, $column, $operator, $value] = $relationFilter;
            $query = $filter->RelationFilters($query, $relation, $column, $value);
        }

        // Áp dụng sắp xếp
        [$sortBy, $sortOrder] = $filters['sorts'];
        $query->orderBy($sortBy, $sortOrder);

        // Lấy `perPage` từ request, mặc định 10
        $perPage = $request->input('perPage', 10);
        $invoices = $query->paginate($perPage);
       
    
        return (new InboundInvoiceCollection($invoices))->additional(['status' => true]);
     
    }


    public function store(StoreInboundInvoiceRequest $request)
    {
        $validated = $request->validated();
        $userId = auth()->id();
    
        DB::beginTransaction();
    
        try {
            $invoice = InboundInvoice::create([
                'staff_id' => $userId,
                'supplier_id' => $validated['supplier_id'],
                'note' => $validated['note'] ?? null,
                'total_amount' => $validated['total_amount'],
                'status' => true,
                'created_by' => $userId,
            ]);
    
            foreach ($validated['details'] as $detail) {
                $productId = $detail['product_id'];
    
                // Lấy dữ liệu cũ nhất từ inventory
                $latestInventory = Inventory::where('product_id', $productId)
                    ->orderByDesc('created_at')
                    ->first();
                $quantityOlded = $latestInventory->quantity ?? 0;
    
                $product = Product::findOrFail($productId);
                $costOlded = $product->cost ?? 0;
    
                $validator = Validator::make($detail, [
                    'product_id' => 'required|exists:products,id',
                    'quantity_import' => 'required|integer|min:1',
                    'cost_import' => 'required|numeric|min:0',
                    'unit_price' => 'required|numeric|min:0',
                ], [
                    'product_id.required' => 'Sản phẩm là bắt buộc.',
                    'product_id.exists' => 'Sản phẩm không tồn tại.',
                    'quantity_import.required' => 'Số lượng nhập là bắt buộc.',
                    'cost_import.required' => 'Giá nhập là bắt buộc.',
                    'unit_price.required' => 'Giá bán là bắt buộc.',
                ]);
    
                if ($validator->fails()) {
                    DB::rollBack();
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Chi tiết hóa đơn không hợp lệ.',
                        'errors' => $validator->errors(),
                    ], 422);
                }
    
                InboundInvoiceDetail::create([
                    'inbound_invoice_id' => $invoice->id,
                    'product_id' => $productId,
                    'quantity_olded' => $quantityOlded,
                    'quantity_import' => $detail['quantity_import'],
                    'cost_import' => $detail['cost_import'],
                    'cost_olded' => $costOlded,
                    'unit_price' => $detail['unit_price'],
                    'created_by' => $userId,
                ]);
    
                // Thêm một dòng mới trong Inventory
                Inventory::create([
                    'product_id' => $productId,
                    'quantity' => $detail['quantity_import'] + $quantityOlded,
                    'created_by' => $userId,
                ]);
            }
    
            DB::commit();
    
            return response()->json([
                'status' => 'success',
                'message' => 'Hóa đơn nhập được tạo thành công.',
                'data' => new InboundInvoiceResource($invoice->load('details.product', 'createdBy', 'updatedBy', 'supplier', 'staff')),
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình tạo hóa đơn nhập.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    
    /**
     * Lấy thông tin chi tiết một hóa đơn nhập.
     */
    public function show($id)
    {
        $invoice = InboundInvoice::with([
            'staff',
            'supplier',
            'details',
            'details.product',
            'createdBy',
            'updatedBy',
        ])->findOrFail($id);
    
        return new InboundInvoiceResource($invoice);
    }
    

    /**
     * Cập nhật một hóa đơn nhập.
     */
    public function update(UpdateInboundInvoiceRequest $request, $id)
    {
        DB::beginTransaction();
        try {
            // Tìm hóa đơn nhập hàng
            $invoice = InboundInvoice::findOrFail($id);
    
            // Lấy ID người dùng hiện tại
            $updatedBy = auth()->id();
    
            // Cập nhật thông tin hóa đơn (trừ các chi tiết liên quan đến tồn kho)
            $invoice->update(array_merge(
                $request->only([
                    'staff_id',
                    'supplier_id',
                    'note',
                    'total_amount',
                    'status',
                ]),
                ['updated_by' => $updatedBy] // Ghi nhận người cập nhật
            ));
    
            // Xử lý từng chi tiết hóa đơn
            foreach ($request->details as $detail) {
                // Tìm chi tiết hóa đơn
                $inboundDetail = InboundInvoiceDetail::find($detail['id']);
    
                if ($inboundDetail) {
                    // Khôi phục tồn kho trước khi cập nhật
                    $inventory = Inventory::where('product_id', $inboundDetail->product_id)->first();
                    if ($inventory) {
                        $inventory->quantity -= $inboundDetail->quantity_import; // Trừ số lượng cũ khỏi tồn kho
                        $inventory->save();
                    }
    
                    // Ngăn cập nhật các giá trị olded
                    unset($detail['quantity_olded'], $detail['cost_olded']);
    
                    // Cập nhật chi tiết hóa đơn (chỉ các trường được phép)
                    $inboundDetail->update($detail);
    
                    // Cập nhật tồn kho mới
                    $inventory = Inventory::where('product_id', $detail['product_id'])->first();
                    if ($inventory) {
                        $inventory->quantity += $detail['quantity_import']; // Cộng số lượng nhập mới vào tồn kho
                        $inventory->save();
                    }
                } else {
                    // Nếu chi tiết không tồn tại, tạo mới (nếu cần)
                    $newDetail = InboundInvoiceDetail::create([
                        'inbound_invoice_id' => $invoice->id,
                        'product_id' => $detail['product_id'],
                        'quantity_import' => $detail['quantity_import'],
                        'cost_import' => $detail['cost_import'],
                        'cost_olded' => $detail['cost_olded'], // Giá trị mới không thể thay đổi
                        'unit_price' => $detail['unit_price'],
                    ]);
    
                    // Cập nhật tồn kho cho sản phẩm mới
                    $inventory = Inventory::where('product_id', $detail['product_id'])->first();
                    if ($inventory) {
                        $inventory->quantity += $detail['quantity_import'];
                        $inventory->save();
                    } else {
                        // Nếu tồn kho không tồn tại, tạo mới
                        Inventory::create([
                            'product_id' => $detail['product_id'],
                            'quantity' => $detail['quantity_import'],
                        ]);
                    }
                }
            }
    
            // Commit transaction
            DB::commit();
    
            return response()->json([
                'status' => 'success',
                'message' => 'Hóa đơn nhập hàng và tồn kho đã được cập nhật thành công',
                'data' => $invoice->fresh(),
            ]);
        } catch (\Exception $e) {
            // Rollback transaction khi có lỗi
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi trong quá trình cập nhật',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    
    
    /**
     * Xóa một hóa đơn nhập (soft delete).
     */
    public function destroy(InboundInvoice $inboundInvoice)
    {
        try {
            $inboundInvoice->delete();
            return response()->json(['message' => 'Hóa đơn nhập đã được xóa thành công.']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi xóa hóa đơn nhập.'], 500);
        }
    }
}
