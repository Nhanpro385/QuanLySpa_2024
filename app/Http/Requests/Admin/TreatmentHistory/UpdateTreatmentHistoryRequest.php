<?php

namespace App\Http\Requests\Admin\TreatmentHistory;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTreatmentHistoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'service_id' => 'nullable|string|exists:services,id',
            'customer_id' => 'nullable|string|exists:customers,id',
            'appointment_id' => 'nullable|string|exists:appointments,id',
            'staff_id' => 'nullable|string|exists:users,id',
            'image_before' => 'nullable|string',
            'image_after' => 'nullable|string',
            'feedback' => 'nullable|string',
            'note' => 'nullable|string',
            'status' => 'boolean',
            'evaluete' => 'nullable|integer|min:1|max:5',
            'created_by' => 'nullable|string|exists:users,id',
            'updated_by' => 'nullable|string|exists:users,id',
        ];
    }
}
