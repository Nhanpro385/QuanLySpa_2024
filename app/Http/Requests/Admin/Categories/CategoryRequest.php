<?php

namespace App\Http\Requests\Admin\Categories;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class CategoryRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'id' => 'required|digits_between:10,20|integer|unique:categories,id',
            'name' => 'required|string|max:255|unique:categories,name|regex:/^[\p{L} ]+$/u',
            'description' => 'required|nullable|string',
            'status' => 'required|boolean',
            'parent_id' => 'digits_between:10,20|integer|exists:categories,id',
        ];
    }

    public function messages()
    {
        return [
            'id.required' => 'Id không được bỏ trống!',
            'id.digits_between' => 'Id phải có độ dài từ 10 đến 20 ký tự số không được quá 20 hoặc ít hơn 10.',
            'id.integer' => 'Id phải là số nguyên.',
            'id.unique' => 'Id đã tồn tại!',
            'name.required' => 'Tên không được bỏ trống!',
            'name.max' => 'Tên không được vượt quá 255 ký tự.',
            'name.unique' => 'Tên đã tồn tại!',
            'name.regex' => 'Tên chỉ được phép chứa chữ cái.',
            'status.required' => 'Trạng thái không được bỏ trống!',
            'status.boolean' => 'Trạng thái phải là true hoặc false.',
            'description.required' => 'Mô tả không được bỏ trống!',

            'parent_id.digits_between' => 'Parent ID phải có độ dài từ 10 đến 20 ký tự số.',
            'parent_id.integer' => 'Parent ID phải là số nguyên.',
            'parent_id.exists' => 'Parent ID không tồn tại trong danh mục.',
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
