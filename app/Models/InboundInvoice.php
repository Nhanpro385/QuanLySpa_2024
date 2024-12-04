<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Kra8\Snowflake\HasSnowflakePrimary;


class InboundInvoice extends Model
{
    use HasFactory,HasSnowflakePrimary;
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
        'status',
        'created_by',
        'updated_by',
        
    ];
    protected $casts = [
        'id' => 'string',
        'staff_id' => 'string',
        'supplier_id' => 'string',
        'created_by' => 'string',
        'updated_by' => 'string',
    ];
    protected static function boot()
    {
        parent::boot();
    
        static::creating(function ($model) {
            if (is_null($model->status)) {
                $model->status = true;
            }
        });
        static::deleting(function ($model) {
            // Khi xóa (soft delete) `InboundInvoice`, cập nhật các bản ghi liên quan
            $model->details()->update(['inbound_invoice_id' => null]);

            if ($model->forceDeleting) {
                // Nếu thực hiện hard delete, thực hiện hành động bổ sung nếu cần
                $model->details()->delete();
            }
        });
    }
    public function staff()
{
    return $this->belongsTo(User::class, 'staff_id', 'id');
}

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
    public function supplier()
    {
        return $this->belongsTo(Supplier::class, 'supplier_id', 'id'); // Đúng cột
    }
    
    
    public function details()
    {
        return $this->hasMany(InboundInvoiceDetail::class, 'inbound_invoice_id', 'id');
    }
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by','id');
    }    
// Nếu dùng Attribute
public function getInvoiceDetailsAttribute()
{
    return $this->details->map(function ($detail) {
        return [
            'id' => (string) $detail->id,
            'product' => $detail->product ? [
                'id' => (string) $detail->product->id,
                'name' => $detail->product->name,
                'sku' => $detail->product->bar_code,
            ] : null,
            'quantity_olded' => $detail->quantity_olded,
            'quantity_import' => $detail->quantity_import,
            'cost_import' => $detail->cost_import,
            'cost_olded' => $detail->cost_olded,
            'unit_price' => $detail->unit_price,
        ];
    });
}


    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    
}
