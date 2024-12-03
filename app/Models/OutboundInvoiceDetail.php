<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use Kra8\Snowflake\HasSnowflakePrimary;
class OutboundInvoiceDetail extends Model
{
    use HasFactory, SoftDeletes, HasSnowflakePrimary;
    protected $keyType = 'string';
    public $incrementing = false;

    protected $table = 'outbound_invoice_details';

    protected $fillable = [
        'id',
        'product_id',
        'outbound_invoice_id',
        'quantity_export',
        'quantity_olded',
        'unit_price',
        'created_by',
        'updated_by'
    ];

    protected $casts = [
        'unit_price' => 'decimal:2'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }

    public function outboundInvoice()
    {
        return $this->belongsTo(OutboundInvoice::class, 'outbound_invoice_id', 'id');
    }
}
