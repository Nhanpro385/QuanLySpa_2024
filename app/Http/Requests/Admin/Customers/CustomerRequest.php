<?php

namespace App\Http\Requests\Admin\Customers;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class CustomerRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'id' => 'required|digits_between:10,20|integer|unique:customers,id',
            'full_name' => 'required|string|max:255|regex:/^[\p{L} ]+$/u',
            'note' => 'nullable|string|max:255',

            'email' => 'required|email|max:255|unique:customers,email',
            'phone' => 'required|digits_between:10,15|unique:customers,phone|regex:/^(0[3,5,7,8,9][0-9]{8})$/',

            'gender' => 'required|integer|in:0,1,2',
            'address' => 'required|string|max:255',
            'date_of_birth' => 'required|date|before_or_equal:today',
            'status' => 'required|boolean',
        ];
    }

    public function messages()
    {
        return [
            'id.required' => 'Id không được bỏ trống!',
            'id.digits_between' => 'Id phải có độ dài từ 10 đến 20 ký tự số.',
            'id.integer' => 'Id phải là số nguyên.',
            'id.unique' => 'Id đã tồn tại!',
            'full_name.required' => 'Họ và tên không được bỏ trống!',
            'full_name.max' => 'Họ và tên không được vượt quá 255 ký tự.',
            'full_name.regex' => 'Họ và tên chỉ được phép chứa chữ cái.',
            'note.max' => 'Ghi chú không được vượt quá 255 ký tự.',

            'email.required' => 'Email không được bỏ trống!',
            'email.email' => 'Định dạng email không hợp lệ.',
            'email.max' => 'Email không được vượt quá 255 ký tự.',
            'email.unique' => 'Email đã tồn tại!',
            'phone.required' => 'Số điện thoại không được bỏ trống!',
            'phone.digits_between' => 'Số điện thoại phải có độ dài từ 10 đến 15 ký tự số.',
            'phone.unique' => 'Số điện thoại đã tồn tại!',
            'phone.regex' => 'Số điện thoại không đúng định dạng. Nó phải bắt đầu bằng 034 hoặc 09.',
            'gender.required' => 'Giới tính không được bỏ trống!',
            'gender.integer' => 'Giới tính phải là số nguyên.',
            'gender.in' => 'Giới tính không hợp lệ. Chọn 0 (Nam), 1 (Nữ) hoặc 2 (Khác).',
            'address.required' => 'Địa chỉ không được bỏ trống!',
            'address.max' => 'Địa chỉ không được vượt quá 255 ký tự.',
            'date_of_birth.before_or_equal' => 'Ngày sinh phải trước ngày hôm nay.',
            'date_of_birth.date' => 'Định dạng ngày sinh không hợp lệ.',
            'date_of_birth.required' => 'Ngày sinh không được để trống.',
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
                'errors' => $validator->errors()
            ], 422)
        );
    }
}
