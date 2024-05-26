<?php

namespace App\Http\Controllers\Pelayanan;

use App\Http\Controllers\Controller;
use App\Models\Complaint;
use App\Queries\ComplaintQuery;
use Carbon\Carbon;
use Illuminate\Http\Request;

class RefreshLockController extends Controller
{
    public function refreshLock(String $id, string $user)
    {

        $complaint = new Complaint();
        $res = $complaint->where('id', $id)->where('locked_by', $user)->first();

        if (!$res) {
            return response()->json(['status' => 'error', 'message' => 'user gak ada cok'], 404);
        }

        $res->update([
            'locked_at' => Carbon::now(),
        ]);

        return response()->json(['status' => 'success', 'message' => $res]);
    }
}
