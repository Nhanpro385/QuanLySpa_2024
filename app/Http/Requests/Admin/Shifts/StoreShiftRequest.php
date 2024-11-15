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

    // protected function prepareForValidation()
    // {
    //     // Kiểm tra nếu start_time và end_time có dữ liệu và chuyển đổi về định dạng H:i:s
    //     if ($this->has('start_time')) {
    //         $this->merge(['start_time' => Carbon::parse($this->input('start_time'))->format('H:i:s')]);
    //     }
    //     if ($this->has('end_time')) {
    //         $this->merge(['end_time' => Carbon::parse($this->input('end_time'))->format('H:i:s')]);
    //     }
    // }

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
