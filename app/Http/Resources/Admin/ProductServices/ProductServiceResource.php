<?php

namespace App\Http\Resources\Admin\ProductServices;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductServiceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'product_id' => $this->product_id ? $this->product->name : null,
            'service_id' => $this->service_id ? $this->service->name : null,
            'quantity_used' => $this->quantity_used,
            'created_at' =>
                $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s')
        ];
    }
}
