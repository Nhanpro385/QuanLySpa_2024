<?php

namespace App\Http\Requests\Admin\Services;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class ServiceRequest extends FormRequest
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
            'id' => 'required|numeric|min:1000000000|max:9999999999999999999|unique:services,id',
            'name' => 'required|regex:/^(?!\s*\d).+$/|max:255|min:10|unique:services,name',
            'service_category_id' => 'nullable|numeric|exists:service_categories,id',
            'price' => 'required|numeric|min:1000|max:1000000000',
            'description' => 'nullable|max:255',
            'image_url.*' => 'required|image',
            'duration' => 'required|numeric',
            'priority' => 'required|numeric',
        ];
    }

    public function messages(): array
    {
        return [
            'id.required' => 'ID là bắt buộc.',
            'id.numeric' => 'ID phải là một số.',
            'id.min' => 'ID phải lớn hơn hoặc bằng 1000000000.',
            'id.max' => 'ID phải nhỏ hơn hoặc bằng 9999999999999999999.',
            'id.unique' => 'ID đã tồn tại.',
            'name.required' => 'Tên là bắt buộc.',
            'name.regex' => 'Tên không được bắt đầu bằng số.',
            'name.max' => 'Tên không được dài hơn 255 ký tự.',
            'name.min' => 'Tên phải có ít nhất 10 ký tự.',
            'name.unique' => 'Tên đã tồn tại.',
            'service_category_id.numeric' => 'ID danh mục phải là một số.',
            'service_category_id.exists' => 'ID danh mục không tồn tại.',
            'price.required' => 'Giá là bắt buộc.',
            'price.numeric' => 'Giá phải là một số.',
            'price.min' => 'Giá phải lớn hơn hoặc bằng 1000.',
            'price.max' => 'Giá phải nhỏ hơn hoặc bằng 1000000000.',
            'description.max' => 'Mô tả không được dài hơn 255 ký tự.',
            'image_url.required' => 'Hình ảnh là bắt buộc.',
            'image_url.image' => 'Tệp phải là một hình ảnh.',
            'duration.required' => 'Thời gian là bắt buộc.',
            'duration.numeric' => 'Thời gian phải là một số.',
            'priority.required' => 'Không được bỏ trống mức độ phổ biến của dịch vụ.',
            'priority.numeric' => 'Vui lòng chọn giá trị phù hợp.',
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
