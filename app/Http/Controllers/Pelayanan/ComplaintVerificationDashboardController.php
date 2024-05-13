<?php

namespace App\Http\Controllers\Pelayanan;

use App\Events\Masyarakat\ComplaintRegister;
use App\Http\Controllers\Controller;
use App\Models\Complaint;
use App\Models\Notification;
use App\Queries\ComplaintMediaTypeQuery;
use App\Queries\ComplaintQuery;
use App\Queries\ComplaintStatusQuery;
use App\Queries\ComplaintTypeQuery;
use App\Queries\NotificationQuery;
use App\Queries\SubdistrictQuery;
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
        return inertia('Pelayanan/DashboardVerifikasiPengaduan/Index', [
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
    public function edit(string $id, Request $request)
    {
        $complaint = new ComplaintQuery();
        $detailComplaint = $complaint->getDetailComplaint($id);

        $complaintMediaType = new ComplaintMediaTypeQuery();
        $allComplaintMediaType = $complaintMediaType->getAll();

        $complaintStatus = new ComplaintStatusQuery();
        $allComplaintStatus = $complaintStatus->getAll();

        $complainType = new ComplaintTypeQuery();
        $allComplainType = $complainType->getComplaintTypeExcept("pelanggaran-disiplin-pegawai-negeri-sipil");

        $subdistrict = new SubdistrictQuery();
        $subdistricts = $subdistrict->getAllSubdistrictWithVillage();

        $dataOnSession = $request->session()->get('complain', null);

        return inertia('Pelayanan/EditVerificationComplaint/Edit', [
            'allComplaintMediaType' => $allComplaintMediaType,
            'allComplaintStatus' => $allComplaintStatus,
            'allComplainType' => $allComplainType,
            'subdistricts' => $subdistricts,
            'defaultComplaintStatus' => $complaintStatus->getComplaintStatusBySlug('diproses'),
            'oldDataFormOnSession' => $dataOnSession,
            "detailComplaint" => $detailComplaint
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $complaint = Complaint::with('complaintStatus')->find($id);

        $complaintStatus = new ComplaintStatusQuery();
        $complaintStatusRejected = $complaintStatus->getComplaintStatusBySlug('ditolak');

        if ($request->confirmation === "ditolak") {
            $complaint->complaint_statuses_id = $complaintStatusRejected->id;
            $complaint->save();

            $notification = new Notification();
            $notification->user_email = $complaint->user_email;
            $notification->title = "Penolakan Pengaduan " . $complaint->certificate_no;
            $notification->content = $request->deskripsiPenolakan . " " . "Dengan ini dari pihak pemohon untuk dapat melengkapi data pada halaman penolakan pengaduan.";
            $notification->save();

            $notificationQuery = new NotificationQuery();

            event(new ComplaintRegister(
                $complaint->user_email,
                $notificationQuery->getAllNotification($complaint->user_email)
            ));

            return redirect()->route('pelayanan.complaint-verification-dashboard-index')->with('message', 'Pengaduan Telah Diverifikasi');
        } else {
            $complaint->confirmed = 1;
            $complaint->save();

            $notification = new Notification();
            $notification->user_email = $complaint->user_email;
            $notification->title = "Pengaduan Telah Diverifikasi Oleh Petugas" . $complaint->certificate_no;
            $notification->content = "Dengan ini dari pihak pemohon untuk dapat menunggu peroses dari pengaduan yang akan ditangani oleh seksi terkait.";
            $notification->save();

            $notificationQuery = new NotificationQuery();

            event(new ComplaintRegister(
                $complaint->user_email,
                $notificationQuery->getAllNotification($complaint->user_email)
            ));
            return redirect()->route('pelayanan.complaint-verification-dashboard-index')->with('message', 'Pengaduan Telah Diverifikasi');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
