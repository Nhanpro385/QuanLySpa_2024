<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TreatmentHistory extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $keyType = 'string';
    public $incrementing = false;

    protected $table = 'treatment_histories';

    protected $fillable = [
        'id',
        'service_id',
        'customer_id',
        'appointment_id',
        'staff_id',
        'image_before',
        'image_after',
        'feedback',
        'note',
        'status',
        'created_by',
    ];

    protected $attribute = [
        'status' => true
    ];
}
