<?php

namespace App\Http\Resources\Client\TreatmentHistories;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class TreatmentHistoryCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */ 
    public $collects = TreatmentHistoryResource::class;
}
