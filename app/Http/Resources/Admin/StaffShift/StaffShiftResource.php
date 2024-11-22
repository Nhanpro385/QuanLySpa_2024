<?php

namespace App\Http\Resources\Admin\StaffShift;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;


class StaffShiftResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' =>(string) $this->id,
            'staff' => [
                'id' =>(string) $this->staff->id,
                'name' => $this->staff->full_name,
                'role' => $this->staff->role,
            ],
            'shift' => [
                'id' => (string) $this->shift->id,
                'shift_date' => $this->shift->shift_date,
                'start_time' => $this->shift->start_time,
                'end_time' => $this->shift->end_time,
            ],
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}