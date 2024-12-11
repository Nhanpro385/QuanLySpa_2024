<?php

namespace App\Http\Requests\Client\Comment;

use Illuminate\Foundation\Http\FormRequest;

class CommentUpdateRequest extends FormRequest
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
    public function rules()
    {
        return [

            'customer_id' => 'required|integer|exists:customers,id',
            'service_id' => 'required|integer|exists:services,id',
            'parent_comment_id' => 'nullable|exists:comments,id|integer',
            'comment' => 'nullable|string|max:500',

            'rate' => [
                'required',
                'integer',
                'min:1',
                'max:5',
            ],
            // 'status' => 'required|boolean',
            'image_urls' => 'nullable|array',
            'image.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
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
            'customer_id.integer' => 'Customer Id phải là số nguyên.',
            'customer_id.exists' => 'Customer Id không hợp lệ!',
            'parent_comment_id.exists' => 'Parent Comment Id không hợp lệ!',
            'parent_comment_id.integer' => 'Parent Comment Id phải là số nguyên.',
            'comment.required' => 'Bình luận không được bỏ trống!',
            'comment.max' => 'Bình luận không được vượt quá 500 ký tự.',

            'rate.integer' => 'Đánh giá phải là số nguyên.',
            'rate.min' => 'Đánh giá phải ít nhất là 1.',
            'rate.max' => 'Đánh giá tối đa là 5.',
            'status.required' => 'Trạng thái không được bỏ trống!',
            'status.boolean' => 'Trạng thái phải là true hoặc false.',
            'image.image' => 'Trường này phải là hình ảnh.',
            'image.mimes' => 'Hình ảnh phải có định dạng: jpeg, png, jpg, gif, svg.',
            'image.max' => 'Kích thước hình ảnh không được vượt quá 2MB.',
        ];
    }


    public function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        throw new \Illuminate\Http\Exceptions\HttpResponseException(
            response()->json([
                'status' => 'error',
                'message' => 'Dữ liệu đầu vào không hợp lệ.',
                'errors' => $validator->errors(),
            ], 422)
        );
    }
}
