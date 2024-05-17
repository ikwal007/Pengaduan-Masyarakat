<?php

namespace App\Http\Controllers\General;

use App\Events\Masyarakat\ComplaintRegister;
use App\Http\Controllers\Controller;
use App\Models\Notification;
use App\Queries\NotificationQuery;
use Illuminate\Http\Request;

class GetNotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request->input('email')) {
            $notificationQuery = new NotificationQuery();
            $result = $notificationQuery->getAllNotification($request->input('email'));
            return response()->json($result);
        }
        return response()->json([]);
    }

    /**
     * Display a listing of the resource.
     */
    public function update($id, $email)
    {
        if ($id) {
            $notification = Notification::find($id);
            $notification->read = 1;
            $notification->save();

            $notificationQuery = new NotificationQuery();
            $result = $notificationQuery->getAllNotification($email);

            event(new ComplaintRegister(
                $email,
                $result
            ));
            return response()->json(['message' => 'success', 'data' => $result]);
        }
        return response()->json([]);
    }
    
    public function destroy($id)
    {
        if ($id) {
            $notification = Notification::find($id);
            $notification->delete();
            return response()->json(['message' => 'success', 'status' => 200]);
        }
        return response()->json(["message" => "failed", "status" => 404]);
    }
}
