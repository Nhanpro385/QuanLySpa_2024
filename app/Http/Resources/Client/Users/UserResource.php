<?php

namespace App\Http\Resources\Client\Users;

use App\Http\Resources\Admin\Appointments\AppointmentResource;
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
        $shifts = [];
        $shifts_after = [];
        $shifts_before = [];
        $treatmentHistories = [];
        if ($request->input('shifts') === 'true') {
            $shifts = $this->whenLoaded('shifts') ? $this->shifts : [];
        }
        if ($request->input('shifts_after') === 'true') {
            $shifts_after = $this->whenLoaded('shifts_after') ? $this->shifts_after : [];
        }
        if ($request->input('shifts_before') === 'true') {
            $shifts_before = $this->whenLoaded('shifts_before') ? $this->shifts_before : [];
        }
        if ($request->input('treatmentHistories') === 'true') {
            $treatmentHistories = $this->whenLoaded('treatmentHistories') ? $this->treatmentHistories : [];
        }
        return [
            'id' => (string) $this->id,
            'position' => $this->position_id ? [
                'id' => $this->position->id,
                'name' => $this->position->name,
                'wage' => $this->position->wage
            ] : null,
            'role' => $this->roleName((int) $this->role),
            'full_name' => $this->full_name,
            'gender' => $this->genderName($this->gender),
            'phone' => $this->phone,
            'email' => $this->email,
            'address' => $this->address,
            'date_of_birth' => $this->date_of_birth,
            'note' => $this->note,
            'status' => $this->status,
            'shifts' => $shifts ? $shifts->map(function ($shift) {
                return [
                    "id" => $shift->id,
                    "start_time" => $shift->start_time,
                    "end_time" => $shift->end_time,
                    "shift_date" => $shift->shift_date,
                    "max_customers" => $shift->max_customers,
                    "note" => $shift->note,
                    "status" => $shift->status,
                ];
            }) : [],
            'shifts_after' => $shifts_after ? $shifts_after->map(function ($shift) {
                return [
                    "id" => $shift->id,
                    "start_time" => $shift->start_time,
                    "end_time" => $shift->end_time,
                    "shift_date" => $shift->shift_date,
                    "max_customers" => $shift->max_customers,
                    "note" => $shift->note,
                    "status" => $shift->status,
                ];
            }) : [],
            'shifts_before' => $shifts_before ? $shifts_before->map(function ($shift) {
                return [
                    "id" => $shift->id,
                    "start_time" => $shift->start_time,
                    "end_time" => $shift->end_time,
                    "shift_date" => $shift->shift_date,
                    "max_customers" => $shift->max_customers,
                    "note" => $shift->note,
                    "status" => $shift->status,
                ];
            }) : [],
            'treatmentHistories' => $treatmentHistories ? $treatmentHistories->map(function ($treatmentHistory) {
                return [
                    'id' => $treatmentHistory->id,
                    'customer_id' => $treatmentHistory->customer_id ? [
                        'id' => $treatmentHistory->customer->id,
                        'full_name' => $treatmentHistory->customer->full_name
                    ] : [],
                    'appointments' => $treatmentHistory->appointment_id ? [
                        new AppointmentResource($treatmentHistory->appointment)
                    ] : [],
                    'feedback' => $treatmentHistory->feedback,
                    'evaluete' => $treatmentHistory->evaluete
                ];
            }) : [],
            'created_by' => $this->created_by ? [
                'id' => (string) $this->createdBy->id,
                'fullname' => $this->createdBy->full_name,
                'role' => $this->roleName((int) $this->createdBy->role)
            ] : null,
            'updated_by' => $this->updated_by ? [
                'id' => (string) $this->updatedBy->id ?? null,
                'fullname' => $this->updatedBy->full_name,
                'role' => $this->roleName((int) $this->updatedBy->role)
            ] : null,
            'created_at' => $this->created_at ?
                $this->created_at->format('Y-m-d') : null,
            'updated_at' => $this->updated_at ? $this->updated_at->format('Y-m-d') : null,
        ];
    }

    public function roleName(int $role)
    {
        $name = '';
        if ($role === 0) {
            $name = 'Quản trị viên';
        }
        if ($role === 2) {
            $name = 'Nhân viên tư vấn và chăm sóc khách hàng';
        }
        if ($role === 1) {
            $name = "Nhân viên";
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
