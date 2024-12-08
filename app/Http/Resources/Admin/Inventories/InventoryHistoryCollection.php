<?php

namespace App\Http\Resources\Admin\Inventories;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class InventoryHistoryCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        $firstItem = $this->collection->first();

        return [
            'product' => [
                'id' => $firstItem->product_id, // Lấy product_id từ bản ghi đầu tiên
                'name' => $firstItem->product_name,
                'barcode' => $firstItem->product_barcode,
            ],
            'history' => $this->collection->map(function ($item) {
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
