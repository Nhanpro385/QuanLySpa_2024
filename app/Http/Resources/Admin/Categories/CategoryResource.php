<?php

namespace App\Http\Resources\Admin\Categories;

use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'parent_id' => $this->parentCategory ? [
                'id' => $this->parentCategory->id,
                'name' => $this->parentCategory->name,
                'role' => $this->parentCategory->createdByUser ? $this->getRoleName($this->parentCategory->createdByUser->role) : null,
            ] : null,
            'name' => $this->name,
            'description' => $this->description,
            'status' => $this->status,
            'created_by' => $this->createdByUser ? [
                'id' => $this->createdByUser->id,
                'full_name' => $this->createdByUser->full_name,
                'role' => $this->getRoleName($this->createdByUser->role),
            ] : null,
            'updated_by' => $this->updatedByUser ? [
                'id' => $this->updatedByUser->id,
                'full_name' => $this->updatedByUser->full_name,
                'role' => $this->getRoleName($this->updatedByUser->role),
            ] : null,
            'deleted_at' => $this->deleted_at ? $this->deleted_at->format('d-m-Y H:i') : null,
            'created_at' => $this->created_at->format('d-m-Y H:i'),
            'updated_at' => $this->updated_at ? $this->updated_at->format('d-m-Y H:i') : null,
        ];
    }

    private function getRoleName($role)
    {
        return $role === 0 ? 'Quản trị viên' : 'Nhân viên';
    }
}
