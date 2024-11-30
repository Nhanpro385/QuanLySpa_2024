<?php

namespace App\Http\Requests\Admin\StaffShifts;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class StaffShiftRequest extends FormRequest
{
    public function authorize()
    {
        return true; // Điều chỉnh nếu cần kiểm tra quyền
    }

    public function rules()
    {
        return [
            'shift_id' => 'required|exists:shifts,id', // Kiểm tra shift_id
            'staff_ids' => 'required|array', // staff_ids phải là mảng
            'staff_ids.*' => [
                'required',
                'exists:users,id',
                Rule::unique('staff_shifts', 'staff_id')->where(function ($query) {
                    return $query->where('shift_id', $this->shift_id);
                }), // Đảm bảo không trùng với shift_id đã tồn tại
            ],
        ];
    }

    public function messages()
    {
        return [
            'shift_id.required' => 'Vui lòng cung cấp ID của ca làm.',
            'shift_id.exists' => 'Ca làm không tồn tại.',
            'staff_ids.required' => 'Danh sách nhân viên không được để trống.',
            'staff_ids.array' => 'Danh sách nhân viên phải là một mảng.',
            'staff_ids.*.required' => 'Mỗi ID nhân viên không được để trống.',
            'staff_ids.*.exists' => 'Nhân viên không tồn tại.',
            'staff_ids.*.unique' => 'Nhân viên này đã được gán cho ca làm này.',
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
