<?php

namespace App\Http\Requests\Admin\InboundInvoices;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreInboundInvoiceDetailRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }
    
    public function rules(): array
    {
        return [
            'product_id' => 'required|string|exists:products,id',
            'quantity_olded' => 'required|integer|min:0',
            'quantity_import' => 'required|integer|min:1',
            'cost_import' => 'required|numeric|min:0',
            'cost_olded' => 'required|numeric|min:0',
            'unit_price' => 'required|numeric|min:0',
        ];
    }
    
    public function messages(): array
    {
        return [
            'product_id.required' => 'ID sản phẩm là bắt buộc.',
            'product_id.string' => 'ID sản phẩm phải là chuỗi.',
            'product_id.exists' => 'ID sản phẩm không tồn tại trong hệ thống.',
            'quantity_olded.required' => 'Số lượng cũ là bắt buộc.',
            'quantity_olded.integer' => 'Số lượng cũ phải là số nguyên.',
            'quantity_olded.min' => 'Số lượng cũ phải lớn hơn hoặc bằng 0.',
            'quantity_import.required' => 'Số lượng nhập là bắt buộc.',
            'quantity_import.integer' => 'Số lượng nhập phải là số nguyên.',
            'quantity_import.min' => 'Số lượng nhập phải ít nhất là 1.',
            'cost_import.required' => 'Giá nhập là bắt buộc.',
            'cost_import.numeric' => 'Giá nhập phải là số.',
            'cost_import.min' => 'Giá nhập phải lớn hơn hoặc bằng 0.',
            'cost_olded.required' => 'Giá cũ là bắt buộc.',
            'cost_olded.numeric' => 'Giá cũ phải là số.',
            'cost_olded.min' => 'Giá cũ phải lớn hơn hoặc bằng 0.',
            'unit_price.required' => 'Giá bán là bắt buộc.',
            'unit_price.numeric' => 'Giá bán phải là số.',
            'unit_price.min' => 'Giá bán phải lớn hơn hoặc bằng 0.',
        ];
    }
    public function getValidatorInstance()
    {
        // Sử dụng phương thức để thêm logic hoặc kiểm tra nếu cần
        return parent::getValidatorInstance();
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
