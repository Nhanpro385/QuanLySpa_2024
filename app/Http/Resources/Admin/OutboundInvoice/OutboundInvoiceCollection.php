<?php

namespace App\Http\Resources\Admin\OutboundInvoice;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class OutboundInvoiceCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public $collects = OutboundInvoiceResource::class;
}
