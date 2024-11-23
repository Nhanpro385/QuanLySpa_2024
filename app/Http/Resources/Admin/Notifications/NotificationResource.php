<?php

namespace App\Http\Resources\Admin\Notifications;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NotificationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        return [
            'id' => (string) $this->id,
            'type' => $this->type,
            'data' => $this->data,
            'notifiable_type' => $this->notifiable_type,
            'created_at' => $this->created_at ?
                $this->created_at->format('Y-m-d H:s:i') : null,
            'updated_at' => $this->updated_at ?
                $this->updated_at->format('Y-m-d H:s:i') : null,
        ];
    }
}
