<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Kra8\Snowflake\HasSnowflakePrimary;

class Shift extends Model
{
    use HasFactory, HasSnowflakePrimary, SoftDeletes;

    protected $keyType = 'string';
    public $incrementing = false;
         // fix id trả về qua js bị 00
    protected $casts = [
        'id' => 'string',
        'created_by' => 'string',
        'updated_by' => 'string',
    ];
    

    protected $fillable = [
        'id', 'start_time', 'end_time', 'shift_date', 'max_customers', 'note', 'status', 'created_by', 'updated_by',
    ];

    protected $attributes = [
       
        'status' => true
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (auth()->check()) {
                $model->created_by = auth()->id();
                $model->created_at = now();
            }
        });

        static::updating(function ($model) {
            if (auth()->check()) {
                $model->updated_by = auth()->id();
                $model->updated_at = now();
            }
        });
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by', 'id');
    }


    public function staffShifts()
    {
        return $this->belongsToMany(User::class, 'staff_shifts', 'shift_id', 'staff_id')
                    ->withTimestamps(); // Nếu bạn muốn quản lý `created_at` và `updated_at` trên bảng trung gian
    }

    // Hiển thị danh sách nhân viên trong Shift
    public function getStaffListAttribute()
    {
        return $this->staffShifts()->get(['id', 'full_name','role']);
    }
}
