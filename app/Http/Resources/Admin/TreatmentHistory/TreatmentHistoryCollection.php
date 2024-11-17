<?php

namespace App\Http\Resources\Admin\TreatmentHistory;


use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;


class TreatmentHistoryCollection extends ResourceCollection
{
    public $collects = TreatmentHistoryResource::class;
}
