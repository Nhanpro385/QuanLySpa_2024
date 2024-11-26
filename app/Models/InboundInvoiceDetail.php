<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Kra8\Snowflake\HasSnowflakePrimary;


class InboundInvoiceDetail extends Model
{
    use HasFactory,HasSnowflakePrimary;
    use SoftDeletes;
    protected $keyType = 'string';
    public $incrementing = false;

    protected $table = 'inbound_invoice_details';

    protected $fillable = [
        'id',
        'product_id',
        'inbound_invoice_id',
        'quantity_olded',
        'quantity_import',
        'cost_import',
        'cost_olded',
        'unit_price',
        'created_by',
        'updated_by',
    ];
    public function product()
    {
        return $this->belongsTo(Product::class, 'products_id', 'id');
    }
    public function inboundInvoice()
    {
        return $this->belongsTo(InboundInvoice::class, 'inbound_invoice_id', 'id');
    }
}    
