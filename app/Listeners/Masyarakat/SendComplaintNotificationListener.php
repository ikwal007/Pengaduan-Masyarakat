<?php

namespace App\Listeners\Masyarakat;

use App\Events\ComplaintRegister;
use App\Events\Masyarakat\ComplaintRegister as MasyarakatComplaintRegister;
use App\Models\Notification;
use App\Queries\NotificationQuery;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendComplaintNotificationListener
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(MasyarakatComplaintRegister $event): void
    {

        Notification::where('user_email', $event->email)->get();
    }
}
