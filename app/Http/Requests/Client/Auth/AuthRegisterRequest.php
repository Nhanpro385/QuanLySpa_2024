<?php

namespace App\Http\Requests\Client\Auth;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class AuthRegisterRequest extends FormRequest
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
            'full_name' => "required|string|max:255|min:10|max:255",
            'password' => "required|string|min:8|max:255",
            'email' => 'required|email|max:255|unique:customers,email',
            'phone' => 'required|regex:/^(\+?\d{1,4}?)?(\d{10})$/|unique:customers,phone',
        ];
    }
    public function messages(): array
    {
        return [
            'full_name.required' => 'Họ và tên là trường bắt buộc.',
            'full_name.string' => 'Họ và tên phải là chuỗi ký tự.',
            'full_name.max' => 'Họ và tên không được vượt quá 255 ký tự.',
            'full_name.min' => 'Họ và tên phải có ít nhất 10 ký tự.',

            'password.required' => 'Mật khẩu là trường bắt buộc.',
            'password.string' => 'Mật khẩu phải là chuỗi ký tự.',
            'password.min' => 'Mật khẩu phải có ít nhất 8 ký tự.',
            'password.max' => 'Mật khẩu không được vượt quá 255 ký tự.',

            'email.required' => 'Email là trường bắt buộc.',
            'email.email' => 'Email phải là một địa chỉ email hợp lệ.',
            'email.max' => 'Email không được vượt quá 255 ký tự.',
            'email.unique' => 'Email này đã được sử dụng.',

            'phone.required' => 'Số điện thoại là trường bắt buộc.',
            'phone.regex' => 'Số điện thoại không hợp lệ.',
            'phone.unique' => 'Số điện thoại này đã được sử dụng.',
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
