<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Appointment;
use Illuminate\Support\Facades\Http;
use Carbon\Carbon;
use App\Notifications\AppointmentReminder;

class SendAppointmentReminders extends Command
{

    protected $signature = 'send:appointment-reminders';
    protected $description = 'Gửi email nhắc nhở lịch hẹn cho khách hàng';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {

        info("Thực hiện gửi mail: " . Carbon::now()->format('Y-m-d H:i:00'));

        $appointments = Appointment::where('start_time', '=', Carbon::now()->addMinutes(30)->format('H:i:00'))->where('appointment_date', '=', Carbon::now()->format('Y-m-d'))->where('status', '=', 1)->get();

        info($appointments);
        foreach ($appointments as $appointment) {
            info("Mail khách hàng:" . $appointment->customer->email);
            info(Carbon::now()->subMinutes(30)->format('Y-m-d H:i:00') <= '24:00:00');
            $appointment->customer->notify(new AppointmentReminder($appointment, $appointment->customer->id));
        }
    }
}

