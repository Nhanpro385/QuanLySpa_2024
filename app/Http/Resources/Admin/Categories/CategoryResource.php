<?php

namespace App\Http\Resources\Admin\Categories;

use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => (string) $this->id,
            'parent_id' => (string) $this->parentCategory ? [
                'id' => (string) $this->parentCategory->id,
                'name' => $this->parentCategory->name,

            ] : null,
            'name' => $this->name,
            'description' => $this->description,
            'status' => $this->status,
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
