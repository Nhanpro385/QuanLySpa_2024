<?php

namespace App\Http\Requests\Admin\Comments;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class CommentUpdateRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [

            'parent_comment_id' => 'nullable|exists:comments,id|integer',
            'comment' => 'nullable|string|max:500',
            'image_urls' => 'nullable|array',
            'image.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ];
    }

    public function messages()
    {
        return [

            'parent_comment_id.exists' => 'Parent Comment Id không hợp lệ!',
            'parent_comment_id.integer' => 'Parent Comment Id phải là số nguyên.',
            'comment.max' => 'Bình luận không được vượt quá 500 ký tự.',
            'image.image' => 'Trường này phải là hình ảnh.',
            'image.mimes' => 'Hình ảnh phải có định dạng: jpeg, png, jpg, gif, svg.',
            'image.max' => 'Kích thước hình ảnh không được vượt quá 2MB.',
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
