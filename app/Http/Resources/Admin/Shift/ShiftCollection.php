<?php 
namespace App\Http\Resources\Admin\Shift;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ShiftCollection extends ResourceCollection
{
    public $collects = ShiftResource::class;
}
