<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class BrowseConsulation extends Mailable
{
    use Queueable, SerializesModels;

    public $url;
    public $full_name;
    /**
     * Create a new message instance.
     */

    public function __construct(string $url, string $full_name)
    {
        $this->url = $url;
        $this->full_name = $full_name;
    }
    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'THÔNG BÁO KHÁCH HÀNG YÊU CẦU TƯ VẤN TRỰC TUYẾN NGAY.',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'mail.consulations.browse',
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
