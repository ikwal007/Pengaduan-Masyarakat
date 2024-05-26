<?php

namespace App\Http\Controllers\Masyarakat;

use App\Http\Controllers\Controller;
use App\Queries\ComplaintQuery;
use Illuminate\Http\Request;

class FilterByDateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $email = $request->query("email");
        $dateFilter = $request->query("dateFilter");
        $statusFilter = $request->query("statusFilter");

        if (isset($dateFilter['day'], $dateFilter['month'], $dateFilter['year'])) {
            $day = str_pad($dateFilter["day"], 2, "0", STR_PAD_LEFT);
            $month = str_pad($dateFilter["month"], 2, "0", STR_PAD_LEFT);
            $year = $dateFilter["year"];
            $newDate = "$year-$month-$day";
        } else {
            return response()->json(["message" => "Invalid date filter", "status" => 400], 400);
        }

        $complaint = new ComplaintQuery();
        $res = $complaint->complaintWithPaginationOnSpecificUser($email, $newDate, $statusFilter);
        $res->appends(['email' => $email, 'dateFilter' => $dateFilter, 'statusFilter' => $statusFilter]);
        return response()->json(["message" => "success", "status" => 200, "data" => $res]);
    }
}
