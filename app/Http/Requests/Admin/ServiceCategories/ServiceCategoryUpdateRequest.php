<?php

namespace App\Http\Requests\Admin\ServiceCategories;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class ServiceCategoryUpdateRequest extends FormRequest
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
            'name' => 'required|regex:/^(?!\s*\d).+$/|max:255|min:10|' . Rule::unique('service_categories')->ignore($this->id),
            'description' => 'nullable',
            'status' => 'required',
            'parent_id' => 'nullable|numeric|exists:service_categories,id',

        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Tên không được bỏ trống',
            'name.regex' => 'Tên phải bắt đầu bằng ký tự và chỉ chứa chữ cái, số, hoặc khoảng trắng.',
            'name.unique' => 'Tên không hợp lệ có thể đã trùng với tên đã có trong hệ thống.',
            'name.max' => 'Tên không được vượt quá 255 kí tự.',
            'name.min' => 'Tên quá ngắn vui lòng nhập hơn 10 kí tự.',
            'status.required' => 'Vui lòng chọn trạng thái',
            'parent_id.exists' => 'Không tìm thấy loại dịch vụ cha.'
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
