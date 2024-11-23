<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Promotion extends Model
{
    use HasFactory, SoftDeletes;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $table = 'promotions';
    protected $fillable = [
        'id',
        'name',
        'start_date',
        'end_date',
        'promotion_type',
        'discount_percent',
        'description',
        'min_order_amount',
        'min_quantity',
        'image_url',
        'status',
        'created_by',
        'updated_by',
    ];

    protected $attributes = [
        'status' => true,
    ];

    public function payment()
    {
        return $this->hasMany(Payment::class, 'promotions_id', 'id');
    }

    public function createdByUser()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedByUser()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
