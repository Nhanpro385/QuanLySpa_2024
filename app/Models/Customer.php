<?php

namespace App\Models;

use App\Notifications\ResetPasswordNotification;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Kra8\Snowflake\HasSnowflakePrimary;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use App\Models\Consultation;
use Illuminate\Database\Eloquent\SoftDeletes;
class Customer extends Authenticatable implements JWTSubject, MustVerifyEmail
{
    use HasFactory, HasSnowflakePrimary, Notifiable;
    use SoftDeletes;

    protected $keyType = 'string';
    protected $table = 'customers';
    public $incrementing = false;

    protected $fillable = [
        'id',
        'full_name',
        'password',
        'email',
        'gender',
        'phone',
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
    ];

    protected static function boot()
    {
        parent::boot();


        static::creating(function ($customer) {
            if (isset($customer->password)) {
                $customer->password = Hash::make($customer->password);
            }
        });


        //appointment

        static::deleting(function ($appointment) {
            Appointment::where('customer_id', $appointment->id)->update(['customer_id' => null]);
        });

        static::softDeleted(function ($appointment) {

            Appointment::where('customer_id', $appointment->id)->update(['customer_id' => null]);
        });

        //Consulation

        static::deleting(function ($consulation) {
            Consulation::where('customer_id', $consulation->id)->update(['customer_id' => null]);
        });

        static::softDeleted(function ($consulation) {

            Consulation::where('customer_id', $consulation->id)->update(['customer_id' => null]);
        });

        //Comment

        static::deleting(function ($comment) {
            Comment::where('customer_id', $comment->id)->update(['customer_id' => null]);
        });

        static::softDeleted(function ($comment) {

            Comment::where('customer_id', $comment->id)->update(['customer_id' => null]);

        });
        //treatmentHistory
        static::deleting(function ($treatmentHistory) {
            TreatmentHistory::where('customer_id', $treatmentHistory->id)->update(['customer_id' => null]);
        });

        static::softDeleted(function ($treatmentHistory) {

            TreatmentHistory::where('customer_id', $treatmentHistory->id)->update(['customer_id' => null]);

        });


    }



    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }


    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function consultations()
    {
        return $this->hasMany(Consulation::class, 'customer_id', 'id');
    }



    public function appointments()
    {
        return $this->hasMany(Appointment::class, 'customer_id', 'id');
    }


    public function treatmentHistories()
    {
        return $this->hasMany(TreatmentHistory::class, 'customer_id', 'id');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class, 'customer_id');
    }

    protected $hidden = [
        'password',
        'remember_token',
    ];



    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        // fix id trả về qua js bị 00
        'id' => 'string',
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
        $url = env('FRONTEND_URL') . '/matkhaumoi?token=' . $token;
        $this->notify(new ResetPasswordNotification($url));
    }
    public function clientComments()
    {
        return $this->hasMany(Comment::class, 'customer_id')->where('status', 1);
    }




}
