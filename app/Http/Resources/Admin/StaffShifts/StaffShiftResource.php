<?php

namespace App\Http\Resources\Admin\StaffShifts;

use Illuminate\Http\Resources\Json\JsonResource;

class StaffShiftResource extends JsonResource
{
    public function toArray($request)
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
