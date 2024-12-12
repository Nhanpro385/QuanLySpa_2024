<?php

namespace App\Http\Requests\Admin\InboundInvoices;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;
use App\Models\InboundInvoiceDetail;
use Illuminate\Contracts\Validation\Validator as contract;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\Models\Inventory;

class UpdateInboundInvoiceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }
    
    public function rules()
    {
        return [
            'supplier_id' => 'required|exists:suppliers,id',
            'note' => 'nullable|string|max:255',
            'total_amount' => 'required|numeric|min:0',
            'status' => 'required|boolean',
            'details' => 'nullable|array',
            'details.*.id' => 'required|exists:inbound_invoice_details,id',
            'details.*.product_id' => 'required|exists:products,id',
            'details.*.quantity_import' => 'required|integer|min:0',
            
           
            'details.*.unit_price' => 'required|numeric|min:0',
        ];
    }
    public function messages(): array
{
    return [
        'staff_id.required' => 'Trường nhân viên là bắt buộc.',
        'staff_id.exists' => 'Nhân viên không tồn tại trong hệ thống.',
        
        'supplier_id.required' => 'Trường nhà cung cấp là bắt buộc.',
        'supplier_id.exists' => 'Nhà cung cấp không tồn tại trong hệ thống.',

        'note.string' => 'Ghi chú phải là một chuỗi ký tự.',
        'note.max' => 'Ghi chú không được vượt quá :max ký tự.',

        'total_amount.required' => 'Tổng tiền là bắt buộc.',
        'total_amount.numeric' => 'Tổng tiền phải là một số.',
        'total_amount.min' => 'Tổng tiền phải lớn hơn hoặc bằng :min.',

        'status.required' => 'Trạng thái là bắt buộc.',
        'status.boolean' => 'Trạng thái chỉ được phép là true hoặc false.',

        'details.array' => 'Chi tiết hóa đơn phải là một mảng.',

        'details.*.id.required' => 'ID của chi tiết hóa đơn là bắt buộc.',
        'details.*.id.exists' => 'Chi tiết hóa đơn không tồn tại trong hệ thống.',

        'details.*.product_id.required' => 'Mã sản phẩm là bắt buộc.',
        'details.*.product_id.exists' => 'Sản phẩm không tồn tại trong hệ thống.',

        'details.*.quantity_import.required' => 'Số lượng nhập là bắt buộc.',
        'details.*.quantity_import.integer' => 'Số lượng nhập phải là số nguyên.',
        'details.*.quantity_import.min' => 'Số lượng nhập phải lớn hơn hoặc bằng :min.',

        'details.*.cost_import.required' => 'Giá nhập là bắt buộc.',
        'details.*.cost_import.numeric' => 'Giá nhập phải là một số.',
        'details.*.cost_import.min' => 'Giá nhập phải lớn hơn hoặc bằng :min.',

        'details.*.cost_olded.required' => 'Giá cũ là bắt buộc.',
        'details.*.cost_olded.numeric' => 'Giá cũ phải là một số.',
        'details.*.cost_olded.min' => 'Giá cũ phải lớn hơn hoặc bằng :min.',

        'details.*.unit_price.required' => 'Đơn giá là bắt buộc.',
        'details.*.unit_price.numeric' => 'Đơn giá phải là một số.',
        'details.*.unit_price.min' => 'Đơn giá phải lớn hơn hoặc bằng :min.',
    ];
}


public function withValidator(Validator $validator)
{
    $details = $this->input('details', []);

    // Tập hợp tất cả các `id` chi tiết cần kiểm tra
    $detailIds = array_column($details, 'id');

    // Lấy danh sách các inbound detail và inventory tương ứng
    $inboundDetails = InboundInvoiceDetail::whereIn('id', $detailIds)->get()->keyBy('id');
    $inventories = Inventory::whereIn('product_id', $inboundDetails->pluck('product_id'))->get()->keyBy('product_id');

    $validator->after(function ($validator) use ($details, $inboundDetails, $inventories) {
        foreach ($details as $detail) {
            $inboundDetail = $inboundDetails->get($detail['id']);

            if ($inboundDetail) {
                $inventory = $inventories->get($inboundDetail->product_id);

                if ($inventory) {
                    $currentStock = $inventory->quantity; // Số lượng hiện tại trong kho
                    $quantityImportedBefore = $inboundDetail->quantity_import; // Số lượng đã nhập trước đây
                    $quantityExported = $quantityImportedBefore - $currentStock; // Số lượng đã xuất

                    if ($detail['quantity_import'] < $quantityExported) {
                        $validator->errors()->add(
                            "details.{$detail['id']}.quantity_import",
                            "Số lượng nhập mới không được nhỏ hơn số lượng đã xuất ($quantityExported sản phẩm đã xuất)."
                        );
                    }
                }
            }
        }
    });
}




    public function failedValidation(contract $validator)
    {
        throw new HttpResponseException(
            response()->json([
                'status' => 'error',
                'message' => 'Dữ liệu đầu vào không hợp lệ.',
                'errors' => $validator->errors(),
            ], 422)
        );
    }
}