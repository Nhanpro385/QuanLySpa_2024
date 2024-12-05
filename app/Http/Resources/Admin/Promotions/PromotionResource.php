<?php

namespace App\Http\Resources\Admin\Promotions;

use Illuminate\Http\Resources\Json\JsonResource;

class PromotionResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => (string) $this->id,
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
            'created_by' => $this->createdByUser ? [
                'id' => (string) $this->createdByUser->id,
                'full_name' => $this->createdByUser->full_name,
                'role' => $this->getRoleName($this->createdByUser->role),
            ] : null,
            'updated_by' => $this->updatedByUser ? [
                'id' => (string) $this->updatedByUser->id,
                'full_name' => $this->updatedByUser->full_name,
                'role' => $this->getRoleName($this->updatedByUser->role),
            ] : null,
            'created_at' => $this->created_at ? $this->created_at->format('d-m-Y H:i') : null,
            'updated_at' => $this->updated_at ? $this->updated_at->format('d-m-Y H:i') : null,
        ];
    }

    private function getRoleName($role)
    {
        return $role === 0 ? 'Quản trị viên' : 'Nhân viên';
    }
}
