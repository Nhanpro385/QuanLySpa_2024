<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class InboundInvoice extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $keyType = 'string';
    public $incrementing = false;

    protected $table = 'inbound_invoices';

    protected $fillable = [
        'id',
        'staff_id',
        'supplier_id',
        'note',
        'total_amount',
        'status'
    ];
    protected $attribute = [
        'status' => true,
    ];
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
    public function supplier()
    {
        return $this->belongsTo(Supplier::class, 'suppliers_id', 'id');
    }
    
    public function inboundInvoiceDetail()
    {
        return $this->hasMany(InboundInvoice::class, 'inbound_invoices_id', 'id');
    }

}
