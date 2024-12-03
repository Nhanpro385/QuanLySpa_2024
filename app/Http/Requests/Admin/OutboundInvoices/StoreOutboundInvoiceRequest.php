<?php

namespace App\Http\Requests\Admin\OutboundInvoices;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreOutboundInvoiceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
           
            'note' => 'nullable|string|max:255',
            'total_amount' => 'required|numeric|min:0',
            'details' => 'required|array|min:1',
            'details.*.product_id' => 'required|exists:products,id',
            'details.*.quantity_export' => 'required|integer|min:1',
            'details.*.unit_price' => 'required|numeric|min:0',
        ];
    }

    public function messages(): array
    {
        return [
            'customer_id.required' => 'Trường khách hàng là bắt buộc.',
            'customer_id.exists' => 'Khách hàng không tồn tại trong hệ thống.',
            'note.string' => 'Ghi chú phải là một chuỗi ký tự.',
            'note.max' => 'Ghi chú không được vượt quá :max ký tự.',
            'total_amount.required' => 'Tổng tiền là bắt buộc.',
            'total_amount.numeric' => 'Tổng tiền phải là một số.',
            'total_amount.min' => 'Tổng tiền phải lớn hơn hoặc bằng :min.',
            'details.required' => 'Chi tiết hóa đơn là bắt buộc.',
            'details.array' => 'Chi tiết hóa đơn phải là một mảng.',
            'details.min' => 'Phải có ít nhất một chi tiết hóa đơn.',
            'details.*.product_id.required' => 'Mã sản phẩm là bắt buộc.',
            'details.*.product_id.exists' => 'Sản phẩm không tồn tại trong hệ thống.',
            'details.*.quantity_export.required' => 'Số lượng xuất là bắt buộc.',
            'details.*.quantity_export.integer' => 'Số lượng xuất phải là số nguyên.',
            'details.*.quantity_export.min' => 'Số lượng xuất phải lớn hơn hoặc bằng :min.',
            'details.*.unit_price.required' => 'Đơn giá là bắt buộc.',
            'details.*.unit_price.numeric' => 'Đơn giá phải là một số.',
            'details.*.unit_price.min' => 'Đơn giá phải lớn hơn hoặc bằng :min.',
        ];
    }

    public function failedValidation(Validator $validator)
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
