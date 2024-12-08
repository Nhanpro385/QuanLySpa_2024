<?php

namespace App\Http\Requests\Client\Contacts;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
class StoreContactRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'phone' => [
                'required',
                'string',
                'regex:/^(0|\+84)(3|5|7|8|9)\d{8}$/', // Regex kiểm tra số điện thoại Việt Nam
            ],
            'email' => 'required|email|max:255',
            'evaluete' => 'nullable|integer|min:0|max:5',
            'note' => 'nullable|string|max:255',
        ];
    }
    

    public function messages(): array
    {
        return [
            'name.required' => 'Vui lòng nhập tên.',
            'phone.required' => 'Vui lòng nhập số điện thoại.',
            'phone.regex' => 'Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại Việt Nam đúng định dạng.',
            'email.required' => 'Vui lòng nhập email.',
            'email.email' => 'Email không hợp lệ.',
            'evaluete.integer' => 'Đánh giá phải là số nguyên.',
            'note.max' => 'Ghi chú không được vượt quá 255 ký tự.',
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
