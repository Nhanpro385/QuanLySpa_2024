<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Notifications\ResetPasswordNotification;
use Carbon\Carbon;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Kra8\Snowflake\HasSnowflakePrimary;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject, MustVerifyEmail
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
        'created_by',
        'updated_by',
    ];

    protected $attributes = [
        'status' => true,
        'gender' => 1,
        'role' => 1
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

    protected $casts = [
        'id' => 'string',
        'position_id' => 'string',
        'created_by' => 'string',
        'updated_by' => 'string',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    public function sendPasswordResetNotification($token)
    {
        $url = env('FRONTEND_URL') . '/admin/matkhaumoi?token=' . $token;
        $this->notify(new ResetPasswordNotification($url));
    }

    public function position()
    {
        return $this->belongsTo(Position::class, 'position_id', 'id');
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }

    public function updatedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by', 'id');
    }

    public function consulation()
    {
        return $this->hasMany(User::class, 'user_id', 'id');
    }

    public function shifts()
    {
        return $this->belongsToMany(Shift::class, 'staff_shifts', 'staff_id', 'shift_id');
    }

    public function shifts_after()
    {
        return $this->belongsToMany(Shift::class, 'staff_shifts', 'staff_id', 'shift_id')->where('shifts.shift_date', '>=', Carbon::now()->format('Y-m-d'))->orderBy('shifts.shift_date', 'desc');
    }

    public function shifts_before()
    {
        return $this->belongsToMany(Shift::class, 'staff_shifts', 'staff_id', 'shift_id')->where('shifts.shift_date', '<=', Carbon::now()->format('Y-m-d'))->orderBy('shifts.shift_date', 'desc');
    }

    public function appointments()
    {
        return $this->belongsToMany(Appointment::class, 'appointment_staffs', 'staff_id', 'appointment_id');
    }

    public function treatmentHistories()
    {
        return $this->hasMany(TreatmentHistory::class, 'staff_id', 'id')->orderBy('treatment_histories.created_at', 'desc');
    }

    public function notification()
    {
        return $this->hasMany(User::class, 'user_id', 'id');
    }
    public function inboundInvoice()
    {
        return $this->hasMany(User::class, 'user_id', 'id');
    }

    public function serviceCategories()
    {
        return $this->hasMany(ServiceCategory::class, 'created_by', 'id');
    }

    public function products()
    {
        return $this->hasMany(Product::class, 'created_by', 'id');
    }

    public function consulations()
    {
        return $this->hasMany(Consulation::class, 'staff_id', 'id');
    }

}
