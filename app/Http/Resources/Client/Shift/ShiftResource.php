<?php

namespace App\Http\Resources\Client\Shift;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShiftResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        return [
            'id' => (string) $this->id,
            'start_time' => $this->start_time,
            'end_time' => $this->end_time,
            'shift_date' => $this->shift_date,
            'max_customers' => $this->max_customers,
            'note' => $this->note,
            'status' => $this->status,
            'created_by' => $this->createdBy ? [
                'id' => (string) $this->createdBy->id,
                'name' => $this->createdBy->full_name,
                'role' => $this->createdBy->role,
            ] : null,
            'updated_by' => $this->updatedBy ? [
                'id' => (string) $this->updatedBy->id,
                'name' => $this->updatedBy->full_name,
                'role' => $this->updatedBy->role,
            ] : null,
            'staffs' => $this->staffShifts->map(function ($staff) {
                return [
                    'id' => (string) $staff->id,
                    'name' => $staff->full_name,
                    'role' => $staff->role,
                ];
            }),
            'appointment_count' => $this->appointment_count,
           
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
    
}
