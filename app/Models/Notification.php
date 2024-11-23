<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Kra8\Snowflake\HasSnowflakePrimary;

class Notification extends Model
{
    use HasFactory, HasSnowflakePrimary;

    use SoftDeletes;
    protected $keyType = 'string';
    public $incrementing = false;

    protected $table = 'notifications';

    protected $fillable = [
        'id',
        'type',
        'notifiable_id',
        'notifiable_type',
        'data',
        'read_at',
    ];

    protected $casts = [
        'id' => 'string',
        'notifiable_id' => 'string',
    ];


    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
