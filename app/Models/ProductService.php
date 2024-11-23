<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class ProductService extends Model
{
    use HasFactory;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $table = 'product_services';

    protected $fillable = [
        'id',
        'product_id',
        'service_id',
        'quantity_used'
    ];

    protected $casts = [
        'id' => 'string',
        'product_id' => 'string',
        'service_id' => 'string',
        'created_by' => 'string',
        'updated_by' => 'string',
    ];

    public function service()
    {
        return $this->belongsTo(Service::class, 'service_id', 'id');
    }
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }
}
