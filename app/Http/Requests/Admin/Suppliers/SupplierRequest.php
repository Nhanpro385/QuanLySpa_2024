<?php

namespace App\Http\Requests\Admin\Suppliers;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class SupplierRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'id' => 'required|numeric|digits_between:10,20|unique:suppliers,id',
            'name' => 'required|string|max:255|unique:suppliers,name|regex:/^[\p{L} ]+$/u',
            'country' => 'required|string|max:255',
            'contact_email' => 'required|email|unique:suppliers,contact_email',
            'code' => 'required|string|max:255|unique:suppliers,code',
            'created_by' => 'nullable|string|max:255',
            'status' => 'required|boolean',
        ];
    }

    public function messages()
    {
        return [
            'id.required' => 'Id không được bỏ trống!',
            'id.numeric' => 'Id phải là số.',
            'id.digits_between' => 'Id phải có từ 10 đến 20 chữ số không được quá 20 hoặc ít hơn 10.',
            'id.unique' => 'Id đã tồn tại!',
            'name.required' => 'Tên không được bỏ trống!',
            'name.max' => 'Tên không được vượt quá 255 ký tự.',
            'name.unique' => 'Tên đã tồn tại!',
            'name.regex' => 'Tên chỉ được phép chứa chữ cái.',
            'country.required' => 'Quốc gia không được bỏ trống!',
            'country.max' => 'Quốc gia không được vượt quá 255 ký tự.',
            'contact_email.required' => 'Email không được bỏ trống!',
            'contact_email.email' => 'Email không hợp lệ!',
            'contact_email.unique' => 'Email đã tồn tại!',
            'code.required' => 'Mã không được bỏ trống!',
            'code.max' => 'Mã không được vượt quá 255 ký tự.',
            'code.unique' => 'Mã đã tồn tại!',
            'created_by.max' => 'Người tạo không được vượt quá 255 ký tự.',
            'status.required' => 'Trạng thái không được bỏ trống!',
            'status.boolean' => 'Trạng thái phải là true hoặc false.',
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
