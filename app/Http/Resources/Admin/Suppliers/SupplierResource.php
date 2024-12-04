<?php

namespace App\Http\Resources\Admin\Suppliers;

use Illuminate\Http\Resources\Json\JsonResource;

class SupplierResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => (string) $this->id,
            'name' => $this->name,
            'country' => $this->country,
            'contact_email' => $this->contact_email,
            'code' => $this->code,
            'created_by' => $this->createdBy ? [
                'id' => (string) $this->createdBy->id,
                'full_name' => $this->createdBy->full_name,
                'role' => $this->getRoleName($this->createdBy->role),
            ] : null,
            'updated_by' => $this->updatedBy ? [
                'id' => (string) $this->updatedBy->id,
                'full_name' => $this->updatedBy->full_name,
                'role' => $this->getRoleName($this->updatedBy->role),
            ] : null,
            'created_at' => $this->created_at->format('d-m-Y H:i'),
            'updated_at' => $this->updated_at ? $this->updated_at->format('d-m-Y H:i') : null,
        ];
    }

    private function getRoleName($role)
    {
        return $role === 0 ? 'Quản trị viên' : 'Nhân viên';
    }
}
