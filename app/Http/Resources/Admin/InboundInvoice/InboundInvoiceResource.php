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
                'id' => $this->staff->id ? (string) $this->staff->id : null,
                'name' => $this->staff->full_name ?? null,
                'role' => $this->staff->role ?? null,
            ] : null,
            'supplier' => $this->supplier ? [
                'id' => $this->supplier->id ? (string) $this->supplier->id : null,
                'name' => $this->supplier->name ?? null,
                'contact' => $this->supplier->contact_email ?? null,
            ] : null,
            'total_amount' => $this->total_amount ?? null,
            'note' => $this->note ?? null,
            'status' => $this->status ?? null,
            
            'details' => $this->invoice_details ? collect($this->invoice_details)->map(function ($detail) {
                $product = $detail['product'] ?? null;
              
                return [
                    'id' => $detail['id'] ?? null,
                    'product' => $product ? [
                        'id' => $product['id'] ?? null,
                        'name' => $product['name'] ?? null,
                        'sku' => $detail['product']['sku'] ?? 'Không có mã',
                        ] : null,
                    'quantity_olded' => $detail['quantity_olded'] ?? null,
                    'quantity_import' => $detail['quantity_import'] ?? null,
                    'cost_import' => $detail['cost_import'] ?? null,
                    'cost_olded' => $detail['cost_olded'] ?? null,
                    'unit_price' => $detail['unit_price'] ?? null,
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
            'created_at' => $this->created_at ?? null,
            'updated_at' => $this->updated_at ?? null,
        ];
    }
}
