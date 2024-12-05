<?php

namespace App\Http\Resources\Client\TreatmentHistories;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TreatmentHistoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        return [
            'id' => (string) $this->id ?? null,
            'customer_id' => $this->customer_id ?? null,
            'appointment_id' => $this->appointment_id ?? null,
            'staff_id' => $this->staff_id ?? null,
            'image_before' => $this->image_before ?? null,
            'image_after' => $this->image_after ?? null,
            'feedback' => $this->feedback ?? null,
            'note' => $this->note ?? null,
            'status' => $this->status ?? null,
            'evaluete' => $this->evaluete ?? null,

            // Thông tin customer
            'customer' => $this->customer ? [
                'id' => (string) $this->customer->id ?? null,
                'name' => $this->customer->full_name ?? null,
                'email' => $this->customer->email ?? null,
            ] : null,

            // Thông tin staff
            'staff' => $this->createdBy ? [
                'id' => (string) $this->createdBy->id ?? null,
                'full_name' => $this->createdBy->full_name ?? null,
                'role' => $this->createdBy->role ?? null,
            ] : null,

            // Thông tin appointment
            'appointment' => $this->appointment ? [
                'appointment_date' => $this->appointment->appointment_date ?? null,
            ] : null,

            // Tổng tiền từ payment
            'payment_total' => $this->appointment && $this->appointment->payments ? 
                $this->appointment->payments->sum('total_amount') : 0,

            // Chi tiết payments và products
            'payment_details' => $this->appointment && $this->appointment->payments ? 
                $this->appointment->payments->map(function ($payment) {
                    return [
                        'payment_id' => (string) $payment->id ?? null,
                        'total_amount' => $payment->total_amount ?? null,
                        'products' => $payment->products ? $payment->products->map(function ($product) {
                            return [
                                'product_id' => (string) $product->id ?? null,
                                'product_name' => $product->name ?? null,
                                'quantity' => $product->pivot->quantity ?? null,
                                'unit_price' => $product->pivot->unit_price ?? null,
                                'total_price' => $product->pivot->total_price ?? null,
                            ];
                        }) : [],
                    ];
                }) : [],

            // Danh sách staff
            'staff_list' => $this->appointment && $this->appointment->users ? 
                $this->appointment->users->map(function ($user) {
                    return [
                        'id' => (string) $user->id ?? null,
                        'name' => $user->full_name ?? null,
                        'role' => $user->role ?? null,
                    ];
                }) : [],

            // Danh sách service
            'service_list' => $this->appointment && $this->appointment->services ? 
                $this->appointment->services->map(function ($service) {
                    return [
                        'id' => (string) $service->id ?? null,
                        'name' => $service->name ?? null,
                        'quantity' => $service->pivot->quantity ?? null,
                        'price' => $service->pivot->price ?? null,
                    ];
                }) : [],

            'created_by' => $this->created_by ? [
                'id' => (string) $this->created_by ?? null,
                'full_name' => $this->createdBy->full_name ?? null,
                'role' => $this->createdBy->role ?? null,
            ] : null,

            'updated_by' => $this->updated_by ? [
                'id' => (string) $this->updated_by ?? null,
                'full_name' => $this->updatedBy->full_name ?? null,
                'role' => $this->updatedBy->role ?? null,
            ] : null,

            'created_at' => $this->created_at ?? null,
            'updated_at' => $this->updated_at ?? null,
        ];
    }
}
