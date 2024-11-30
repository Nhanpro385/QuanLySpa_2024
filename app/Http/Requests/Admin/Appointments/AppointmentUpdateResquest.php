<?php

namespace App\Http\Requests\Admin\Appointments;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class AppointmentUpdateResquest extends FormRequest
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
            'note' => 'nullable',
            'status' => 'required|numeric|min:1',
            'services' => 'required|array',
            'services.*.service_id' => 'required|exists:services,id',
            'services.*.quantity' => 'required|numeric|min:1',
            'users' => 'required|array',
            'users.*.staff_id' => 'required|exists:users,id',
        ];
    }

    public function messages()
    {
        return [
            'status.required' => 'Trạng thái là bắt buộc.',
            'status.numeric' => 'Trạng thái phải là số.',
            'status.min' => 'Trạng thái không hợp lệ.',
            'services.array' => 'Danh sách dịch vụ phải là một mảng.',
            'services.*.service_id.required' => 'Mã dịch vụ là bắt buộc.',
            'services.*.service_id.exists' => 'Mã dịch vụ không hợp lệ.',
            'services.required' => 'Không được bỏ trống dịch vụ',
            'services.*.quantity.required' => 'Số lượng là bắt buộc.',
            'services.*.quantity.numeric' => 'Số lượng phải là số.',
            'services.*.quantity.min' => 'Số lượng phải lớn hơn hoặc bằng 1.',
            'users.array' => 'Danh sách người dùng phải là một mảng.',
            'users.required' => 'Vui lòng chọn nhân viên',
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
