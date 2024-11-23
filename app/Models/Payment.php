<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Payment extends Model
{
    use HasFactory;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $table = 'payments';

    protected $fillable = [
        'id',
        'promotion_id',
        'appointment_id',
        'service_total',
        'product_total',
        'subtotal',
        'reduce',
        'total_amount',
        'payment_type',
        'status',
        'created_by'
    ];

    protected $attribute = [
        'status' => true
    ];

    protected $casts = [
        'id' => 'string',
        'promotion_id' => 'string',
        'appointment_id' => 'string',
        'created_by' => 'string',
    ];


    public function appointment()
    {
        return $this->belongsTo(Appointment::class, 'appointment_id', 'id');
    }
    public function promotion()
    {
        return $this->belongsTo(Promotion::class, 'promotion_id', 'id');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'payment_products', 'payment_id', 'product_id')->withPivot('quantity', 'unit_price', 'total_price');
    }
}
