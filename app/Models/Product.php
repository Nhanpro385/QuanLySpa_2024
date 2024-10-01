<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $keyType = 'string';
    public $incrementing = false;

    protected $table = 'products';
    protected $fillable = [
        'id',
        'category_id',
        'name',
        'price',
        'cost',
        'capacity',
        'bar_code',
        'date',
        'image_url',
        'description',
        'status',
        'created_by'
    ];

    protected $attributes = [
        'status' => true
    ];
    public function category()
    {
        return $this->belongsTo(Category::class, 'categorys_id', 'id');
    }
    public function inventory()
    {
        return $this->hasOne(Inventory::class);
    }
    public function inboundInvoiceDetail()
    {
        return $this->hasMany(Product::class, 'products_id', 'id');
    }
    public function outboundInvoiceDetail()
    {
        return $this->hasMany(Product::class, 'products_id', 'id');
    }
    public function productService()
    {
        return $this->hasMany(Product::class, 'products_id', 'id');
    }
    public function treatmentProduct()
    {
        return $this->hasMany(Product::class, 'products_id', 'id');
    }


}
