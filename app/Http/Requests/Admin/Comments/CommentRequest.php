<?php

namespace App\Http\Requests\Admin\Comments;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\DB;

class CommentRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'id' => 'required|digits_between:10,20|integer|unique:comments,id',
            'service_id' => 'required|exists:services,id',
            'customer_id' => [
                'required',
                'exists:customers,id',
                function ($attribute, $value, $fail) {
                    $service_id = $this->service_id;

                    
                    $hasUsedService = DB::table('appointments')
                        ->join('appointment_services', 'appointments.id', '=', 'appointment_services.appointment_id')

                        ->exists();

                    if (!$hasUsedService) {
                        $fail('Khách hàng này chưa sử dụng dịch vụ này, không thể bình luận.');
                    }

                    $hasAppointment = DB::table('appointments')
                        ->where('customer_id', $value)
                        ->exists();

                    if (!$hasAppointment) {
                        $fail('Khách hàng này chưa có cuộc hẹn nào.');
                    }
                },
            ],
            'parent_comment_id' => 'nullable|exists:comments,id',
            'comment' => 'required|string|max:500',
            'rate' => 'required|integer|min:1|max:5',
            'status' => 'required|boolean',
            'image_url' => 'nullable|url'
        ];
    }

    public function messages()
    {
        return [
            'id.required' => 'Id không được bỏ trống!',
            'id.digits_between' => 'Id phải có độ dài từ 10 đến 20 ký tự số.',
            'id.integer' => 'Id phải là số nguyên.',
            'id.unique' => 'Id đã tồn tại!',
            'service_id.required' => 'Service Id không được bỏ trống!',
            'service_id.exists' => 'Service Id không hợp lệ!',
            'customer_id.required' => 'Customer Id không được bỏ trống!',
            'customer_id.exists' => 'Customer Id không hợp lệ!',
            'comment.required' => 'Bình luận không được bỏ trống!',
            'comment.max' => 'Bình luận không được vượt quá 500 ký tự.',
            'rate.required' => 'Đánh giá không được bỏ trống!',
            'rate.integer' => 'Đánh giá phải là số nguyên.',
            'rate.min' => 'Đánh giá phải ít nhất là 1.',
            'rate.max' => 'Đánh giá tối đa là 5.',
            'status.required' => 'Trạng thái không được bỏ trống!',
            'status.boolean' => 'Trạng thái phải là true hoặc false.',
            'image_url.url' => 'URL hình ảnh không hợp lệ!',
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
