<?php

namespace App\Http\Resources\Admin\InboundInvoice;

use Illuminate\Http\Resources\Json\JsonResource;

class InboundInvoiceResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => (string) $this->id,
            'staff' => $this->staff ? [
                'id' => (string) $this->staff->id,
                'name' => $this->staff->full_name,
                'role' => $this->staff->role,
            ] : null,
            'supplier' => $this->supplier ? [
                'id' => (string) $this->supplier->id,
                'name' => $this->supplier->name,
                'contact' => $this->supplier->contact,
            ] : null,
            'total_amount' => $this->total_amount,
            'note' => $this->note,
            'status' => $this->status,
            'details' => $this->details->map(function ($detail) {
                return [
                    'id' => (string) $detail->id,
                    'product' => $detail->product ? [
                        'id' => (string) $detail->product->id,
                        'name' => $detail->product->name,
                        'sku' => $detail->product->sku,
                    ] : null,
                    'quantity_olded' => $detail->quantity_olded,
                    'quantity_import' => $detail->quantity_import,
                    'cost_import' => $detail->cost_import,
                    'cost_olded' => $detail->cost_olded,
                    'unit_price' => $detail->unit_price,
                ];
            }),            
            'created_by' => $this->createdBy ? [
                'id' => (string) $this->createdBy->id,
                'name' => $this->createdBy->full_name,
                'role' => $this->createdBy->role,
            ] : null,
            'updated_by' => $this->updatedBy ? [
                'id' => (string) $this->updatedBy->id,
                'name' => $this->updatedBy->full_name,
                'role' => $this->updatedBy->role,
            ] : null,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
