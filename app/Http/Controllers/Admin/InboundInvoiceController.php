<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\Admin\InboundInvoices\StoreInboundInvoiceDetailRequest;
use App\Http\Requests\Admin\InboundInvoices\StoreInboundInvoiceRequest;
use App\Http\Resources\Admin\InboundInvoice\InboundInvoiceResource;
use App\Http\Requests\Admin\InboundInvoices\UpdateInboundInvoiceRequest;
use App\Http\Resources\Admin\InboundInvoice\InboundInvoiceCollection;
use App\Models\InboundInvoice;
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
            // Tạo InboundInvoice
            $invoice = InboundInvoice::create([
                'staff_id' => $validated['staff_id'],
                'supplier_id' => $validated['supplier_id'],
                'note' => $validated['note'] ?? null,
                'total_amount' => $validated['total_amount'],
                'status' => true,
                'created_by' => $userId, // Gán người tạo
            ]);

            // Lặp qua từng chi tiết
            foreach ($validated['details'] as $detail) {
                // Validate từng chi tiết
                $validator = Validator::make($detail, [
                    'product_id' => 'required|exists:products,id',
                    'quantity_olded' => 'required|integer|min:0',
                    'quantity_import' => 'required|integer|min:1',
                    'cost_import' => 'required|numeric|min:0',
                    'cost_olded' => 'required|numeric|min:0',
                    'unit_price' => 'required|numeric|min:0',
                ], [
                    'product_id.required' => 'Sản phẩm là bắt buộc.',
                    'product_id.exists' => 'Sản phẩm không tồn tại.',
                    'quantity_olded.required' => 'Số lượng cũ là bắt buộc.',
                    'quantity_import.required' => 'Số lượng nhập là bắt buộc.',
                    'cost_import.required' => 'Giá nhập là bắt buộc.',
                    'cost_olded.required' => 'Giá cũ là bắt buộc.',
                    'unit_price.required' => 'Giá bán là bắt buộc.',
                ]);

                if ($validator->fails()) {
                    // Hủy lưu trữ nếu bất kỳ chi tiết nào không hợp lệ
                    DB::rollBack();
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Chi tiết hóa đơn không hợp lệ.',
                        'errors' => $validator->errors(),
                    ], 422);
                }

                // Tạo chi tiết hóa đơn
                InboundInvoiceDetail::create(array_merge($detail, [
                    'inbound_invoice_id' => $invoice->id,
                    'created_by' => $userId, // Gán người tạo cho từng chi tiết
                ]));
            }

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Hóa đơn nhập được tạo thành công.',
                'data' => $invoice->load('details'),
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
    public function show(InboundInvoice $inboundInvoice)
    {
        $inboundInvoice->load(['details', 'createdBy', 'updatedBy']);
        return new InboundInvoiceResource($inboundInvoice);
    }

    /**
     * Cập nhật một hóa đơn nhập.
     */
    public function update(UpdateInboundInvoiceRequest $request, $id)
    {
        try {
            $invoice = InboundInvoice::findOrFail($id);
    
            // Cập nhật thông tin chính
            $invoice->update($request->only([
                'staff_id',
                'supplier_id',
                'note',
                'total_amount',
                'status',
            ]));
    
            // Xử lý chi tiết hóa đơn
            foreach ($request->details as $detail) {
                $inboundDetail = InboundInvoiceDetail::find($detail['id']);
    
                if ($inboundDetail) {
                    $inboundDetail->update($detail);
                }
            }
    
            return response()->json([
                'status' => 'success',
                'message' => 'Hóa đơn nhập hàng đã được cập nhật thành công',
                'data' => $invoice->fresh(),
            ]);
        } catch (\Exception $e) {
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
