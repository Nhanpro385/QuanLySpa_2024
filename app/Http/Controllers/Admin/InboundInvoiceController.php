<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\Admin\InboundInvoices\StoreInboundInvoiceDetailRequest;
use App\Http\Requests\Admin\InboundInvoices\StoreInboundInvoiceRequest;
use App\Http\Resources\Admin\InboundInvoice\InboundInvoiceResource;
use App\Http\Requests\Admin\InboundInvoices\UpdateInboundInvoiceRequest;
use App\Http\Resources\Admin\InboundInvoice\InboundInvoiceCollection;
use App\Models\InboundInvoice;
use App\Models\OutboundInvoice;
use App\Models\OutboundInvoiceDetail;


use App\Models\Product;
use App\Models\InboundInvoiceDetail;
use App\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;
use App\Filters\Admin\InboundInvoiceFilter;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\Models\Inventory;use Exception;


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

    public function update(UpdateInboundInvoiceRequest $request, $inboundInvoiceId)
    {
        $data = $request->validated();
    
        DB::beginTransaction();
    
        try {
            // Retrieve and update the invoice
            $inboundInvoice = InboundInvoice::findOrFail($inboundInvoiceId);
            $inboundInvoice->update([
                'supplier_id' => $data['supplier_id'] ?? $inboundInvoice->supplier_id,
                'invoice_date' => $data['invoice_date'] ?? $inboundInvoice->invoice_date,
                'total_amount' => $data['total_amount'] ?? $inboundInvoice->total_amount,
                'updated_by' => auth()->id(),
            ]);
    
            // Update invoice details and inventories
            foreach ($data['details'] as $detail) {
                // Find the invoice detail
                $inboundDetail = InboundInvoiceDetail::findOrFail($detail['id']);
    
                // Calculate quantity change
                $quantityChange = $detail['quantity_import'] - $inboundDetail->quantity_import;
    
                // Update the inbound detail
                $inboundDetail->update([
                    'quantity_import' => $detail['quantity_import'],
                    'unit_price' => $detail['unit_price'] ?? $inboundDetail->unit_price,
                    'total_price' => ($detail['unit_price'] ?? $inboundDetail->unit_price) * $detail['quantity_import'],
                ]);
    
                // Update the latest inventory for the product
                $latestInventory = Inventory::where('product_id', $detail['product_id'])
                    ->orderByDesc('created_at')
                    ->firstOrFail();
    
                // Ensure inventory quantity is consistent
                $latestInventory->update([
                    'quantity' => $latestInventory->quantity + $quantityChange,
                    'updated_by' => auth()->id(),
                ]);
            }
    
            DB::commit();
    
            return response()->json([
                'status' => 'success',
                'message' => 'Hóa đơn nhập đã được cập nhật thành công.',
                'data' => new InboundInvoiceResource($inboundInvoice->load('details.product', 'supplier', 'staff')),
            ]);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => 'Đã xảy ra lỗi khi cập nhật hóa đơn nhập.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    
    
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
