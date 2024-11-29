<?php

namespace App\Http\Requests\Admin\Shifts;

use Illuminate\Foundation\Http\FormRequest;
use Carbon\Carbon;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreShiftRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }
    
    public function rules(): array
    {
        return [
            'shift_date' => 'required|date',
            'start_time' => 'required|date_format:H:i:s',
            'end_time' => 'required|date_format:H:i:s|after:start_time',
            'max_customers' => 'required|integer|min:1',
            'note' => 'nullable|string|max:255',
            'status' => 'boolean',
        ];
    }
    public function withValidator($validator)
{
    $validator->after(function ($validator) {
        $shiftDate = $this->input('shift_date');
        $startTime = $this->input('start_time');
        $endTime = $this->input('end_time');
        
        // Lấy thời gian hiện tại
        $now = Carbon::now();
        
        // Kết hợp ngày và giờ để so sánh
        $startDateTime = Carbon::createFromFormat('Y-m-d H:i:s', "$shiftDate $startTime");
        $endDateTime = Carbon::createFromFormat('Y-m-d H:i:s', "$shiftDate $endTime");
        
        // Kiểm tra nếu thời gian bắt đầu hoặc kết thúc trong quá khứ
        if ($startDateTime->isPast()) {
            $validator->errors()->add('start_time', 'Giờ bắt đầu không được trong quá khứ.');
        }
        if ($endDateTime->isPast()) {
            $validator->errors()->add('end_time', 'Giờ kết thúc không được trong quá khứ.');
        }

        // Kiểm tra trùng lặp ca làm việc
        $overlapShift = \App\Models\Shift::where('shift_date', $shiftDate)
            ->where(function ($query) use ($startTime, $endTime) {
                $query->whereBetween('start_time', [$startTime, $endTime])
                      ->orWhereBetween('end_time', [$startTime, $endTime])
                      ->orWhere(function ($q) use ($startTime, $endTime) {
                          $q->where('start_time', '<=', $startTime)
                            ->where('end_time', '>=', $endTime);
                      });
            })
            ->exists();

        if ($overlapShift) {
            $validator->errors()->add('shift_time', 'Thời gian của ca làm việc bị trùng lặp với một ca làm việc khác.');
        }
    });
}

    
  

    public function messages(): array
    {
        return [
            'shift_date.required' => 'Vui lòng nhập ngày ca làm việc.',
            'shift_date.date' => 'Ngày ca làm việc không hợp lệ.',
            'start_time.required' => 'Vui lòng nhập giờ bắt đầu.',
            'start_time.date_format' => 'Giờ bắt đầu phải theo định dạng HH:mm:ss.',
            'end_time.required' => 'Vui lòng nhập giờ kết thúc.',
            'end_time.date_format' => 'Giờ kết thúc phải theo định dạng HH:mm:ss.',
            'end_time.after' => 'Giờ kết thúc phải sau giờ bắt đầu.',
            'max_customers.required' => 'Số lượng khách tối đa là bắt buộc.',
            'max_customers.integer' => 'Số lượng khách phải là số nguyên.',
            'max_customers.min' => 'Số lượng khách phải ít nhất là 1.',
            'note.string' => 'Ghi chú phải là chuỗi ký tự.',
            'note.max' => 'Ghi chú không được vượt quá 255 ký tự.',
            'status.boolean' => 'Trạng thái phải là giá trị boolean.',
            'shift_time' => 'Thời gian của ca làm việc bị trùng lặp với một ca làm việc khác.',
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
