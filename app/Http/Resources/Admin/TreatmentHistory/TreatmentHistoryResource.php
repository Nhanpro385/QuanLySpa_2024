<?php

namespace App\Http\Resources\Admin\TreatmentHistory;

use Illuminate\Http\Resources\Json\JsonResource;

class TreatmentHistoryResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'customer_id' => $this->customer_id,
            'appointment_id' => $this->appointment_id,
            'staff_id' => $this->staff_id,
            'image_before' => $this->image_before,
            'image_after' => $this->image_after,
            'feedback' => $this->feedback,
            'note' => $this->note,
            'status' => $this->status,
            'evaluete' => $this->evaluete,
            'created_by' => $this->created_by ? [
                'id' => $this->created_by,
                'full_name' => $this->createdBy->full_name ?? null,
                'role' => $this->createdBy->role->name ?? null,
            ] : null,
            'updated_by' => $this->updated_by ? [
                'id' => $this->updated_by,
                'full_name' => $this->updatedBy->full_name ?? null,
                'role' => $this->updatedBy->role->name ?? null,
            ] : null,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
