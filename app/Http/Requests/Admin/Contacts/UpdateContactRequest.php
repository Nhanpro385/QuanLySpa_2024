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
           
           
            'status' => 'sometimes|boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'status.boolean' => 'Trạng thái phải là giá trị boolean.', // Message cho rule boolean
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
