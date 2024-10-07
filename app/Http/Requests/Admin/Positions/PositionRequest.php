<?php

namespace App\Http\Requests\Admin\Positions;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class PositionRequest extends FormRequest
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
            'id' => 'required|integer|unique:positions,id|min:1000000000|max:9999999999999999999',
            'name' => 'required|string|max:255|min:8|unique:positions,name',
            'wage' => 'required|numeric|min:10000',
            'note' => 'nullable|string|max:255',
        ];
    }

    public function messages()
    {
        return [
            'id.required' => 'ID là bắt buộc.',
            'id.integer' => 'ID phải là một số nguyên.',
            'id.unique' => 'ID đã tồn tại.',
            'id.min' => 'ID phải có ít nhất 10 chữ số.',
            'id.max' => 'ID không được vượt quá 19 chữ số.',
            'name.required' => 'Trường tên là bắt buộc.',
            'name.string' => 'Tên phải là một chuỗi ký tự.',
            'name.max' => 'Tên không được vượt quá 255 ký tự.',
            'name.min' => 'Tên phải có ít nhất 8 ký tự.',
            'name.unique' => 'Tên đã tồn tại.',
            'wage.required' => 'Trường lương là bắt buộc.',
            'wage.numeric' => 'Lương phải là một số.',
            'wage.min' => 'Lương phải ít nhất là 10000vnđ/h.',
            'note.string' => 'Ghi chú phải là một chuỗi ký tự.',
            'note.max' => 'Ghi chú không được vượt quá 255 ký tự.',
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
