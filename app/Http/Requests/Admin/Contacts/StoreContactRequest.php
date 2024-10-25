<?php

namespace App\Http\Requests\Admin\Contacts;

use Illuminate\Foundation\Http\FormRequest;

class StoreContactRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Thay đổi theo yêu cầu bảo mật
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:contacts',
            'phone' => 'required|string|max:20',
            'evaluate' => 'nullable|integer|min:0|max:255',
            'note' => 'required|string|max:255',
            'status' => 'boolean',
        ];
    }
}
