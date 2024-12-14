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

    protected static function boot()
    {
        parent::boot();
        //Users
        static::deleting(function ($user) {
            User::where('created_by', $user->id)->update(['created_by' => null]);
        });
        static::softDeleted(function ($user) {
            User::where('created_by', $user->id)->update(['created_by' => null]);
        });
        static::deleting(function ($user) {
            User::where('updated_by', $user->id)->update(['updated_by' => null]);
        });
        static::softDeleted(function ($user) {
            User::where('updated_by', $user->id)->update(['updated_by' => null]);
        });
        //Appointmets
        static::deleting(function ($user) {
            Appointment::where('created_by', $user->id)->update(['created_by' => null]);
        });
        static::softDeleted(function ($user) {
            Appointment::where('created_by', $user->id)->update(['created_by' => null]);
        });
        static::deleting(function ($user) {
            Appointment::where('updated_by', $user->id)->update(['updated_by' => null]);
        });
        static::softDeleted(function ($user) {
            Appointment::where('updated_by', $user->id)->update(['updated_by' => null]);
        });
        //appointment_staffs
        static::deleting(function ($user) {
            AppointmentStaff::where('staff_id', $user->id)->update(['staff_id' => null]);
        });
        static::softDeleted(function ($user) {
            AppointmentStaff::where('staff_id', $user->id)->update(['staff_id' => null]);
        });
        //Categories
        static::deleting(function ($user) {
            Category::where('created_by', $user->id)->update(['created_by' => null]);
        });
        static::softDeleted(function ($user) {
            Category::where('created_by', $user->id)->update(['created_by' => null]);
        });
        static::deleting(function ($user) {
            Category::where('updated_by', $user->id)->update(['updated_by' => null]);
        });
        static::softDeleted(function ($user) {
            Category::where('updated_by', $user->id)->update(['updated_by' => null]);
        });
        //Comments
        static::deleting(function ($user) {
            Comment::where('created_by', $user->id)->update(['created_by' => null]);
        });
        static::softDeleted(function ($user) {
            Comment::where('created_by', $user->id)->update(['created_by' => null]);
        });
        static::deleting(function ($user) {
            Comment::where('updated_by', $user->id)->update(['updated_by' => null]);
        });
        static::softDeleted(function ($user) {
            Comment::where('updated_by', $user->id)->update(['updated_by' => null]);
        });
        //Comment_images
        static::deleting(function ($user) {
            CommentImage::where('created_by', $user->id)->update(['created_by' => null]);
        });
        static::softDeleted(function ($user) {
            CommentImage::where('created_by', $user->id)->update(['created_by' => null]);
        });
        static::deleting(function ($user) {
            CommentImage::where('updated_by', $user->id)->update(['updated_by' => null]);
        });
        static::softDeleted(function ($user) {
            CommentImage::where('updated_by', $user->id)->update(['updated_by' => null]);
        });
        //Consulations
        static::deleting(function ($user) {
            Consulation::where('created_by', $user->id)->update(['created_by' => null]);
        });
        static::softDeleted(function ($user) {
            Consulation::where('created_by', $user->id)->update(['created_by' => null]);
        });
        static::deleting(function ($user) {
            Consulation::where('updated_by', $user->id)->update(['updated_by' => null]);
        });
        static::softDeleted(function ($user) {
            Consulation::where('updated_by', $user->id)->update(['updated_by' => null]);
        });
        static::deleting(function ($user) {
            Consulation::where('staff_id', $user->id)->update(['staff_id' => null]);
        });
        static::softDeleted(function ($user) {
            Consulation::where('staff_id', $user->id)->update(['staff_id' => null]);
        });
        //Customers
        static::deleting(function ($user) {
            Customer::where('created_by', $user->id)->update(['created_by' => null]);
        });
        static::softDeleted(function ($user) {
            Customer::where('created_by', $user->id)->update(['created_by' => null]);
        });
        static::deleting(function ($user) {
            Customer::where('updated_by', $user->id)->update(['updated_by' => null]);
        });
        static::softDeleted(function ($user) {
            Customer::where('updated_by', $user->id)->update(['updated_by' => null]);
        });
        //inbound_invoices
        static::deleting(function ($user) {
            InboundInvoice::where('created_by', $user->id)->update(['created_by' => null]);
        });
        static::softDeleted(function ($user) {
            InboundInvoice::where('created_by', $user->id)->update(['created_by' => null]);
        });
        static::deleting(function ($user) {
            InboundInvoice::where('updated_by', $user->id)->update(['updated_by' => null]);
        });
        static::softDeleted(function ($user) {
            InboundInvoice::where('updated_by', $user->id)->update(['updated_by' => null]);
        });
        static::deleting(function ($user) {
            InboundInvoice::where('staff_id', $user->id)->update(['staff_id' => null]);
        });
        static::softDeleted(function ($user) {
            InboundInvoice::where('staff_id', $user->id)->update(['staff_id' => null]);
        });
        //inbound_invoice_details
        static::deleting(function ($user) {
            InboundInvoiceDetail::where('created_by', $user->id)->update(['created_by' => null]);
        });
        static::softDeleted(function ($user) {
            InboundInvoiceDetail::where('created_by', $user->id)->update(['created_by' => null]);
        });
        static::deleting(function ($user) {
            InboundInvoiceDetail::where('updated_by', $user->id)->update(['updated_by' => null]);
        });
        static::softDeleted(function ($user) {
            InboundInvoiceDetail::where('updated_by', $user->id)->update(['updated_by' => null]);
        });
        //inventories
        static::deleting(function ($user) {
            Inventory::where('created_by', $user->id)->update(['created_by' => null]);
        });
        static::softDeleted(function ($user) {
            Inventory::where('created_by', $user->id)->update(['created_by' => null]);
        });
        static::deleting(function ($user) {
            Inventory::where('updated_by', $user->id)->update(['updated_by' => null]);
        });
        static::softDeleted(function ($user) {
            Inventory::where('updated_by', $user->id)->update(['updated_by' => null]);
        });
        //outbound_invoices
        static::deleting(function ($user) {
            OutboundInvoice::where('created_by', $user->id)->update(['created_by' => null]);
        });
        static::softDeleted(function ($user) {
            OutboundInvoice::where('created_by', $user->id)->update(['created_by' => null]);
        });
        static::deleting(function ($user) {
            OutboundInvoice::where('updated_by', $user->id)->update(['updated_by' => null]);
        });
        static::softDeleted(function ($user) {
            OutboundInvoice::where('updated_by', $user->id)->update(['updated_by' => null]);
        });
        static::deleting(function ($user) {
            OutboundInvoice::where('staff_id', $user->id)->update(['staff_id' => null]);
        });
        static::softDeleted(function ($user) {
            OutboundInvoice::where('staff_id', $user->id)->update(['staff_id' => null]);
        });
        //outbound_invoice_details
        static::deleting(function ($user) {
            OutboundInvoiceDetail::where('created_by', $user->id)->update(['created_by' => null]);
        });
        static::softDeleted(function ($user) {
            OutboundInvoiceDetail::where('created_by', $user->id)->update(['created_by' => null]);
        });
        static::deleting(function ($user) {
            OutboundInvoiceDetail::where('updated_by', $user->id)->update(['updated_by' => null]);
        });
        static::softDeleted(function ($user) {
            OutboundInvoiceDetail::where('updated_by', $user->id)->update(['updated_by' => null]);
        });
        //payments
        static::deleting(function ($user) {
            Payment::where('created_by', $user->id)->update(['created_by' => null]);
        });
        static::softDeleted(function ($user) {
            Payment::where('created_by', $user->id)->update(['created_by' => null]);
        });
        //products
        static::deleting(function ($user) {
            Product::where('created_by', $user->id)->update(['created_by' => null]);
        });
        static::softDeleted(function ($user) {
            Product::where('created_by', $user->id)->update(['created_by' => null]);
        });
        static::deleting(function ($user) {
            Product::where('updated_by', $user->id)->update(['updated_by' => null]);
        });
        static::softDeleted(function ($user) {
            Product::where('updated_by', $user->id)->update(['updated_by' => null]);
        });
        //product_images
        static::deleting(function ($user) {
            ProductImage::where('created_by', $user->id)->update(['created_by' => null]);
        });
        static::softDeleted(function ($user) {
            ProductImage::where('created_by', $user->id)->update(['created_by' => null]);
        });
        static::deleting(function ($user) {
            ProductImage::where('updated_by', $user->id)->update(['updated_by' => null]);
        });
        static::softDeleted(function ($user) {
            ProductImage::where('updated_by', $user->id)->update(['updated_by' => null]);
        });
        //promotions
        static::deleting(function ($user) {
            Promotion::where('created_by', $user->id)->update(['created_by' => null]);
        });
        static::softDeleted(function ($user) {
            Promotion::where('created_by', $user->id)->update(['created_by' => null]);
        });
        static::deleting(function ($user) {
            Promotion::where('updated_by', $user->id)->update(['updated_by' => null]);
        });
        static::softDeleted(function ($user) {
            Promotion::where('updated_by', $user->id)->update(['updated_by' => null]);
        });
        //services
        static::deleting(function ($user) {
            Service::where('created_by', $user->id)->update(['created_by' => null]);
        });
        static::softDeleted(function ($user) {
            Service::where('created_by', $user->id)->update(['created_by' => null]);
        });
        static::deleting(function ($user) {
            Service::where('updated_by', $user->id)->update(['updated_by' => null]);
        });
        static::softDeleted(function ($user) {
            Service::where('updated_by', $user->id)->update(['updated_by' => null]);
        });
        //service_categories
        static::deleting(function ($user) {
            ServiceCategory::where('created_by', $user->id)->update(['created_by' => null]);
        });
        static::softDeleted(function ($user) {
            ServiceCategory::where('created_by', $user->id)->update(['created_by' => null]);
        });
        static::deleting(function ($user) {
            ServiceCategory::where('updated_by', $user->id)->update(['updated_by' => null]);
        });
        static::softDeleted(function ($user) {
            ServiceCategory::where('updated_by', $user->id)->update(['updated_by' => null]);
        });
        //service_images
        static::deleting(function ($user) {
            ServiceImage::where('created_by', $user->id)->update(['created_by' => null]);
        });
        static::softDeleted(function ($user) {
            ServiceImage::where('created_by', $user->id)->update(['created_by' => null]);
        });
        static::deleting(function ($user) {
            ServiceImage::where('updated_by', $user->id)->update(['updated_by' => null]);
        });
        static::softDeleted(function ($user) {
            ServiceImage::where('updated_by', $user->id)->update(['updated_by' => null]);
        });
        //shifts
        static::deleting(function ($user) {
            Shift::where('created_by', $user->id)->update(['created_by' => null]);
        });
        static::softDeleted(function ($user) {
            Shift::where('created_by', $user->id)->update(['created_by' => null]);
        });
        static::deleting(function ($user) {
            Shift::where('updated_by', $user->id)->update(['updated_by' => null]);
        });
        static::softDeleted(function ($user) {
            Shift::where('updated_by', $user->id)->update(['updated_by' => null]);
        });
        //staff_shifts
        static::deleting(function ($user) {
            StaffShift::where('staff_id', $user->id)->update(['staff_id' => null]);
        });
        static::softDeleted(function ($user) {
            StaffShift::where('staff_id', $user->id)->update(['staff_id' => null]);
        });
        //suppliers
        static::deleting(function ($user) {
            Supplier::where('created_by', $user->id)->update(['created_by' => null]);
        });
        static::softDeleted(function ($user) {
            Supplier::where('created_by', $user->id)->update(['created_by' => null]);
        });
        static::deleting(function ($user) {
            Supplier::where('updated_by', $user->id)->update(['updated_by' => null]);
        });
        static::softDeleted(function ($user) {
            Supplier::where('updated_by', $user->id)->update(['updated_by' => null]);
        });
        //treatment_histories
        static::deleting(function ($user) {
            TreatmentHistory::where('created_by', $user->id)->update(['created_by' => null]);
        });
        static::softDeleted(function ($user) {
            TreatmentHistory::where('created_by', $user->id)->update(['created_by' => null]);
        });
        static::deleting(function ($user) {
            TreatmentHistory::where('updated_by', $user->id)->update(['updated_by' => null]);
        });
        static::softDeleted(function ($user) {
            TreatmentHistory::where('updated_by', $user->id)->update(['updated_by' => null]);
        });
        static::deleting(function ($user) {
            TreatmentHistory::where('staff_id', $user->id)->update(['staff_id' => null]);
        });
        static::softDeleted(function ($user) {
            TreatmentHistory::where('staff_id', $user->id)->update(['staff_id' => null]);
        });
    }

    public function payments($day)
    {
        return $this->hasMany(Payment::class, 'created_by', 'id')->whereDate('created_at', $day)->sum('total_amount');
    }
    public function payment_type_cash($day)
    {
        return $this->hasMany(Payment::class, 'created_by', 'id')->whereDate('created_at', $day)->where('payment_type', 0)->sum('total_amount');
    }
    public function payment_type_transfer($day)
    {
        return $this->hasMany(Payment::class, 'created_by', 'id')->whereDate('created_at', $day)->where('payment_type', 1)->sum('total_amount');
    }
}
