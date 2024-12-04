<?php

namespace App\Http\Resources\Admin\OutboundInvoice;

use Illuminate\Http\Resources\Json\JsonResource;

class OutboundInvoiceResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => (string) $this->id,
            'staff' => $this->staff ? [
                'id' => $this->staff->id ? (string) $this->staff->id : null,
                'name' => $this->staff->full_name ?? null,
                'role' => $this->staff->role ?? null,
            ] : null,
            'total_amount' => $this->total_amount,
            'note' => $this->note,
            'status' => $this->status,
            'details' => $this->details ? $this->details->map(function ($detail) {
                return [
                    'id' => $detail->id ? (string) $detail->id : null,
                    'product' => $detail->product ? [
                        'id' => $detail->product->id ? (string) $detail->product->id : null,
                        'name' => $detail->product->name ?? null,
                    ] : null,
                    'quantity_export' => $detail->quantity_export ?? null,
                    'quantity_olded' => $detail->quantity_olded ?? null,
                    'unit_price' => $detail->unit_price ?? null,
                ];
            }) : [],
            'created_by' => $this->createdBy ? [
                'id' => $this->createdBy->id ? (string) $this->createdBy->id : null,
                'name' => $this->createdBy->full_name ?? null,
                'role' => $this->createdBy->role ?? null,
            ] : null,
            'updated_by' => $this->updatedBy ? [
                'id' => $this->updatedBy->id ? (string) $this->updatedBy->id : null,
                'name' => $this->updatedBy->full_name ?? null,
                'role' => $this->updatedBy->role ?? null,
            ] : null,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
