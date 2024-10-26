<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class ProductService extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $keyType = 'string';
    public $incrementing = false;

    protected $table = 'product_services';

    protected $fillable = [
        'id',
        'product_id',
        'service_id',
        'quantity_used'
    ];
    public function service()
    {
        return $this->belongsTo(Service::class, 'services_id', 'id');
    }
    public function product()
    {
        return $this->belongsTo(Product::class, 'products_id', 'id');
    }
}
