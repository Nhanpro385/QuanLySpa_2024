<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Consulation extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $keyType = 'string';
    public $incrementing = false;

    protected $table = 'consulations';

    protected $fillable = [
        'id',
        'customer_id',
        'staff_id',
        'consulation',
        'skin_condition',
        'treatment_plan',
        'status'
    ];

    protected $attribute = [
        'status' => true
    ];
}
