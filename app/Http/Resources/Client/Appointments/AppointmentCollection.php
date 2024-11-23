<?php

namespace App\Http\Resources\Client\Appointments;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class AppointmentCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public $collects = AppointmentResource::class;
    public function toArray(Request $request): array
    {
        return parent::toArray($request);
    }
}
