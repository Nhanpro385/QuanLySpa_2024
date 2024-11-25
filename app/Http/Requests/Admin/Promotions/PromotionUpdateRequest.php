<?php

namespace App\Http\Requests\Admin\Promotions;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class PromotionUpdateRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255|regex:/^[\p{L}0-9 ]+$/u',
            'description' => 'nullable|string',

            'start_date' => 'required|date|date_format:Y-m-d|after_or_equal:today',
            'end_date' => 'required|date|date_format:Y-m-d|after:start_date',

            'promotion_type' => 'required|in:0,1',

            'discount_percent' => [
                'nullable',
                'numeric',
                function ($attribute, $value, $fail) {
                    if ($this->promotion_type == 1 && ($value < 1 || $value > 100)) {
                        $fail('Giảm giá theo % phải nằm trong khoảng từ 1 đến 100.');
                    }

                    if ($this->promotion_type == 0 && $value < 1000) {
                        $fail('Giảm giá tiền mặt phải lớn hơn hoặc bằng 1000.');
                    }
                },
            ],

            'min_order_amount' => 'nullable|numeric|min:0',
            'min_quantity' => 'nullable|integer|min:1',
            'image_url' => 'nullable|image',
        ];
    }

    public function messages()
    {
        return [
            'name.unique' => 'Tên khuyến mãi này đã tồn tại!',
            'name.required' => 'Tên không được bỏ trống!',
            'name.max' => 'Tên không được vượt quá 255 ký tự.',
            'name.regex' => 'Tên chỉ được phép chứa chữ cái và số.',
            'description.string' => 'Mô tả phải là một chuỗi.',
            'start_date.required' => 'Ngày bắt đầu không được bỏ trống!',
            'start_date.date' => 'Ngày bắt đầu phải là một ngày hợp lệ.',
            'start_date.date_format' => 'Ngày bắt đầu phải có định dạng Y-m-d.',
            'start_date.after_or_equal' => 'Ngày bắt đầu phải là hôm nay hoặc sau đó.',
            'end_date.required' => 'Ngày kết thúc không được bỏ trống!',
            'end_date.date' => 'Ngày kết thúc phải là một ngày hợp lệ.',
            'end_date.date_format' => 'Ngày kết thúc phải có định dạng Y-m-d.',
            'end_date.after' => 'Ngày kết thúc phải sau ngày bắt đầu.',
            'promotion_type.required' => 'Loại khuyến mãi không được bỏ trống!',
            'promotion_type.in' => 'Loại khuyến mãi phải là "0" (giảm tiền mặt) hoặc "1" (giảm theo %).',
            'discount_percent.numeric' => 'Phần trăm giảm giá phải là số.',
            'discount_percent.between' => 'Phần trăm giảm giá phải nằm trong khoảng từ 1 đến 100.',
            'min_order_amount.numeric' => 'Số tiền đơn hàng tối thiểu phải là số.',
            'min_order_amount.min' => 'Số tiền đơn hàng tối thiểu phải lớn hơn hoặc bằng 0.',
            'min_quantity.integer' => 'Số lượng tối thiểu phải là số nguyên.',
            'min_quantity.min' => 'Số lượng tối thiểu phải lớn hơn hoặc bằng 1.',
            'image_url.image' => 'Ảnh không hợp lệ.',
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
