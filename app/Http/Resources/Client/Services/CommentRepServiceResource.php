<?php

namespace App\Http\Resources\Client\Services;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentRepServiceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $images = $this->whenLoaded('images') ? $this->images : [];
        $clientReplies = $this->whenLoaded('clientReplies') ? $this->clientReplies : [];
        return [
            'id' => $this->id,
            'customer' => $this->customer_id ? [
                'id' => $this->customer->id,
                'full_name' => $this->customer->full_name,
                'email' => $this->customer->email,
            ] : null,
            'comment' => $this->comment,
            'parent_comment_id' => $this->parent_comment_id,
            'rate' => $this->rate,
            'type' => $this->type,
            'image_url' => $images ? $images->map(function ($image) {
                return [
                    'id' => $image->id,
                    'image_url' => $image->image_url,
                    'created_at' => $image->created_at ?
                        $image->created_at->format('Y-m-d') : null,
                ];
            }) : [],
            'clientReplies' => $clientReplies ? CommentRepServiceResource::collection($clientReplies) : [],
            'created_at' => $this->created_at ?
                $this->created_at->format('Y-m-d') : null,
            'updated_at' => $this->updated_at ? $this->updated_at->format('Y-m-d') : null,
        ];
    }
}
