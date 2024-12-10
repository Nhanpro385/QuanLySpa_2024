<?php

namespace App\Http\Resources\Client\Comment;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Customer;

class CommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $customer = Customer::find($this->customer_id);
        $images = $this->images->map(function ($image) {
            return [
                'id' =>(string) $image->id,
                'image_url' => $image->image_url,
                'created_at' => $image->created_at ? $image->created_at->format('d-m-Y H:i') : null,
            ];
        });

        return [
            'id' =>(string) $this->id,
            'service_id' => (string)$this->service_id,
            'service' => $this->service,
           
            'customer' => $customer ? [
                'id' => (string) $customer->id,
                'full_name' => $customer->full_name,

            ] : null,
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

