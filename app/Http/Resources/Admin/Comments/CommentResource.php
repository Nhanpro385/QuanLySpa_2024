<?php

namespace App\Http\Resources\Admin\Comments;

use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'service_id' => $this->service_id,
            'customer_id' => $this->customer_id,
            'comment' => $this->comment,
            'rate' => $this->rate,
            'status' => $this->status,
            'type' => $this->type,
            'image_url' => $this->image_url,


            'created_by' => $this->createdByUser ? [
                'id' => $this->createdByUser->id,
                'full_name' => $this->createdByUser->full_name,
                'role' => $this->getRoleName($this->createdByUser->role),
            ] : null,


            'updated_by' => $this->updatedByUser ? [
                'id' => $this->updatedByUser->id,
                'full_name' => $this->updatedByUser->full_name,
                'role' => $this->getRoleName($this->updatedByUser->role),
            ] : null,


            'created_at' => $this->created_at ? $this->created_at->format('d-m-Y H:i') : null,
            'updated_at' => $this->updated_at ? $this->updated_at->format('d-m-Y H:i') : null,
        ];
    }


    private function getRoleName($role)
    {
        return $role === 0 ? 'Quản trị viên' : 'Nhân viên';
    }
}
