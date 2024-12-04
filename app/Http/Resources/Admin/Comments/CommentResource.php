<?php

namespace App\Http\Resources\Admin\Comments;

use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
    public function toArray($request)
    {

        $images = $this->images->map(function ($image) {
            return [
                'id' => (string) $image->id,
                'image_url' => $image->image_url,
                'created_at' => $image->created_at ? $image->created_at->format('d-m-Y H:i') : null,
            ];
        });

        return [
            'id' => (string) $this->id,
            'service_id' => (string) $this->service_id,
            'customer_id' => (string) $this->customer_id,
            'comment' => $this->comment,
            'rate' => $this->rate,
            'status' => $this->status,
            'type' => $this->type,
            'image_url' => $images,

            'created_by' => $this->createdByUser ? [
                'id' => (string) $this->createdByUser->id,
                'full_name' => $this->createdByUser->full_name,
                'role' => $this->getRoleName($this->createdByUser->role),
            ] : null,

            'updated_by' => $this->updatedByUser ? [
                'id' => (string) $this->updatedByUser->id,
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
