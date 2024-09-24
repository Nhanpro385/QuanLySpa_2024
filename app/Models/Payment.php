<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Payment extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $keyType = 'string';
    public $incrementing = false;

    protected $table = 'payments';

    protected $fillable = [
        'id',
        'promotion_id',
        'appointment_id',
        'pay',
        'reduce',
        'total_amount',
        'payment_type',
        'status',
        'created_by'
    ];

    protected $attribute = [
        'status' => true
    ];
    public function appointment()
    {
        return $this->belongsTo(Appointment::class, 'appointment_id', 'id');
    }
    public function promotion()
    {
        return $this->belongsTo(Promotion::class, 'promotions_id', 'id');
    }
}
