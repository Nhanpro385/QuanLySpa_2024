<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Kra8\Snowflake\HasSnowflakePrimary;

    class OutboundInvoice extends Model
    {
        use HasFactory, SoftDeletes, HasSnowflakePrimary;

        protected $keyType = 'string';
        public $incrementing = false;

        protected $table = 'outbound_invoices';

        protected $fillable = [
            'id',
            'staff_id',
      
            'note',
            'outbound_invoice_type',
            'total_amount',
            'status',
            'created_by',
            'updated_by'
        ];

        protected $casts = [
            'status' => 'boolean',
            'total_amount' => 'decimal:2'
        ];

        protected $attributes = [
            'status' => true
        ];

        /**
         * Quan hệ tới nhân viên thực hiện hóa đơn.
         */
        public function staff()
        {
            return $this->belongsTo(User::class, 'staff_id');
        }

        /**
         * Quan hệ tới khách hàng (nếu có).
         */
        // public function customer()
        // {
        //     return $this->belongsTo(Customer::class, 'customer_id'); // Nếu không có bảng Customer, hãy loại bỏ.
        // }

        /**
         * Quan hệ tới chi tiết hóa đơn.
         */
        public function details()
        {
            return $this->hasMany(OutboundInvoiceDetail::class, 'outbound_invoice_id');
        }

        /**
         * Quan hệ tới người tạo hóa đơn.
         */
        public function createdBy()
        {
            return $this->belongsTo(User::class, 'created_by');
        }

        /**
         * Quan hệ tới người cập nhật hóa đơn.
         */
        public function updatedBy()
        {
            return $this->belongsTo(User::class, 'updated_by');
        }
        public function getInvoiceDetailsAttribute()
{
    return $this->details->map(function ($detail) {
        return [
            'id' => (string) $detail->id,
            'product' => $detail->product ? [
                'id' => (string) $detail->product->id,
                'name' => $detail->product->name,
                'bar_code' => $detail->product->bar_code,
            ] : null,
            'quantity_export' => $detail->quantity_export,
            'quantity_olded' => $detail->quantity_olded,
            'unit_price' => $detail->unit_price,
        ];
    });
}


        /**
         * Scope để lấy dữ liệu mới nhất.
         */
        public function scopeLatestFirst($query)
        {
            return $query->orderBy('created_at', 'desc');
        }
        protected static function boot()
        {
            parent::boot();
    
            static::deleting(function ($model) {
                // Khi soft delete, cập nhật các bản ghi chi tiết
                $model->details()->update(['outbound_invoice_id' => null]);
    
                if ($model->forceDeleting) {
                    // Nếu là hard delete, thực hiện thêm hành động nếu cần
                    $model->details()->delete();
                }
            });
        }
    }
