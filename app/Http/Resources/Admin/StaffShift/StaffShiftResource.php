<?php

namespace App\Http\Resources\Admin\StaffShift;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;


class StaffShiftResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'staff_id' => $this->staff_id,
            'shift_id' => $this->shift_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}