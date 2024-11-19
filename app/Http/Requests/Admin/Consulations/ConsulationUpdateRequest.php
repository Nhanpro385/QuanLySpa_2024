<?php

namespace App\Http\Requests\Admin\Consulations;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class ConsulationUpdateRequest extends FormRequest
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
            'status' => "required|numeric",
            'consulation' => 'nullable|max:255',
            'treatment_plan' => 'nullable|max:255',
            'skin_condition' => 'nullable|max:255',
        ];
    }

    public function messages()
    {
        return [
            'status.required' => 'Trạng thái là trường bắt buộc.',
            'status.numeric' => 'Trạng thái phải là một số.',
            'consulation.required' => 'Tình trạng da là trường bắt buộc.',
            'consulation.max' => 'Tình trạng da không được vượt quá 255 ký tự.',
            'treatment_plan.required' => 'Kế hoạch điều trị là trường bắt buộc.',
            'treatment_plan.max' => 'Kế hoạch điều trị không được vượt quá 255 ký tự.',
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
