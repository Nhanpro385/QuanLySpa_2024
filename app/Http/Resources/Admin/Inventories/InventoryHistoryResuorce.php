<?php

namespace App\Http\Resources\Admin\Inventories;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InventoryHistoryResuorce extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'product' => [
                'id' => $this->first()->product_id, // Lấy product_id từ bản ghi đầu tiên
                'name' => $this->first()->product_name,
                'barcode' => $this->first()->product_barcode,
            ],
            'history' => $this->map(function ($item) {
                return [
                    'type' => $item->type, // inbound hoặc outbound
                    'invoice_id' => $item->invoice_id,
                    'quantity' => $item->quantity,
                    'cost' => $item->cost,
                    'old_cost' => $item->old_cost, // null cho inbound
                    'date' => $item->date,
                    'note' => $item->note,
                    'created_by' => [
                        'id' => $item->created_by_id,
                        'name' => $item->created_by_name,
                    ],
                ];
            }),
        ];
    }
}
