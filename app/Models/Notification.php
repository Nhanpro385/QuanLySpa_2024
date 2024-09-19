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
        'staff_id',
        'notification_type',
        'content',
        'url_notification',
        'pin',
        'staff',
    ];

    protected $attributes = [
        'status' => false,
    ];
}
