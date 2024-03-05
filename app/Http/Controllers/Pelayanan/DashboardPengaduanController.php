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
        $allCountComplaint = $complaint->getAllCountComplaint();
        $allCountComplaintByStatusProsessing = $complaint->getAllCountComplaintByStatus('diproses');
        $allCountComplaintByStatusDone = $complaint->getAllCountComplaintByStatus('diselesaikan');
        $allCountComplaintByStatusReject = $complaint->getAllCountComplaintByStatus('ditolak');
        $allCountComplaintByStatusPending = $complaint->getAllCountComplaintByStatus('ditunda');
        $paginationComplaint = $complaint->complaintWithPagination();
        return Inertia::render('Pelayanan/DashboardPengaduan/Index', [
            'countComplaint' => $allCountComplaint,
            'countComplaintByStatusProsessing' => $allCountComplaintByStatusProsessing,
            'countComplaintByStatusDone' => $allCountComplaintByStatusDone,
            'countComplaintByStatusReject' => $allCountComplaintByStatusReject,
            'countComplaintByStatusPending' => $allCountComplaintByStatusPending,
            'paginationComplaint' => $paginationComplaint
        ]);
    }
}
