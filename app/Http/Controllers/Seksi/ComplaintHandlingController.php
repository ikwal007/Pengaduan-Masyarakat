<?php

namespace App\Http\Controllers\Seksi;

use App\Http\Controllers\Controller;
use App\Models\ComplaintStatus;
use App\Queries\ComplaintHandlingQuery;
use App\Queries\ComplaintQuery;
use App\Queries\ComplaintStatusQuery;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class ComplaintHandlingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $complaint = new ComplaintQuery();
        $allCountComplaint = $complaint->getAllCountComplaintOnSpecificSeksi(auth()->user()->full_name);
        $allCountComplaintByStatusProsessing = $complaint->getAllCountComplaintByStatusOnSpecificSeksi('diproses', auth()->user()->full_name);
        $allCountComplaintByStatusDone = $complaint->getAllCountComplaintByStatusOnSpecificSeksi('diselesaikan', auth()->user()->full_name);
        $allCountComplaintByStatusReject = $complaint->getAllCountComplaintByStatusOnSpecificSeksi('ditolak', auth()->user()->full_name);
        $allCountComplaintByStatusPending = $complaint->getAllCountComplaintByStatusOnSpecificSeksi('ditunda', auth()->user()->full_name);
        $paginationComplaint = $complaint->complaintWithPaginationOnSpecificSeksi(auth()->user()->full_name);
        return inertia('Seksi/DashboardComplaintHandling/Index', [
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
        $complaint = new ComplaintQuery();
        $complaintStatus = new ComplaintStatusQuery();
        return inertia('Seksi/DashboardComplaintHandling/Edit', [
            'detailComplaint' => $complaint->getDetailComplaintOnSeksiWithComplaintHandling($id),
            'allComplaintStatus' => $complaintStatus->getAll()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $complaintHandling = new ComplaintHandlingQuery();
        $complaintHandlingFind = $complaintHandling->getDetailComplaintHandling($id);
        $complaintHandlingFind->status_id = $request->complaintHandlingStatus;
        $complaintHandlingFind->save();

        $complaintHandling = new ComplaintQuery();
        $detailComplaint = $complaintHandling->getDetailComplaintOnSeksiWithComplaintHandling($id);
        $statuses = collect($detailComplaint->complaintHandling)->pluck('complaintStatus')->pluck('slug');

        // Memeriksa apakah ada setidaknya satu 'diproses' dalam array
        if ($statuses->contains('diproses')) {
            $complaintStatus = new ComplaintStatusQuery();
            $detailComplaint->complaint_statuses_id = $complaintStatus->getComplaintStatusBySlug('diproses')->id;
            $detailComplaint->save();
        }

        // Memeriksa apakah semua elemen dalam array adalah 'tunda'
        if ($this->isAllStatus($statuses, 'ditunda')) {
            $complaintStatus = new ComplaintStatusQuery();
            $detailComplaint->complaint_statuses_id = $complaintStatus->getComplaintStatusBySlug('ditunda')->id;
            $detailComplaint->save();
        }

        if ($this->isAllStatus($statuses, 'diselesaikan')) {
            $complaintStatus = new ComplaintStatusQuery();
            $detailComplaint->complaint_statuses_id = $complaintStatus->getComplaintStatusBySlug('diselesaikan')->id;
            $detailComplaint->save();
        }

        if ($this->isAllStatus($statuses, 'ditolak')) {
            $complaintStatus = new ComplaintStatusQuery();
            $detailComplaint->complaint_statuses_id = $complaintStatus->getComplaintStatusBySlug('ditolak')->id;
            $detailComplaint->save();
        }

        return redirect()->route('complaint-handling.index')->with('message', 'Perubahan Penanganan Pengaduan Berhasil Disimpan');
    }

    protected function isAllStatus(Collection $statuses, string $targetStatus): bool
    {
        return $statuses->every(function ($status) use ($targetStatus) {
            return $status === $targetStatus;
        });
    }
}
