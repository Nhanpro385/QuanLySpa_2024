<?php

namespace App\Http\Resources\Admin\Notifications;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class NotificationConllection extends ResourceCollection
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public $collects = NotificationResource::class;
    public function toArray(Request $request): array
    {
        return parent::toArray($request);
    }
}
