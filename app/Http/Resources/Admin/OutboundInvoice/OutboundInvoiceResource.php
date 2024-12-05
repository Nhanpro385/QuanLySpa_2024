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
                'id' => (string) $this->staff->id ?? null,
                'name' => $this->staff->full_name ?? null,
                'role' => $this->staff->role ?? null,
            ] : null,
            'total_amount' => $this->total_amount ?? 0,
            'note' => $this->note ?? '',
            'status' => $this->status ?? false,
            'details' => $this->details ? $this->details->map(function ($detail) {
                return [
                    'id' => (string) $detail->id ?? null,
                    'product' => $detail->product ? [
                        'id' => (string) $detail->product->id ?? null,
                        'name' => $detail->product->name ?? null,
                        'bar_code' => $detail->product->bar_code ?? null,
                    ] : null,
                    'quantity_export' => $detail->quantity_export ?? 0,
                    'quantity_olded' => $detail->quantity_olded ?? 0,
                    'unit_price' => $detail->unit_price ?? 0,
                ];
            }) : [],
            'created_by' => $this->createdBy ? [
                'id' => (string) $this->createdBy->id ?? null,
                'name' => $this->createdBy->full_name ?? null,
                'role' => $this->createdBy->role ?? null,
            ] : null,
            'updated_by' => $this->updatedBy ? [
                'id' => (string) $this->updatedBy->id ?? null,
                'name' => $this->updatedBy->full_name ?? null,
                'role' => $this->updatedBy->role ?? null,
            ] : null,
            'created_at' => $this->created_at ?? null,
            'updated_at' => $this->updated_at ?? null,
        ];
    }
}
