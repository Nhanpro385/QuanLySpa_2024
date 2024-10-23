<?php

namespace App\Http\Resources\Admin\Services;

use App\Http\Resources\Admin\ProductServices\ProductServiceResource;
use App\Http\Resources\Admin\ServiceImages\ServiceImageResource;
use App\Http\Resources\Admin\Users\UserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceResource extends JsonResource
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
            'service_category_id' => $this->serviceCategory->name ?? $this->service_category_id,
            'name' => $this->name,
            'price' => $this->price,
            'description' => $this->description,
            'image_url' => $this->image_url,
            'duration' => $this->duration,
            'status' => $this->status,
            'created_by' => $this->createdBy->name ?? $this->created_by,
            'created_at' =>
                $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
            'productServices' => $this->productServices ? ProductServiceResource::collection($this->productServices) : null,
            'serviceImages' => $this->serviceImages ? ServiceImageResource::collection($this->serviceImages) : null,
        ];
    }
}
