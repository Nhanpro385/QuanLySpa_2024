<?php

namespace App\Http\Requests\Admin\Products;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class ProductRequest extends FormRequest
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
            'id' => 'required|numeric|min:1000000000|max:9999999999999999999|unique:products,id',
            'category_id' => 'nullable|numeric|exists:categories,id',
            'name' => 'required|regex:/^(?!\s*\d).+$/|max:255|min:10|unique:products,name',
            'price' => 'required|numeric|min:1000|gt:cost',
            'cost' => 'required|numeric|min:1000|lt:price',
            'capacity' => 'required|numeric',
            'bar_code' => 'required|numeric|unique:products,bar_code',
            'date' => 'required|date|before:tomorrow',
            'image_url' => 'nullable|image',
            'description' => 'nullable',
            'status' => 'nullable',
            'created_by' => 'nullable|numeric|exists:users,id'
        ];
    }
    public function messages(): array
    {
        return [
            'id.required' => 'ID là trường bắt buộc.',
            'id.numeric' => 'ID phải là một số.',
            'id.min' => 'ID phải có ít nhất 10 chữ số.',
            'id.max' => 'ID không được vượt quá 19 chữ số.',
            'id.unique' => 'ID đã tồn tại.',
            'category_id.numeric' => 'Category ID phải là một số.',
            'category_id.exists' => 'Category ID không tồn tại.',
            'name.required' => 'Tên là trường bắt buộc.',
            'name.regex' => 'Tên không được bắt đầu bằng số hoặc chỉ chứa toàn khoảng trắng.',
            'name.max' => 'Tên không được vượt quá 255 ký tự.',
            'name.min' => 'Tên phải có ít nhất 10 ký tự.',
            'name.unique' => 'Tên đã tồn tại.',
            'price.required' => 'Giá là trường bắt buộc.',
            'price.numeric' => 'Giá phải là một số.',
            'price.min' => 'Giá phải lớn hơn hoặc bằng 1000.',
            'price.gt' => 'Giá phải lớn hơn chi phí.',
            'cost.required' => 'Chi phí là trường bắt buộc.',
            'cost.numeric' => 'Chi phí phải là một số.',
            'cost.min' => 'Chi phí phải lớn hơn hoặc bằng 1000.',
            'cost.lt' => 'Chi phí phải nhỏ hơn giá.',
            'capacity.required' => 'Dung tích là trường bắt buộc.',
            'capacity.numeric' => 'Dung tích phải là một số.',
            'bar_code.required' => 'Mã vạch là trường bắt buộc.',
            'bar_code.numeric' => 'Mã vạch phải là một số.',
            'date.required' => 'Ngày là trường bắt buộc.',
            'date.date' => 'Ngày phải là định dạng ngày hợp lệ.',
            'image_url.nullable' => 'URL hình ảnh có thể không cần nhập.',
            'image_url.image' => 'URL hình ảnh phải là một tệp hình ảnh hợp lệ.',
            'description.nullable' => 'Mô tả có thể không cần nhập.',
            'status.nullable' => 'Trạng thái có thể không cần nhập.',
            'created_by.numeric' => 'Người tạo phải là một số.',
            'created_by.exists' => 'Người tạo không tồn tại.',
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
