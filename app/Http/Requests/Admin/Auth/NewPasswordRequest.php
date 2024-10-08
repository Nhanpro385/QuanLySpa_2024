<?php

namespace App\Http\Requests\Admin\Auth;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class NewPasswordRequest extends FormRequest
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
            'email' => 'required',
            'token' => 'required',
            'password' => 'required|max:255|min:8|confirmed|different:current_password',
            'password_confirmation' => 'required|max:255|min:8|'
        ];
    }

    public function messages()
    {
        return [
            'token.required' => 'Có lỗi xảy ra',
            'current_password.required' => 'Mật khẩu hiện tại không được bỏ trống.',
            'current_password.string' => 'Mật khẩu hiện tại phải là một chuỗi ký tự.',
            'current_password.min' => 'Mật khẩu hiện tại phải có ít nhất :min ký tự.',

            'password.required' => 'Mật khẩu mới không được bỏ trống.',
            'password.string' => 'Mật khẩu mới phải là một chuỗi ký tự.',
            'password.min' => 'Mật khẩu mới phải có ít nhất :min ký tự.',
            'password.confirmed' => 'Xác nhận mật khẩu mới không trùng khớp.',
            'password.different' => 'Mật khẩu mới phải khác với mật khẩu hiện tại.',

            'password_confirmation.required' => 'Xác nhận mật khẩu không được bỏ trống.',
            'password_confirmation.string' => 'Xác nhận mật khẩu phải là một chuỗi ký tự.',
            'password_confirmation.min' => 'Xác nhận mật khẩu phải có ít nhất :min ký tự.',
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
