<?php

namespace App\Http\Resources\Admin\StaffShift;
 
use App\Http\Resources\Admin\StaffShift\StaffShiftResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class StaffShiftCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
   
        public $collects = StaffShiftResource::class;
    
}
