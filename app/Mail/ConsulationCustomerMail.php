<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ConsulationCustomerMail extends Mailable
{
    use Queueable, SerializesModels;
    public $url;
    public $full_name;

    public $time;
    /**
     * Create a new message instance.
     */
    public function __construct(string $url, string $full_name, $time)
    {
        $this->url = $url;
        $this->full_name = $full_name;
        $this->time = $time;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Kính mời quý khách hàng ' . ' tham gia tư vấn chăm sóc spa trực tuyến.',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'mail.consulations.customer',
            with: [
                'url' => $this->url,
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
