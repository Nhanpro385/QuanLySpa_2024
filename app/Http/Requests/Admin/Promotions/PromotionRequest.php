<?php

namespace App\Http\Requests\Admin\Promotions;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class PromotionRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'id' => 'required|integer|digits_between:10,20|unique:promotions,id',
            'name' => 'required|string|max:255|unique:promotions,name|regex:/^[\p{L}0-9 ]+$/u',
            'description' => 'nullable|string',
            'status' => 'required|boolean',
            'created_by' => 'required|integer|exists:users,id',
            'start_date' => 'required|date|date_format:Y-m-d|after_or_equal:today',
            'end_date' => 'required|date|date_format:Y-m-d|after:start_date',
            'promotion_type' => 'required|in:cash,percent', 
            'discount_percent' => 'required_if:promotion_type,percent|numeric|between:1,100',
        ];
    }

    public function messages()
    {
        return [
            'id.required' => 'Id không được bỏ trống!',
            'id.digits_between' => 'Id phải có độ dài từ 10 đến 20 ký tự.',
            'id.integer' => 'Id phải là số nguyên.',
            'id.unique' => 'Id đã tồn tại!',
            'name.required' => 'Tên không được bỏ trống!',
            'name.max' => 'Tên không được vượt quá 255 ký tự.',
            'name.unique' => 'Tên đã tồn tại!',
            'name.regex' => 'Tên chỉ được phép chứa chữ cái và số.',
            'status.required' => 'Trạng thái không được bỏ trống!',
            'status.boolean' => 'Trạng thái phải là true hoặc false.',
            'created_by.required' => 'Người tạo không được bỏ trống!',
            'created_by.exists' => 'Người tạo phải là một người dùng hợp lệ.',
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
            'promotion_type.in' => 'Loại khuyến mãi phải là "cash" hoặc "percent".',
            'discount_percent.required_if' => 'Phần trăm giảm giá không được bỏ trống khi loại khuyến mãi là percent!',
            'discount_percent.numeric' => 'Phần trăm giảm giá phải là số.',
            'discount_percent.between' => 'Phần trăm giảm giá phải nằm trong khoảng từ 1 đến 100.',
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
