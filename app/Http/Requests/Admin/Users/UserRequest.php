<?php

namespace App\Http\Requests\Admin\Users;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class UserRequest extends FormRequest
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
            'id' => 'required|numeric|min:1000000000|max:9999999999999999999|unique:users,id',
            'position_id' => 'nullable|numeric|exists:positions,id',
            'name' => 'required|regex:/^(?!\s*\d).+$/|max:255|min:10|unique:users,name',
            'password' => 'required|min:8',
            'role' => 'required|string|in:supper,advice,staff',
            'full_name' => 'required|string|max:255|min:10|max:255',
            'gender' => 'nullable|in:male,female',
            'phone' => 'required|regex:/^(\+?\d{1,4}?)?(\d{10})$/|unique:users,phone',
            'email' => 'required|email|max:255|unique:users,email',
            'address' => 'required|string|max:255',
            'date_of_birth' => 'required|date|before:today',
            'note' => 'nullable|string',
            'status' => 'nullable',
            'created_by' => 'nullable|numeric|exists:users,id',
        ];
    }

    public function messages()
    {
        return [
            'id.required' => 'ID là bắt buộc không được để trống.',
            'id.numeric' => 'ID phải là số.',
            'id.min' => 'ID phải dài hơn hoặc bằng 10 số.',
            'id.max' => 'ID phải nhỏ hơn hoặc bằng 20 số.',
            'id.unique' => 'ID đã tồn tại trong hệ thống.',
            'position_id.numeric' => 'ID chức vụ phải là số.',
            'position_id.exists' => 'ID chức vụ không tồn tại.',
            'name.required' => 'Tên là bắt buộc không được để trống.',
            'name.regex' => 'Tên không được bắt đầu bằng số.',
            'name.max' => 'Tên không được dài quá 255 ký tự.',
            'name.min' => 'Tên phải có ít nhất 10 ký tự.',
            'name.unique' => 'Tên đã tồn tại.',
            'password.required' => 'Mật khẩu là bắt buộc.',
            'password.min' => 'Mật khẩu phải có ít nhất 8 ký tự.',
            'role.required' => 'Vai trò là bắt buộc.',
            'role.in' => 'Vai trò phải là một trong các giá trị: super, advice, staff.',
            'full_name.required' => 'Họ và tên là bắt buộc.',
            'full_name.string' => 'Họ và tên phải là chuỗi ký tự.',
            'full_name.max' => 'Họ và tên không được dài quá 255 ký tự.',
            'full_name.min' => 'Họ và tên phải có ít nhất 10 ký tự.',
            'gender.in' => 'Giới tính phải là nam hoặc nữ.',
            'phone.required' => 'Số điện thoại là bắt buộc.',
            'phone.regex' => 'Số điện thoại không hợp lệ.',
            'phone.unique' => "Số điện thoại đã tồn tại.",
            'email.required' => 'Email là bắt buộc.',
            'email.email' => 'Email không hợp lệ.',
            'email.max' => 'Email không được dài quá 255 ký tự.',
            'email.unique' => 'Email đã tồn tại.',
            'address.required' => 'Địa chỉ không được để trống.',
            'address.string' => 'Địa chỉ phải là chuỗi ký tự.',
            'address.max' => 'Địa chỉ không được dài quá 255 ký tự.',
            'date_of_birth.required' => 'Ngày sinh không được để trống.',
            'date_of_birth.date' => 'Ngày sinh không hợp lệ.',
            'date_of_birth.before' => 'Ngày sinh phải trước ngày hôm nay.',
            'note.string' => 'Ghi chú phải là chuỗi ký tự.',
            'created_by.numeric' => 'Người tạo phải là số.',
            'created_by.exists' => 'Người tạo không tồn tại.',
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