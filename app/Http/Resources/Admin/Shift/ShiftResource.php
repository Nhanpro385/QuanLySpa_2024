<?php

namespace App\Http\Resources\Admin\Shift;

use Illuminate\Http\Resources\Json\JsonResource;

class ShiftResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'start_time' => $this->start_time,
            'end_time' => $this->end_time,
            'shift_date' => $this->shift_date,
            'max_customers' => $this->max_customers,
            'note' => $this->note,
            'status' => $this->status,
            'created_by' => $this->createdBy ? [
                'id' => $this->createdBy->id,
                'name' => $this->createdBy->full_name,
                'role' => $this->createdBy->role,
            ] : null,
            'updated_by' => $this->updatedBy ? [
                'id' => $this->updatedBy->id,
                'name' => $this->updatedBy->full_name,
                'role' => $this->updatedBy->role,
            ] : null,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}

