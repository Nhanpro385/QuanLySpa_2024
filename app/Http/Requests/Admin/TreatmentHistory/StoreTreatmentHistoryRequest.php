<?php

namespace App\Http\Requests\Admin\TreatmentHistory;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreTreatmentHistoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'customer_id' => ['required', 'exists:customers,id'],
            'appointment_id' => ['required', 'exists:appointments,id'],
            'staff_id' => ['required', 'exists:users,id'],
            'status' => ['required', 'boolean'],
            'evaluate' => ['nullable', 'integer', 'min:1', 'max:5'],
            'image_before' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048'],
            'image_after' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048'],
            'feedback' => ['required', 'string', 'max:255'],
            'note' => ['nullable', 'string', 'max:500'],
        ];
    }

    public function messages(): array
    {
        return [
            'customer_id.required' => 'Vui lòng chọn khách hàng.',
            'customer_id.exists' => 'Khách hàng không tồn tại.',
            'appointment_id.required' => 'Vui lòng chọn cuộc hẹn.',
            'appointment_id.exists' => 'Cuộc hẹn không tồn tại.',
            'staff_id.required' => 'Vui lòng chọn nhân viên.',
            'staff_id.exists' => 'Nhân viên không tồn tại.',
            'status.required' => 'Trạng thái là bắt buộc.',
            'status.boolean' => 'Trạng thái phải là true hoặc false.',
            'evaluate.integer' => 'Đánh giá phải là số nguyên.',
            'evaluate.min' => 'Đánh giá tối thiểu là 1.',
            'evaluate.max' => 'Đánh giá tối đa là 5.',
            'image_before.image' => 'Ảnh trước điều trị phải là tệp hình ảnh.',
            'image_before.mimes' => 'Ảnh trước điều trị phải có định dạng jpeg, png, jpg, hoặc gif.',
            'image_before.max' => 'Ảnh trước điều trị không được vượt quá 2MB.',
            'image_after.image' => 'Ảnh sau điều trị phải là tệp hình ảnh.',
            'image_after.mimes' => 'Ảnh sau điều trị phải có định dạng jpeg, png, jpg, hoặc gif.',
            'image_after.max' => 'Ảnh sau điều trị không được vượt quá 2MB.',
            'feedback.string' => 'Phản hồi phải là một chuỗi ký tự.',
            'feedback.required' => 'Vui lòng ghi phản hồi.',
            'feedback.max' => 'Phản hồi không được vượt quá 255 ký tự.',
            'note.string' => 'Ghi chú phải là một chuỗi ký tự.',
            'note.max' => 'Ghi chú không được vượt quá 500 ký tự.',
        ];
    }

    protected function failedValidation(Validator $validator): void
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
