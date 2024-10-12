<?php

namespace App\Http\Resources\Admin\Products;

use App\Http\Resources\Admin\Users\UserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
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
            'category_id' => $this->category_id ? $this->category->name : null,
            'name' => $this->name,
            'price' => $this->price,
            'cost' => $this->cost,
            'capacity' => $this->capacity,
            'bar_code' => $this->bar_code,
            'date' => $this->date,
            'image_url' => $this->image_url,
            'description' => $this->description,
            'status' => $this->status,
            'created_by' => $this->relationLoaded('createdBy') ? new UserResource($this->createdBy) : null,
            'created_at' =>
                $this->created_at->format('Y-m-d'),
            'updated_at' => $this->updated_at->format('Y-m-d')
        ];
    }
}
