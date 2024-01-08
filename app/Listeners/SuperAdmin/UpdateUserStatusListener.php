<?php

namespace App\Listeners\SuperAdmin;

use App\Events\SuperAdmin\UserStatusUpdated;
use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class UpdateUserStatusListener
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
    public function handle(UserStatusUpdated $event): void
    {
        User::where('email', $event->userEmail)->update(['status' => $event->status]);
    }
}
