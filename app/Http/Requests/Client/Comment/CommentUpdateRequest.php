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
    public function rules(): array
    {
        return [
            'parent_comment_id' => 'nullable|exists:comments,id|integer',
            'comment' => 'nullable|string|max:500',
            'image_urls' => 'nullable|array',
            'image_urls.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Đảm bảo rằng tên trường khớp
        ];
    }

    /**
     * Get the custom error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'parent_comment_id.exists' => 'Parent Comment Id không hợp lệ!',
            'parent_comment_id.integer' => 'Parent Comment Id phải là số nguyên.',
            'comment.max' => 'Bình luận không được vượt quá 500 ký tự.',
            'image_urls.array' => 'Danh sách hình ảnh không hợp lệ.',
            'image_urls.*.image' => 'Trường này phải là hình ảnh.',
            'image_urls.*.mimes' => 'Hình ảnh phải có định dạng: jpeg, png, jpg, gif, svg.',
            'image_urls.*.max' => 'Kích thước hình ảnh không được vượt quá 2MB.',
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
