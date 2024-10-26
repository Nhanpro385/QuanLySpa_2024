<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Kra8\Snowflake\HasSnowflakePrimary;

class ServiceCategory extends Model
{
    use HasFactory, Notifiable;
    use HasFactory, HasSnowflakePrimary;

    use SoftDeletes;
    protected $keyType = 'string';
    public $incrementing = false;

    protected $table = 'service_categories';

    protected $fillable = [
        'id',
        'name',
        'description',
        'status',
        'parent_id',
        'created_by',
        'updated_by',

    ];

    protected $attributes = [
        'status' => true,

    ];
    public function servicess()
    {
        return $this->hasMany(Service::class, 'service_category_id', 'id');
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }

    public function updatedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by', 'id');
    }

    public function parentId()
    {
        return $this->belongsTo(ServiceCategory::class, 'parent_id', 'id');
    }
    public function childrentIds()
    {
        return $this->hasMany(ServiceCategory::class, 'parent_id', 'id');
    }
}
