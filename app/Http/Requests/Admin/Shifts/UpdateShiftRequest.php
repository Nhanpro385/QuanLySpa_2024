<?php

namespace App\Http\Requests\Admin\Shifts;

use Illuminate\Foundation\Http\FormRequest;
use Carbon\Carbon;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
class UpdateShiftRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'start_time' => 'nullable|date_format:H:i:s',
            'end_time' => 'nullable|date_format:H:i:s|after:start_time',
            'shift_date' => 'nullable|date',
            'max_customers' => 'nullable|integer|min:1',
            'note' => 'nullable|string|max:255',
            'status' => 'boolean',
            'created_by' => 'nullable|string|max:255',
            'updated_by' => 'nullable|string|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'start_time.date_format' => 'Thời gian bắt đầu không đúng định dạng (H:i:s).',
            'end_time.date_format' => 'Thời gian kết thúc không đúng định dạng (H:i:s).',
            'end_time.after' => 'Thời gian kết thúc phải sau thời gian bắt đầu.',
            'shift_date.date' => 'Ngày ca làm việc không hợp lệ.',
            'max_customers.integer' => 'Số lượng khách phải là số nguyên.',
            'max_customers.min' => 'Số lượng khách phải ít nhất là 1.',
            'note.string' => 'Ghi chú phải là chuỗi ký tự.',
            'note.max' => 'Ghi chú không được vượt quá 255 ký tự.',
            'status.boolean' => 'Trạng thái phải là giá trị boolean.',
            'created_by.string' => 'Người tạo phải là chuỗi ký tự.',
            'updated_by.string' => 'Người cập nhật phải là chuỗi ký tự.',
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
