<?php

namespace App\Http\Requests\Admin\StaffShifts;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\DB;
use App\Models\StaffShift;

class StaffShiftUpdateRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'staff_id' => 'required|array',
            'staff_id.*' => [
                'digits_between:10,20',
                'integer',
                'exists:users,id',
                function ($attribute, $value, $fail) {
                    // Kiểm tra xem nhân viên đã có ca làm trong bảng staff_shifts chưa
                    $existingShift = StaffShift::where('staff_id', $value)->exists();

                    if ($existingShift) {
                        $fail("Nhân viên có ID $value đã có ca làm!");
                    }

                    // Kiểm tra xem nhân viên có thuộc ca làm không
                    $isInShift = DB::table('shifts')
                        ->join('staff_shifts', 'shifts.id', '=', 'staff_shifts.shift_id')
                        ->where('staff_shifts.staff_id', $value)
                        ->exists();

                    if (!$isInShift) {
                        $fail("Nhân viên có ID $value không có trong ca làm!");
                    }
                },
            ],
            'shift_id' => 'required|digits_between:10,20|integer|exists:shifts,id',
        ];
    }

    public function messages()
    {
        return [
            'staff_id.required' => 'Id nhân viên không được bỏ trống!',
            'staff_id.array' => 'Id nhân viên phải là một mảng.',
            'staff_id.*.digits_between' => 'Id nhân viên phải có độ dài từ 10 đến 20 ký tự số.',
            'staff_id.*.integer' => 'Id nhân viên phải là số nguyên.',
            'staff_id.*.exists' => 'Nhân viên không tồn tại!',
            'shift_id.required' => 'Id ca làm việc không được bỏ trống!',
            'shift_id.digits_between' => 'Id ca làm việc phải có độ dài từ 10 đến 20 ký tự số.',
            'shift_id.integer' => 'Id ca làm việc phải là số nguyên.',
            'shift_id.exists' => 'Ca làm việc không tồn tại!',
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
