<?php

namespace App\Http\Resources\Admin\Customers;

use Illuminate\Http\Resources\Json\JsonResource;

class CustomerResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'full_name' => $this->full_name,
            'gender' => $this->gender,
            'email' => $this->email ,
            'phone' => $this->phone ,
            'address' => $this->address,
            'created_by' => $this->createdBy ? [
                'id' => $this->createdBy->id,
                'full_name' => $this->createdBy->full_name,
                'role' => $this->getRoleName($this->createdBy->role),
            ] : null,
            'updated_by' => $this->updatedBy ? [
                'id' => $this->updatedBy->id,
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
