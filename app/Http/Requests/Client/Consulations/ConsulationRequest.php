<?php

namespace App\Http\Requests\Client\Consulations;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class ConsulationRequest extends FormRequest
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
            'id' => 'required|unique:consulations,id',
            'skin_condition' => 'required|max:255',
        ];
    }
    public function messages(): array
    {
        return [
            'id.required' => 'ID là trường bắt buộc.',
            'id.unique' => 'Có lỗi xảy ra',
            'customer_id.required' => 'ID của khách hàng là trường bắt buộc.',
            'customer_id.exists' => 'ID của khách hàng không tồn tại trong hệ thống.',

            'skin_condition.required' => 'Vui lòng cung cấp cho tôi birts về tình trạng da của bạn như thế nào.',
            'skin_condition.max' => 'Tình trạng da không được vượt quá 255 ký tự.',
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
