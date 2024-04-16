<?php

namespace App\Queries;

use App\Models\Notification;
use Illuminate\Support\Facades\DB;

class NotificationQuery extends Notification
{
    public function getAllNotification($email)
    {
        $result = DB::table('notifications')
            ->join('users', 'notifications.user_email', '=', 'users.email')
            ->where('users.email', $email)
            ->select('notifications.id', DB::raw('JSON_OBJECT("id", users.id, "full_name", users.full_name, "email", users.email) as user'), 'notifications.title', 'notifications.content', 'notifications.read')
            ->orderBy('notifications.created_at', 'desc')
            ->get();

        // Konversi properti 'user' menjadi objek
        $result = $result->map(function ($notification) {
            $notification->user = json_decode($notification->user);
            return $notification;
        });

        //query di bawah ini tidak dapat digunakan jika kita membutuhkan realtime notification karena menggunakan eager loading
        // untuk sementara menggunakan query di atas

        // $result = $this->where('user_email', $email)->latest()->get();
        // $result->load('user');
        return $result;
    }
}
