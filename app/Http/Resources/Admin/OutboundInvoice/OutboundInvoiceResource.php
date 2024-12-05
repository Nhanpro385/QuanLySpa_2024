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
            'id' => (string) $this->staff->id,
            'name' => $this->staff->full_name,
            'role' => $this->staff->role,
        ] : null,
        'total_amount' => $this->total_amount ?? 0,
        'note' => $this->note ?? '',
        'status' => $this->status ?? false,
        'details' => $this->invoice_details, // Sử dụng accessor
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
