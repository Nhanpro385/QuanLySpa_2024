<?php

namespace App\Http\Requests\Admin\Shifts;

use Illuminate\Foundation\Http\FormRequest;

class StoreShiftRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'shift_date' => 'required|date',
            'max_customers' => 'required|integer|min:1',
            'note' => 'nullable|string|max:255',
            'status' => 'boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'shift_date.required' => 'Vui lòng nhập ngày ca làm việc.',
            'shift_date.date' => 'Ngày ca làm việc không hợp lệ.',
            'max_customers.required' => 'Số lượng khách tối đa là bắt buộc.',
            'max_customers.integer' => 'Số lượng khách phải là số nguyên.',
            'max_customers.min' => 'Số lượng khách phải ít nhất là 1.',
            'note.string' => 'Ghi chú phải là chuỗi ký tự.',
            'note.max' => 'Ghi chú không được vượt quá 255 ký tự.',
            'status.boolean' => 'Trạng thái phải là giá trị boolean.',
        ];
    }
}
