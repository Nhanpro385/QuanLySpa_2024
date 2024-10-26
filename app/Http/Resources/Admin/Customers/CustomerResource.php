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
            'name' => $this->name,
            'password' => $this->password, 
            'email' => $this->email,
            'phone' => $this->phone,
            'gender' => $this->gender,
            'address' => $this->address,
            'date_of_birth' => $this->date_of_birth,
            'note' => $this->note,
            'status' => $this->status,
            'created_by' => $this->created_by,
            'updated_by' => $this->updated_by,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
        ];
    }
}
