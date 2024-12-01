<?php

namespace App\Http\Requests\Admin\InboundInvoices;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreInboundInvoiceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }
    
    public function rules(): array
    {
        return [
           
            'supplier_id' => 'nullable|string|exists:suppliers,id',
            'note' => 'nullable|string|max:255',
            'total_amount' => 'required|numeric|min:0',
            'details' => 'required|array|min:1',
        ];
    }
    
    public function messages(): array
    {
        return [
         
            'supplier_id.string' => 'ID nhà cung cấp phải là chuỗi.',
            'supplier_id.exists' => 'ID nhà cung cấp không tồn tại trong hệ thống.',
            'note.string' => 'Ghi chú phải là chuỗi ký tự.',
            'note.max' => 'Ghi chú không được vượt quá 255 ký tự.',
            'total_amount.required' => 'Tổng tiền là bắt buộc.',
            'total_amount.numeric' => 'Tổng tiền phải là một số.',
            'total_amount.min' => 'Tổng tiền phải lớn hơn hoặc bằng 0.',
            'details.required' => 'Chi tiết hóa đơn là bắt buộc.',
            'details.array' => 'Chi tiết hóa đơn phải là một mảng.',
            'details.min' => 'Phải có ít nhất một chi tiết hóa đơn.',
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
