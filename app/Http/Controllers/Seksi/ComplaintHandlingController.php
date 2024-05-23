<?php

namespace App\Http\Controllers\Seksi;

use App\Events\Masyarakat\ComplaintRegister;
use App\Http\Controllers\Controller;
use App\Models\Notification;
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
        $complaintHandling = new ComplaintHandlingQuery();
        $allCountComplaint = $complaintHandling->getAllCountComplaintOnSpecificSeksi(auth()->user()->full_name);
        $allCountComplaintByStatusProsessing = $complaintHandling->getAllCountComplaintByStatusOnSpecificSeksi('diproses', auth()->user()->full_name);
        $allCountComplaintByStatusDone = $complaintHandling->getAllCountComplaintByStatusOnSpecificSeksi('diselesaikan', auth()->user()->full_name);
        $allCountComplaintByStatusReject = $complaintHandling->getAllCountComplaintByStatusOnSpecificSeksi('ditolak', auth()->user()->full_name);
        $allCountComplaintByStatusPending = $complaintHandling->getAllCountComplaintByStatusOnSpecificSeksi('ditunda', auth()->user()->full_name);
        $paginationComplaint = $complaintHandling->complaintWithPaginationOnSpecificSeksi(auth()->user()->full_name);
        return inertia('Seksi/DashboardComplaintHandling/Index', [
            'countComplaint' => $allCountComplaint,
            'countComplaintByStatusProsessing' => $allCountComplaintByStatusProsessing,
            'countComplaintByStatusDone' => $allCountComplaintByStatusDone,
            'countComplaintByStatusReject' => $allCountComplaintByStatusReject,
            'countComplaintByStatusPending' => $allCountComplaintByStatusPending,
            'paginationComplaint' => fn () => $paginationComplaint
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
        $complaint = new ComplaintHandlingQuery();
        return inertia('Seksi/DashboardComplaintHandling/Show', [
            "detailComplaintHandling" => fn () => $complaint->getDetailComplaintHandling($id)
        ]);
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

        $complaint = new ComplaintQuery();
        $detailComplaint = $complaint->getDetailComplaintOnSeksiWithComplaintHandling($id);
        $statuses = collect($detailComplaint->complaintHandling)->pluck('complaintStatus')->pluck('slug');

        // Memeriksa apakah ada setidaknya satu 'diproses' dalam array
        if ($statuses->contains('diproses')) {
            $complaintStatus = new ComplaintStatusQuery();
            $detailComplaint->complaint_statuses_id = $complaintStatus->getComplaintStatusBySlug('diproses')->id;
            $detailComplaint->save();

            $notification = new Notification();
            $notification->user_email = $detailComplaint->user_email;
            $notification->title = "Pengaduan Sedang Diperoses Oleh Petugas" . $complaint->certificate_no;
            $notification->content = "Dengan ini dari pihak pemohon untuk dapat menunggu peroses dari pengaduan yang akan ditangani oleh seksi terkait.";
            $notification->save();

            event(new ComplaintRegister(
                $complaint->user_email
            ));
        }

        // Memeriksa apakah semua elemen dalam array adalah 'tunda'
        if ($this->isAllStatus($statuses, 'ditunda')) {
            $complaintStatus = new ComplaintStatusQuery();
            $detailComplaint->complaint_statuses_id = $complaintStatus->getComplaintStatusBySlug('ditunda')->id;
            $detailComplaint->save();

            $notification = new Notification();
            $notification->user_email = $detailComplaint->user_email;
            $notification->title = "Pengaduan Sedang Ditunda Oleh Petugas" . $complaint->certificate_no;
            $notification->content = "Dengan ini dari pihak pemohon untuk dapat menunggu peroses dari pengaduan yang akan ditangani oleh seksi terkait.";
            $notification->save();

            event(new ComplaintRegister(
                $complaint->user_email
            ));
        }

        if ($this->isAllStatus($statuses, 'diselesaikan')) {
            $complaintStatus = new ComplaintStatusQuery();
            $detailComplaint->complaint_statuses_id = $complaintStatus->getComplaintStatusBySlug('diselesaikan')->id;
            $detailComplaint->save();

            $notification = new Notification();
            $notification->user_email = $detailComplaint->user_email;
            $notification->title = "Pengaduan Telah Diselesaikan Oleh Petugas" . $complaint->certificate_no;
            $notification->content = "Dengan ini dari pihak pemohon untuk dapat menuju kekantor.";
            $notification->save();

            event(new ComplaintRegister(
                $complaint->user_email
            ));
        }

        if ($this->isAllStatus($statuses, 'ditolak')) {
            $complaintStatus = new ComplaintStatusQuery();
            $detailComplaint->complaint_statuses_id = $complaintStatus->getComplaintStatusBySlug('ditolak')->id;
            $detailComplaint->save();

            $notification = new Notification();
            $notification->user_email = $detailComplaint->user_email;
            $notification->title = "Pengaduan Telah Ditolak Oleh Petugas" . $complaint->certificate_no;
            $notification->content = "Mohon Maaf kepada pemohon, pengaduan yang anda ajukan ditolak.";
            $notification->save();

            event(new ComplaintRegister(
                $complaint->user_email
            ));
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
