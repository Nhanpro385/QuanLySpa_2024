<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Kra8\Snowflake\HasSnowflakePrimary;

class StaffShift extends Model
{
    use HasFactory,HasSnowflakePrimary;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $table = 'staff_shifts';
    protected $fillable = [
        'id',
        'staff_id',
        'shift_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'staff_id', 'id');
    }

    public function shift()
    {
        return $this->belongsTo(Shift::class, 'shift_id', 'id');
    }

    public function staff()
    {
        return $this->belongsTo(User::class, 'staff_id', 'id');
    }
         // fix id trả về qua js bị 00
    protected $casts = [
        'id' => 'string',
        'staff_id' => 'string',
        'shift_id' => 'string',
        'created_by' => 'string',
        'updated_by' => 'string',
    ];
    
}
