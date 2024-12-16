<?php
namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AppointmentReminder extends Notification
{
    use Queueable;

    protected $appointment;
    protected $customer;

    public function __construct($appointment, $customer)
    {
        $this->appointment = $appointment;
        $this->customer = $customer;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('THÔNG BÁO NHẮC NHỞ LỊCH HẸN CHO KHÁCH HÀNG')
            ->greeting('SPA SAKURA xin thông báo đến quý khách hàng.')
            ->line('Bạn có lịch hẹn vào lúc: ' . $this->appointment->start_time . ' hôm nay.')
            ->line('Rất mong quý khách hàng sẽ có mặt đúng giờ đã hẹn.')
            ->action('Chi tiết', url(env('FRONTEND_URL') . '/thongtincanhan/lichsudichvu'))
            ->line('Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!')
            ->line(' Mọi thắc mắc xin quý khách liên hệ với chúng tôi qua email: sakuraspa2025@gmail.com')
            ->salutation('SPA SAKURA Trân trọng')
        ;
    }

    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
