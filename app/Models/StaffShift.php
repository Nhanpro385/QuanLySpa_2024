<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StaffShift extends Model
{
    use HasFactory;

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
   
}
