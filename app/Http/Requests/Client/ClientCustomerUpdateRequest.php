<?php

namespace App\Http\Requests\Client;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Str;

class ClientCustomerUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        // Kiểm tra xem người dùng có quyền thực hiện yêu cầu này hay không
        return true; // Đặt thành true để cho phép tất cả các yêu cầu
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'full_name' => 'required|string|max:255|regex:/^[\p{L} ]+$/u', // Chỉ chứa chữ cái và khoảng trắng
            'note' => 'nullable|string|max:255',
            'email' => 'required|email|max:255|unique:customers,email,' . $this->route('id'), // Kiểm tra email trùng với id
            'phone' => 'required|digits_between:10,15|unique:customers,phone,' . $this->route('id') . '|regex:/^(0[3,5,7,8,9][0-9]{8})$/', // Kiểm tra phone trùng với id
            'gender' => 'required|integer|in:0,1,2', // Giới tính (0: Nam, 1: Nữ, 2: Khác)
            'address' => 'nullable|string|max:255',
            'date_of_birth' => 'nullable|date', // Kiểm tra định dạng ngày sinh
            'status' => 'required|boolean', // Trạng thái true/false
            'password' => 'nullable|string|min:8|max:255', // Mật khẩu mới nếu có
        ];
    }

    /**
     * Custom error messages for validation.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'full_name.required' => 'Họ và tên không được bỏ trống!',
            'full_name.max' => 'Họ và tên không được vượt quá 255 ký tự.',
            'full_name.regex' => 'Họ và tên chỉ được phép chứa chữ cái.',
            'note.max' => 'Ghi chú không được vượt quá 255 ký tự.',
            'email.required' => 'Email không được bỏ trống!',
            'email.email' => 'Định dạng email không hợp lệ.',
            'email.max' => 'Email không được vượt quá 255 ký tự.',
            'email.unique' => 'Email đã tồn tại!',
            'phone.required' => 'Số điện thoại không được bỏ trống!',
            'phone.digits_between' => 'Số điện thoại phải có độ dài từ 10 đến 15 ký tự.',
            'phone.unique' => 'Số điện thoại đã tồn tại!',
            'phone.regex' => 'Số điện thoại không đúng định dạng. Nó phải bắt đầu bằng 034 hoặc 09.',
            'gender.required' => 'Giới tính không được bỏ trống!',
            'gender.integer' => 'Giới tính phải là số nguyên.',
            'gender.in' => 'Giới tính không hợp lệ. Chọn 0 (Nam), 1 (Nữ) hoặc 2 (Khác).',
            'address.max' => 'Địa chỉ không được vượt quá 255 ký tự.',
            'date_of_birth.date' => 'Định dạng ngày sinh không hợp lệ.',
            'status.required' => 'Trạng thái không được bỏ trống!',
            'status.boolean' => 'Trạng thái phải là true hoặc false.',
            'password.min' => 'Mật khẩu phải có ít nhất 8 ký tự.',
            'password.max' => 'Mật khẩu không được vượt quá 255 ký tự.',
        ];
    }

    /**
     * Handle a failed validation attempt.
     *
     * @param  \Illuminate\Contracts\Validation\Validator  $validator
     * @return void
     * @throws \Illuminate\Http\Exceptions\HttpResponseException
     */
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

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation()
    {
        $this->merge([
            'id' => $this->route('id'),
            // Tạo mật khẩu ngẫu nhiên nếu cần
            'password' => $this->password ? $this->password : $this->generateRandomPassword(),
        ]);
    }

    /**
     * Generate a random password.
     *
     * @param  int  $length
     * @return string
     */
    private function generateRandomPassword($length = 8)
    {
        return Str::random($length);
    }
}
