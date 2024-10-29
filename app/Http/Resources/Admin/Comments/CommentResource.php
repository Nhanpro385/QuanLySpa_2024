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
            'parent_comment_id' => $this->parentComment ? [
                'id' => $this->parentComment->id,
                'comment' => $this->parentComment->comment,
                'created_by' => $this->parentComment->createdBy ? [
                    'id' => $this->parentComment->createdBy->id,
                    'full_name' => $this->parentComment->createdBy->full_name,
                    'role' => $this->parentComment->createdBy->role,
                ] : null,
            ] : null,
            'comment' => $this->comment,
            'rate' => $this->rate,
            'status' => $this->status,
            'image_url' => $this->image_url,
            'admin_reply' => $this->admin_reply,

            'created_by' => $this->createdBy ? [
                'id' => $this->createdBy->id,
                'full_name' => $this->createdBy->full_name,
                'role' => $this->createdBy->role,
            ] : null,

            'updated_by' => $this->updatedBy ? [
                'id' => $this->updatedBy->id,
                'full_name' => $this->updatedBy->full_name,
                'role' => $this->updatedBy->role,
            ] : null,

            'created_at' => $this->created_at->format('d-m-Y H:i'),
            'updated_at' => $this->updated_at ? $this->updated_at->format('d-m-Y H:i') : null,

            'replies' => CommentResource::collection($this->whenLoaded('replies')),
        ];
    }
}
