<?php
namespace App\Http\Requests\Admin\Contacts;

use Illuminate\Foundation\Http\FormRequest;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateContactRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Thay đổi theo yêu cầu bảo mật
    }

    public function rules(): array
    {
        return [
            'name' => 'sometimes|required|string|max:255',
            'phone' => 'sometimes|required|string|max:20',
            'email' => 'sometimes|required|email|max:255',
            'evaluete' => 'nullable|integer|min:0|max:5',
            'note' => 'nullable|string|max:255',
            'status' => 'sometimes|boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Vui lòng nhập tên.',
            'phone.required' => 'Vui lòng nhập số điện thoại.',
            'email.required' => 'Vui lòng nhập email.',
            'email.email' => 'Email không hợp lệ.',
            'evaluete.integer' => 'Đánh giá phải là số nguyên.',
            'note.max' => 'Ghi chú không được vượt quá 255 ký tự.',
            'status.boolean' => 'Trạng thái phải là giá trị boolean.',
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
