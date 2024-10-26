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
            'parent_comment_id' => $this->parent_comment_id,
            'comment' => $this->comment,
            'rate' => $this->rate,
            'status' => $this->status,
            'image_url' => $this->image_url,
            'admin_reply' => $this->admin_reply,
            'created_at' => $this->created_at->toISOString(),
            'updated_at' => $this->updated_at->toISOString(),

            'created_by' => $this->created_by,
            'updated_by' => $this->updated_by,

            'replies' => CommentResource::collection($this->whenLoaded('replies')),
        ];
    }
}
