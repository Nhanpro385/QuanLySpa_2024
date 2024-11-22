<?php

namespace App\Http\Requests\Admin\StaffShifts;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\DB; 
use App\Models\StaffShift;

class StaffShiftRequest extends FormRequest
{
    public function authorize()
    {
        return true; // Điều chỉnh nếu cần kiểm tra quyền
    }

    public function rules()
    {
        return [
            'staff_id' => 'required|exists:users,id',
            'shift_id' => 'required|exists:shifts,id|unique:staff_shifts,shift_id,NULL,id,staff_id,' . $this->staff_id,
        ];
    }

    public function messages()
    {
        return [
            'staff_id.required' => 'Vui lòng cung cấp ID của nhân viên.',
            'staff_id.exists' => 'Nhân viên không tồn tại.',
            'shift_id.required' => 'Vui lòng cung cấp ID của ca làm.',
            'shift_id.exists' => 'Ca làm không tồn tại.',
            'shift_id.unique' => 'Nhân viên này đã được gán cho ca làm này.',
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
