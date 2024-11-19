<?php

namespace App\Http\Resources\Admin\Consulations;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ConsulationResource extends JsonResource
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
            'customer' => $this->customer_id ? [
                'id' => (string) $this->customer_id,
                'full_name' => $this->customer->full_name,
                'phone' => $this->customer->phone,
                'email' => $this->customer->email
            ] : null,
            'staff_id' => $this->staff_id ? [
                'id' => (string) $this->user->id ?? null,
                'fullname' => $this->user->full_name,
                'role' => $this->roleName($this->user->role)
            ] : null,
            'consulation' => $this->consulation,
            'skin_condition' => $this->skin_condition,
            'treatment_plan' => $this->treatment_plan,
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
