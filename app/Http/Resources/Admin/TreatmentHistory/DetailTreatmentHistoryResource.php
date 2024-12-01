<?php 
namespace App\Http\Resources\Admin\TreatmentHistory;

use Illuminate\Http\Resources\Json\JsonResource;

class DetailTreatmentHistoryResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' =>(string) $this->id,
            'customer_id' => $this->customer_id,
            'appointment_id' => $this->appointment_id,
            'staff_id' => $this->staff_id,
            'image_before' => $this->image_before,
            'image_after' => $this->image_after,
            'feedback' => $this->feedback,
            'note' => $this->note,
            'status' => $this->status,
            'evaluete' => $this->evaluete,

            // Thông tin customer
            'customer' => [
                'id' =>(string) $this->customer->id ?? null,
                'name' => $this->customer->full_name ?? null,
                'email' => $this->customer->email ?? null,
            ],

            // Thông tin staff
            'staff' => [
                'id' =>(string) $this->createdBy->id ?? null,
                'full_name' => $this->createdBy->full_name ?? null,
                'role' => $this->createdBy->role ?? null,
            ],

            // Thông tin appointment
            'appointment' => [
                'appointment_date' => $this->appointment->appointment_date ?? null,
            ],

            // Tổng tiền từ payment
            'payment_total' => $this->appointment->payments->sum('total_amount') ?? 0,
            // Chi tiết payments và products
            'payment_details' => $this->appointment->payments->map(function ($payment) {
                return [
                    'payment_id' => $payment->id,
                    'total_amount' => $payment->total_amount,
                    'products' => $payment->products->map(function ($product) {
                        return [
                            'product_id' => $product->id,
                            'product_name' => $product->name,
                            'quantity' => $product->pivot->quantity,
                            'unit_price' => $product->pivot->unit_price,
                            'total_price' => $product->pivot->total_price,
                        ];
                    }),
                ];
            }),
            'created_by' => $this->created_by ? [
                'id' =>(string) $this->created_by,
                'full_name' => $this->createdBy->full_name ?? null,
                'role' => $this->createdBy->role ?? null,
            ] : null,
            'updated_by' => $this->updated_by ? [
                'id' =>(string) $this->updated_by,
                'full_name' => $this->updatedBy->full_name ?? null,
                'role' => $this->updatedBy->role ?? null,
            ] : null,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
