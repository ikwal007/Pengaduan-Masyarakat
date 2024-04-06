<?php

namespace App\Listeners\SuperAdmin;

use App\Events\CountUserOnline;
use App\Events\SuperAdmin\CountUserOnline as SuperAdminCountUserOnline;
use App\Queries\UserQuery;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendCountUserOnline
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
    public function handle(SuperAdminCountUserOnline $event): void
    {
        $userQuery = new UserQuery();
        $userQuery->getAllUserOnlineCount();
    }
}
