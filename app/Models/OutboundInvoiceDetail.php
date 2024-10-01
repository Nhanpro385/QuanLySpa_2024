<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class OutboundInvoiceDetail extends Model
{
    use HasFactory;
    use SoftDeletes;
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
    ];
    public function product()
    {
        return $this->belongsTo(Product::class, 'products_id', 'id');
    }
    public function outboundInvoice()
    {
        return $this->belongsTo(OutboundInvoice::class, 'outbound_invoices_id', 'id');
    }

}
