<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentProducts extends Model
{
    /** @use HasFactory<\Database\Factories\PaymentProductsFactory> */
    use HasFactory;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $table = 'payment_products';

    protected $fillable = [
        'id',
        'product_id',
        'payment_id',
        'quantity',
        'unit_price',
        'total_price',
    ];

    protected $casts = [
        'id' => 'string',
        'product_id' => 'string',
        'payment_id' => 'string',
    ];


}
