<?php

namespace App\Http\Controllers\Pelayanan;

use App\Http\Controllers\Controller;
use App\Queries\ComplaintQuery;
use Illuminate\Http\Request;

class ComplaintVerificationDashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $complaint = new ComplaintQuery();
        $allCountComplaint = $complaint->getAllCountComplaintNotConfirmed();
        $allCountComplaintByStatusProsessing = $complaint->getAllCountComplaintByStatus('diproses');
        $allCountComplaintByStatusDone = $complaint->getAllCountComplaintByStatus('diselesaikan');
        $allCountComplaintByStatusReject = $complaint->getAllCountComplaintByStatus('ditolak');
        $allCountComplaintByStatusPending = $complaint->getAllCountComplaintByStatus('ditunda');
        $paginationComplaint = $complaint->complaintWithPaginationBasedConfirmed(0);
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
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
