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
        $productImages = $inventories = [];

        if ($request->input('productImages') === "true") {
            $productImages = $this->whenLoaded('productImages') ? $this->productImages : [];
        }
        if ($request->input('inventories') === "true") {
            $inventories = $this->whenLoaded('inventories') ? $this->inventories : [];
        }


        return [
            'id' => (string) $this->id,
            'category_id' => $this->category_id ? [
                'id' => (string) $this->category->id,
                'name' => $this->category->name
            ] : null,
            'name' => $this->name,
            'price' => $this->price,
            'cost' => $this->cost,
            'capacity' => $this->capacity,
            'bar_code' => $this->bar_code,
            'date' => $this->date,
            'image_url' => $this->image_url,
            'priority' => $this->priority,
            'description' => $this->description,
            'status' => $this->status,
            'productImages' => $productImages ? $productImages->map(function ($productImage) {
                return [
                    'id' => $productImage->id,
                    'image_url' => $productImage->image_url,
                ];
            }) : [],
            'inventories' => $inventories ? $inventories->map(function ($inventorie) {
                return [
                    'id' => $inventorie->id,
                    'quantity' => $inventorie->quantity,
                    'created_at' => $inventorie->created_at ? $inventorie->created_at->format('Y-m-d') : null,
                    'created_by' => $inventorie->created_by ? $inventorie->createdBy->full_name : null,
                    'updated_by' => $inventorie->updated_by ? $inventorie->updatedBy->full_name : null,
                ];
            }) : [],
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
            'created_at' => $this->created_at ?
                $this->created_at->format('Y-m-d') : null,
            'updated_at' => $this->updated_at ? $this->updated_at->format('Y-m-d') : null,
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
