<?php

namespace App\Http\Resources\Client\Comment;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $images = $this->images->map(function ($image) {
            return [
                'id' => $image->id,
                'image_url' => $image->image_url,
                'created_at' => $image->created_at ? $image->created_at->format('d-m-Y H:i') : null,
            ];
        });

        return [
            'id' => $this->id,
            'service_id' => $this->service_id,
            'service' => $this->service,
            'customer_id' => $this->customer_id,
            'customer' => $this->customer,
            'comment' => $this->comment,
            'rate' => $this->rate,
            'status' => $this->status,
            'type' => $this->type,
            'image_url' => $images,
            'replies' => $this->replies,





            'created_at' => $this->created_at ? $this->created_at->format('d-m-Y H:i') : null,
            'updated_at' => $this->updated_at ? $this->updated_at->format('d-m-Y H:i') : null,
        ];
    }

    }

