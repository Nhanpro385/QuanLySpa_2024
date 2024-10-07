<?php

namespace App\Http\Requests\Admin\Auth;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class AuthLoginRequest extends FormRequest
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
            'email' => 'required|email|exists:users,email|max:250',
            'password' => 'required|max:255'
        ];
    }

    public function messages()
    {
        return [
            'email.required' => 'Email là bắt buộc không được bỏ trống.',
            'email.exists' => 'Email hiện tại không có trong hệ thống.',
            'email.email' => 'Email không hợp lệ.',
            'email.max' => 'Email không được dài quá 255 ký tự.',
            'password.required' => 'Mật khẩu là bắt buộc không được bỏ trống.',
            'password.max' => 'Vui lòng nhập mật khẩu phải có ít hơn 255 kí tự.',
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
