<?php

namespace App\Http\Requests\Admin\Payments;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class PaymentRequest extends FormRequest
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
            'id' => 'required|numeric|min:1000000000|max:9999999999999999999|unique:payments,id',
            'promotion_name' => 'nullable|exists:promotions,name',
            'payment_type' => 'required|numeric',
            'products' => 'required|array',
            'products.*.product_id' => 'required|numeric|exists:products,id',
            'products.*.quantity' => 'required|numeric|min:1',
        ];
    }

    public function messages()
    {
        return [
            'id.required' => 'Mã là bắt buộc.',
            'id.numeric' => 'Mã phải là số.',
            'id.min' => 'Mã phải lớn hơn hoặc bằng 10 chữ số.',
            'id.max' => 'Mã không được vượt quá 19 chữ số.',
            'id.unique' => 'Mã đã tồn tại.',
            'promotion_name.exists' => 'Không tìm thấy mã khuyến mãi.',
            'payment_type.required' => 'Loại thanh toán là bắt buộc.',
            'payment_type.numeric' => 'Loại thanh toán phải là số.',
            'products.array' => 'Danh sách sản phẩm phải là một mảng.',
            'products.*.product_id.required' => 'Mã sản phẩm là bắt buộc.',
            'products.*.product_id.numeric' => 'Mã sản phẩm phải là số.',
            'products.*.product_id.exists' => 'Mã sản phẩm không tồn tại.',
            'products.*.quantity.required' => 'Số lượng là bắt buộc.',
            'products.*.quantity.numeric' => 'Số lượng phải là số.',
            'products.*.quantity.min' => 'Số lượng phải lớn hơn hoặc bằng 1.',
            'products.required' => 'Vui lòng thêm sản phẩm.'
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
