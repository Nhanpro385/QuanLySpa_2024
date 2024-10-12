<?php

namespace App\Http\Resources\Admin\Shift;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShiftResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'start_time' => $this->start_time,
            'end_time' => $this->end_time,
            'shift_date' => $this->shift_date,
            'max_customers' => $this->max_customers,
            'note' => $this->note,
            'status' => $this->status,
            'created_by' => $this->created_by,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            // Thêm thông tin liên quan nếu cần
            'staff' => $this->staff->pluck('id'), // Lấy danh sách ID của nhân viên
        ];
    }
}