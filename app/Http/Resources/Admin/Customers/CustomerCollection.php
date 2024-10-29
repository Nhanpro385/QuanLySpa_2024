<?php

namespace App\Http\Resources\Admin\Customers;

use Illuminate\Http\Resources\Json\ResourceCollection;

class CustomerCollection extends ResourceCollection
{
    public function toArray($request)
    {
        return [
            'data' => $this->collection->map(function ($customer) {
                return [
                    'id' => $customer->id,
                    'full_name' => $customer->full_name,
                    'gender' => $customer->gender,
                    'email' => $customer->email ?? 'Chưa có thông tin',
                    'phone' => $customer->phone ?? 'Chưa có thông tin', 
                    'date_of_birth' => $customer->date_of_birth,
                    'address' => $customer->address,
                    'created_by' => $customer->createdBy ? [
                        'id' => $customer->createdBy->id,
                        'full_name' => $customer->createdBy->full_name,
                        'role' => $this->getRoleName($customer->createdBy->role),
                    ] : null,
                    'updated_by' => $customer->updatedBy ? [
                        'id' => $customer->updatedBy->id,
                        'full_name' => $customer->updatedBy->full_name,
                        'role' => $this->getRoleName($customer->updatedBy->role),
                    ] : null,
                    'created_at' => $customer->created_at->format('d-m-Y H:i'),
                    'updated_at' => $customer->updated_at ? $customer->updated_at->format('d-m-Y H:i') : null,
                ];
            }),
            'meta' => [
                'current_page' => $this->currentPage(),
                'last_page' => $this->lastPage(),
                'per_page' => $this->perPage(),
                'total' => $this->total(),
            ],
        ];
    }

    private function getRoleName($role)
    {
        return $role === 0 ? 'Quản trị viên' : 'Nhân viên';
    }
}
