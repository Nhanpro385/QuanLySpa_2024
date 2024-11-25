<?php

namespace App\Http\Requests\Admin\Services;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class ServiceProductsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'products' => 'nullable|array',
            'products.*.product_id' => 'required|exists:products,id',
            'products.*.quantity_used' => 'required|integer|min:1',
        ];
    }

    public function messages()
    {
        return [
            'products.required' => 'Danh sách sản phẩm là bắt buộc.',
            'products.array' => 'Danh sách sản phẩm phải là một mảng.',
            'products.*.product_id.required' => 'Mỗi sản phẩm phải có mã sản phẩm.',
            'products.*.product_id.exists' => 'Mã sản phẩm không hợp lệ.',
            'products.*.quantity_used.required' => 'Số lượng sử dụng là bắt buộc.',
            'products.*.quantity_used.integer' => 'Số lượng sử dụng phải là số nguyên.',
            'products.*.quantity_used.min' => 'Số lượng sử dụng phải lớn hơn hoặc bằng 1.'
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            response()->json([
                'status' => 'error',
                'message' => 'Dữ liệu đầu vào không hợp lệ.',
                'errors' => $validator->errors()
            ], 422)
        );
    }
}
