<?php

namespace App\Http\Resources\Client\Promotion;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PromotionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'status' => $this->status,
            'start_date' => $this->start_date ? $this->start_date : null,
            'end_date' => $this->end_date ? $this->end_date: null,
            'promotion_type' => $this->promotion_type ,
            'discount_percent' => $this->discount_percent,
            'min_order_amount' => $this->min_order_amount,
            'min_quantity' => $this->min_quantity,
            'image_url' => $this->image_url,

            'created_at' => $this->created_at ? $this->created_at->format('d-m-Y H:i') : null,
            'updated_at' => $this->updated_at ? $this->updated_at->format('d-m-Y H:i') : null,
        ];
    }
}
