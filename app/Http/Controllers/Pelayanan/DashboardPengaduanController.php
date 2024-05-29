<?php

namespace App\Http\Controllers\Pelayanan;

use App\Http\Controllers\Controller;
use App\Queries\ComplaintQuery;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardPengaduanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $complaint = new ComplaintQuery();
        $allCountComplaint = $complaint->getAllCountComplaintOnConditionConfirm(1);
        $allCountComplaintByStatusProsessing = $complaint->getAllCountComplaintByStatusAndConditionConfirm('diproses', 1);
        $allCountComplaintByStatusDone = $complaint->getAllCountComplaintByStatusAndConditionConfirm('diselesaikan', 1);
        $allCountComplaintByStatusReject = $complaint->getAllCountComplaintByStatusAndConditionConfirm('ditolak', 1);
        $allCountComplaintByStatusPending = $complaint->getAllCountComplaintByStatusAndConditionConfirm('ditunda', 1);
        $paginationComplaint = $complaint->complaintWithPaginationBasedConfirmed(1);
        return inertia('Pelayanan/DashboardPengaduan/Index', [
            'countComplaint' => $allCountComplaint,
            'countComplaintByStatusProsessing' => $allCountComplaintByStatusProsessing,
            'countComplaintByStatusDone' => $allCountComplaintByStatusDone,
            'countComplaintByStatusReject' => $allCountComplaintByStatusReject,
            'countComplaintByStatusPending' => $allCountComplaintByStatusPending,
            'paginationComplaint' => $paginationComplaint
        ]);
    }

    /**
     * Display the specified resource.
     * 
     * @param  string  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $complaint = new ComplaintQuery();
        
        return inertia('Pelayanan/DashboardPengaduan/Show', [
            'detailComplaint' => fn () => $complaint->getDetailComplaint($id)
        ]);
    }
}
