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
        'status' => true,
        'description' => 'Mô tả sản phẩm.',
        'image_url' => 'https://img.freepik.com/premium-photo/beautiful-colorful-valentine-s-day-heart-cloud-as-abstract-backgroundai-technology-generated-imag_1112-11207.jpg'
    ];


    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
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
        return $this->hasMany(ProductService::class, 'product_id', 'id');
    }
    public function treatmentProduct()
    {
        return $this->hasMany(Product::class, 'products_id', 'id');
    }


}
