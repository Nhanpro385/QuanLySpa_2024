<?php

namespace App\Http\Resources\Admin\Payments;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class PaymentCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public $collects = PaymentResource::class;

    public function toArray(Request $request): array
    {
        return parent::toArray($request);
    }
}
