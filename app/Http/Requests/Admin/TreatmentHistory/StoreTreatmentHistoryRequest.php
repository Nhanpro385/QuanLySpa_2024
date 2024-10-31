<?php

namespace App\Http\Requests\Admin\TreatmentHistory;


use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreTreatmentHistoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
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
    
    public function rules(): array
    {
        return [
            'service_id' => 'nullable|string|exists:services,id',
            'customer_id' => 'nullable|string|exists:customers,id',
            'appointment_id' => 'nullable|string|exists:appointments,id',
            'staff_id' => 'nullable|string|exists:users,id',
            'image_before' => 'required|string',
            'image_after' => 'required|string',
            'feedback' => 'required|string',
            'note' => 'nullable|string',
            'status' => 'boolean',
            'evaluete' => 'nullable|integer|min:1|max:5',
            'created_by' => 'nullable|string|exists:users,id',
            'updated_by' => 'nullable|string|exists:users,id',
        ];
    }
}
