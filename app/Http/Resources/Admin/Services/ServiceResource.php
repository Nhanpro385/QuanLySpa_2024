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
        $productServices = $this->whenLoaded('productServices') ? $this->productServices : [];
        $serviceImages = $this->whenLoaded('serviceImages') ? $this->serviceImages : [];
        return [
            'id' => (string) $this->id,
            'service_category_id' => $this->service_category_id ? $this->serviceCategory->name : $this->service_category_id,
            'name' => $this->name,
            'price' => $this->price,
            'description' => $this->description,
            'image_url' => $this->image_url,
            'duration' => $this->duration,
            'status' => $this->status,
            'created_by' => $this->created_by ? [
                'id' => (string) $this->createdBy->id,
                'fullname' => $this->createdBy->full_name,
                'role' => $this->roleName($this->createdBy->role)
            ] : null,
            'updated_by' => $this->updated_by ? [
                'id' => (string) $this->updatedBy->id ?? null,
                'fullname' => $this->updatedBy->full_name,
                'role' => $this->roleName($this->updatedBy->role)
            ] : null,
            'created_at' =>
                $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
            'productServices' => $productServices ? $productServices->map(function ($productService) {
                return [
                    'id' => $productService->id,
                    'product_id' => $productService->product_id,
                    'service_id' => $productService->service_id,
                    'quantity_used' => $productService->quantity_used
                ];
            }) : [],
            'serviceImages' => $serviceImages ? $serviceImages->map(function ($serviceImage) {
                return [
                    'id' => $serviceImage->id,
                    'image_url' => $serviceImage->image_url,
                    'created_by' => $serviceImage->createdBy->full_name,
                ];
            }) : []
        ];
    }

    public function roleName($role)
    {
        $name = 'Nhân viên';
        if ($role == 0) {
            $name = 'Quản trị viên';
        } elseif ($role == 2) {
            $name = 'Nhân viên tư vấn và chăm sóc khách hàng';
        }
        return $name;
    }
}
