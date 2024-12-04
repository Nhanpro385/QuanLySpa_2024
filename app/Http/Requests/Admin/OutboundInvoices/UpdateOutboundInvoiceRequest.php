<?php

namespace App\Http\Requests\Admin\OutboundInvoices;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;
use Illuminate\Contracts\Validation\Validator as contract;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\Models\OutboundInvoiceDetail;
use App\Models\Inventory;

class UpdateOutboundInvoiceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
           
            'note' => 'nullable|string|max:255',
            'total_amount' => 'required|numeric|min:0',
            'details' => 'nullable|array',
            'details.*.id' => 'required|exists:outbound_invoice_details,id',
            'details.*.product_id' => 'required|exists:products,id',
            'details.*.quantity_export' => 'required|integer|min:1',
            'details.*.unit_price' => 'required|numeric|min:0',
        ];
    }

    public function messages(): array
    {
        return [
          
            'note.string' => 'Ghi chú phải là một chuỗi ký tự.',
            'note.max' => 'Ghi chú không được vượt quá :max ký tự.',
            'total_amount.required' => 'Tổng tiền là bắt buộc.',
            'total_amount.numeric' => 'Tổng tiền phải là một số.',
            'total_amount.min' => 'Tổng tiền phải lớn hơn hoặc bằng :min.',
            'details.array' => 'Chi tiết hóa đơn phải là một mảng.',
            'details.*.id.required' => 'ID của chi tiết hóa đơn là bắt buộc.',
            'details.*.id.exists' => 'Chi tiết hóa đơn không tồn tại trong hệ thống.',
            'details.*.product_id.required' => 'Mã sản phẩm là bắt buộc.',
            'details.*.product_id.exists' => 'Sản phẩm không tồn tại trong hệ thống.',
            'details.*.quantity_export.required' => 'Số lượng xuất là bắt buộc.',
            'details.*.quantity_export.integer' => 'Số lượng xuất phải là số nguyên.',
            'details.*.quantity_export.min' => 'Số lượng xuất phải lớn hơn hoặc bằng :min.',
            'details.*.unit_price.required' => 'Đơn giá là bắt buộc.',
            'details.*.unit_price.numeric' => 'Đơn giá phải là một số.',
            'details.*.unit_price.min' => 'Đơn giá phải lớn hơn hoặc bằng :min.',
        ];
    }

    public function withValidator(Validator $validator)
    {
        $validator->after(function ($validator) {
            $details = $this->input('details', []);

            foreach ($details as $detail) {
                $outboundDetail = OutboundInvoiceDetail::find($detail['id']);

                if ($outboundDetail) {
                    $inventory = Inventory::where('product_id', $outboundDetail->product_id)->first();

                    if ($inventory) {
                        $currentStock = $inventory->quantity;

                        if ($detail['quantity_export'] > $currentStock) {
                            $validator->errors()->add(
                                "details.{$detail['id']}.quantity_export",
                                "Số lượng xuất không được lớn hơn số lượng tồn kho ($currentStock sản phẩm trong kho)."
                            );
                        }
                    }
                }
            }
        });
    }

    public function failedValidation(contract $validator)
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
