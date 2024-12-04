<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
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
        'priority',
        'description',
        'status',
        'created_by',
        'updated_by',
    ];

    protected $attributes = [
        'status' => true,
        'description' => 'Mô tả sản phẩm.',
        'image_url' => 'default.jpg'
    ];


    protected $casts = [
        'id' => 'string',
        'category_id' => 'string',
        'bar_code' => 'string',
        'created_by' => 'string',
        'updated_by' => 'string',
    ];


    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }

    public function updatedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by', 'id');
    }
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    public function productImages(): HasMany
    {
        return $this->hasMany(ProductImage::class, 'product_id', 'id');
    }

    public function inventories(): HasMany
    {
        return $this->hasMany(Inventory::class, 'product_id', 'id')->orderBy('created_at', 'DESC');
    }
    public function inboundInvoiceDetail()
    {
        return $this->hasMany(Product::class, 'products_id', 'id');
    }
    public function outboundInvoiceDetail()
    {
        return $this->hasMany(Product::class, 'products_id', 'id');
    }
    public function services()
    {
        return $this->belongsToMany(Service::class, 'product_services', 'product_id', 'service_id')->withPivot('quantity_used')->withTimestamps();
    }
    public function treatmentProduct()
    {
        return $this->hasMany(Product::class, 'products_id', 'id');
    }

    protected static function boot()
    {
        parent::boot();
        //product_images
        //inventories
        //outbound_invoice_details
        static::deleting(function ($product) {
            OutboundInvoiceDetail::where('product_id', $product->id)->update(['product_id' => null]);
        });
        static::softDeleted(function ($product) {
            OutboundInvoiceDetail::where('product_id', $product->id)->update(['product_id' => null]);
        });
        //inbound_invoice_details
        static::deleting(function ($product) {
            InboundInvoiceDetail::where('product_id', $product->id)->update(['product_id' => null]);
        });
        static::softDeleted(function ($product) {
            InboundInvoiceDetail::where('product_id', $product->id)->update(['product_id' => null]);
        });
        //payment_products
        static::deleting(function ($product) {
            PaymentProducts::where('product_id', $product->id)->update(['product_id' => null]);
        });
        static::softDeleted(function ($product) {
            PaymentProducts::where('product_id', $product->id)->update(['product_id' => null]);
        });
        //product_services
        static::deleting(function ($product) {
            ProductService::where('product_id', $product->id)->update(['product_id' => null]);
        });
        static::softDeleted(function ($product) {
            ProductService::where('product_id', $product->id)->update(['product_id' => null]);
        });
    }


}
