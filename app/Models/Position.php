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

    protected $casts = [
        'id' => 'string',
    ];

    public function users(): HasMany
    {
        return $this->hasMany(User::class, 'position_id', 'id');
    }

    protected static function boot()
    {
        parent::boot();
        //users
        static::deleting(function ($position) {
            User::where('position_id', $position->id)->update(['position_id' => null]);
        });
        static::softDeleted(function ($position) {

            User::where('position_id', $position->id)->update(['position_id' => null]);
        });
    }
}
