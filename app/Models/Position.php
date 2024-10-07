<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Kra8\Snowflake\HasSnowflakePrimary;
class Position extends Model
{
    use HasSnowflakePrimary;
    use HasFactory;
    use Notifiable;
    use SoftDeletes;
    protected $keyType = 'string';
    public $incrementing = false;
    protected $table = 'positions';

    protected $fillable = [
        'id',
        'name',
        'wage',
        'note',
    ];

    public function users(): HasMany
    {
        return $this->hasMany(User::class, 'position_id', 'id');
    }

}
