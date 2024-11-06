<?php

namespace App\Http\Requests\Admin\TreatmentHistory;

use App\Http\Requests\Admin\BaseRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreTreatmentHistoryRequest extends BaseRequest
{
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

    public function messages(): array
    {
        return [
            'service_id.exists' => 'Dịch vụ không tồn tại.',
            'customer_id.exists' => 'Khách hàng không tồn tại.',
            'appointment_id.exists' => 'Cuộc hẹn không tồn tại.',
            'staff_id.exists' => 'Nhân viên không tồn tại.',
            'image_before.required' => 'Ảnh trước khi điều trị là bắt buộc.',
            'image_after.required' => 'Ảnh sau khi điều trị là bắt buộc.',
            'feedback.required' => 'Phản hồi là bắt buộc.',
            'evaluete.integer' => 'Đánh giá phải là số nguyên.',
            'evaluete.min' => 'Đánh giá phải ít nhất là 1.',
            'evaluete.max' => 'Đánh giá tối đa là 5.',
            'status.boolean' => 'Trạng thái phải là true hoặc false.',
        ];
    }
    
}
