<?php

namespace App\Http\Requests\Client\Appointments;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class AppointmentResquest extends FormRequest
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
            'shift_id' => 'required|numeric|exists:shifts,id',
            'note' => 'nullable',
            'services' => 'nullable|array',
            'services.*.service_id' => 'required|exists:services,id',
            'services.*.quantity' => 'required|numeric|min:1',
        ];
    }

    public function messages()
    {
        return [
            'id.required' => 'Mã là bắt buộc.',
            'id.numeric' => 'Mã phải là số.',
            'id.min' => 'Mã phải lớn hơn hoặc bằng 10 chữ số.',
            'id.max' => 'Mã không được vượt quá 19 chữ số.',
            'id.unique' => 'Mã đã tồn tại.',
            'shift_id.required' => 'Mã ca trực là bắt buộc.',
            'shift_id.numeric' => 'Mã ca trực phải là số.',
            'shift_id.exists' => 'Mã ca trực không hợp lệ.',
            'customer_id.required' => 'Mã khách hàng là bắt buộc.',
            'customer_id.numeric' => 'Mã khách hàng phải là số.',
            'customer_id.exists' => 'Mã khách hàng không hợp lệ.',
            'start_time.required' => 'Giờ bắt đầu là bắt buộc.',
            'start_time.date_format' => 'Giờ bắt đầu phải là múi giờ hợp lệ.',
            'appointment_date.required' => 'Ngày hẹn là bắt buộc.',
            'appointment_date.after_or_equal' => 'Ngày hẹn phải bằng hoặc sau ngày hôm nay.',
            'status.required' => 'Trạng thái là bắt buộc.',
            'status.numeric' => 'Trạng thái không hợp lệ.',
            'status.min' => 'Trạng thái không hợp lệ.',
            'services.array' => 'Danh sách dịch vụ phải là một mảng.',
            'services.*.service_id.required' => 'Mã dịch vụ là bắt buộc.',
            'services.*.service_id.exists' => 'Mã dịch vụ không hợp lệ.',
            'services.*.quantity.required' => 'Số lượng là bắt buộc.',
            'services.*.quantity.numeric' => 'Số lượng phải là số.',
            'services.*.quantity.min' => 'Số lượng phải lớn hơn hoặc bằng 1.',
            'users.array' => 'Danh sách người dùng phải là một mảng.',
            'users.*.staff_id.required' => 'Mã nhân viên là bắt buộc.',
            'users.*.staff_id.exists' => 'Mã nhân viên không hợp lệ.',
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
