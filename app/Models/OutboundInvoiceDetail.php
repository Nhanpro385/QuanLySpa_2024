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

}
