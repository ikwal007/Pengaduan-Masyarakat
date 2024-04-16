<?php

namespace App\Events\Masyarakat;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ComplaintRegister implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $email;
    public $notification;

    /**
     * Create a new event instance.
     */
    public function __construct($email, $notification)
    {
        $this->email = $email;
        $this->notification = $notification;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            'notification-to-masyarakat',
        ];
    }

    public function broadcastAs()
    {
        return 'ComplaintRegister';
    }
}
