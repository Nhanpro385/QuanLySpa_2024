<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Kra8\Snowflake\HasSnowflakePrimary;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasSnowflakePrimary, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $table = 'users';
     protected $fillable = [
        'id',
        'position_id',
        'name',
        'password',
        'role',
        'full_name',
        'gender',
        'phone',
        'email',
        'address',
        'date_of_birth',
        'note',
        'status',
        'created_by'
    ];

    protected $attributes = [
        'status' => true,
        'gender' => 'female',
        'role' => 'staff'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function position()
    {
        return $this->belongsTo(Position::class, 'position_id', 'id');
    }

    public function consulation()
    {
        return $this->hasMany(User::class, 'user_id', 'id');
    }

    public function staffShifts()
    {
        return $this->hasMany(User::class, 'user_id', 'id');
    }
    public function appointmentStaff()
    {
        return $this->hasMany(User::class, 'user_id', 'id');
    }

    public function treatmentHistory()
    {
        return $this->hasMany(User::class, 'user_id', 'id');
    }
    public function notification()
    {
        return $this->hasMany(User::class, 'user_id', 'id');
    }
    public function inboundInvoice()
    {
        return $this->hasMany(User::class, 'user_id', 'id');
    }
}
