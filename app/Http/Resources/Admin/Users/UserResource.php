<?php

namespace App\Http\Resources\Admin\Users;

use App\Http\Resources\Admin\Positions\PositionResource;
use App\Models\Position;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => (string) $this->id,
            'position' => $this->position_id ? [
                'id' => $this->position->id,
                'name' => $this->position->name,
                'wage' => $this->position->wage
            ] : null,
            'role' => $this->roleName($this->role),
            'full_name' => $this->full_name,
            'gender' => $this->genderName($this->gender),
            'phone' => $this->phone,
            'email' => $this->email,
            'address' => $this->address,
            'date_of_birth' => $this->date_of_birth,
            'note' => $this->note,
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
                $this->created_at->format('Y-m-d'),
            'updated_at' => $this->updated_at->format('Y-m-d')
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

    public function genderName($gender)
    {
        $name = 'Nữ';
        if ($gender == 0) {
            $name = 'Khác';
        } elseif ($gender == 2) {
            $name = 'Nam';
        }
        return $name;
    }
}
