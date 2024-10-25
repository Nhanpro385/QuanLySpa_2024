<?php

namespace App\Http\Requests\Admin\Shifts;

use Illuminate\Foundation\Http\FormRequest;

class StoreShiftRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'start_time' => 'required|date_format:H:i:s',
            'end_time' => 'required|date_format:H:i:s|after:start_time',
            'shift_date' => 'required|date',
            'max_customers' => 'required|integer|min:1',
            'note' => 'nullable|string|max:255',
            'status' => 'boolean',
            'created_by' => 'nullable|string|max:255',
            'updated_by' => 'nullable|string|max:255',
        ];
    }
}
