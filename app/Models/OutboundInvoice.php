<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class OutboundInvoice extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $keyType = 'string';
    public $incrementing = false;

    protected $table = 'outbound_invoices';

    protected $fillable = [
        'id',
        'staff_id',
        'note',
        'outbound_invoice_type',
        'total_amount',
        'status'
    ];
    protected $attribute = [
        'status' => true
    ];
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
    public function outboundInvoiceDetail()
    {
        return $this->hasMany(OutboundInvoice::class, 'outbound_invoices_id', 'id');
    }


}
