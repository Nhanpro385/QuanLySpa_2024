<?php

namespace App\Http\Resources\Admin\Payments;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaymentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $products = $this->whenLoaded('products') ? $this->products : [];
        return [
            'id' => $this->id,
            'promotion_id' => $this->promotion_id ? [
                "id" => $this->promotion_id,
                "name" => $this->promotion->name
            ] : null,
            'appointment_id' => $this->appointment_id ? [
                'id' => $this->appointment->id,
                'customer' => $this->appointment->customer_id ? [
                    'id' => $this->appointment->customer->id,
                    'full_name' => $this->appointment->customer->full_name,
                    'phone' => $this->appointment->customer->phone
                ] : []
            ] : [],
            'service_total' => $this->service_total,
            'product_total' => $this->product_total,
            'subtotal' => $this->subtotal,
            'reduce' => $this->reduce ?? 0.00,
            'total_amount' => $this->total_amount,
            'payment_type' => $this->payment_type,
            'status' => $this->status,
            'products' => $products ?
                $products->map(function ($product) {
                    return [
                        'product_name' => $product->name,
                        "product_id" => $product->id,
                        "quantity" => $product->pivot->quantity,
                        "unit_price" => $product->pivot->unit_price,
                        "total_price" => $product->pivot->total_price
                    ];
                })
                : [],
            'created_by' => $this->created_by ? [
                'id' => (string) $this->createdBy->id,
                'fullname' => $this->createdBy->full_name,
                'role' => $this->roleName($this->createdBy->role)
            ] : null,
            'created_at' => $this->created_at ?
                $this->created_at->format('Y-m-d') : null,
            'updated_at' => $this->updated_at ?
                $this->updated_at->format('Y-m-d') : null,
        ];
    }

    public function roleName($role)
    {
        $name = 'Nhân viên';
        if ($role == 0) {
            $name = 'Quản trị viên';
        } elseif ($role == 2) {
            $name = 'Nhân viên tư vấn và chăm sóc khách hàng';
        }
        return $name;
    }
}
