<?php

namespace App\Http\Controllers\Masyarakat;

use App\Events\Masyarakat\ComplaintRegister;
use App\Http\Controllers\Controller;
use App\Http\Requests\General\ComplaintPostRequest;
use App\Models\Complaint;
use App\Models\ComplaintHandling;
use App\Models\ComplaintStatus;
use App\Models\Notification;
use App\Queries\ComplaintMediaTypeQuery;
use App\Queries\ComplaintQuery;
use App\Queries\ComplaintStatusQuery;
use App\Queries\ComplaintTypeQuery;
use App\Queries\NotificationQuery;
use App\Queries\SubdistrictQuery;
use Illuminate\Http\Request;

class DashboardComplaintController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $complaint = new ComplaintQuery();
        $allCountComplaint = $complaint->getAllCountComplaintOnSpecificUser(auth()->user()->email);
        $allCountComplaintByStatusProsessing = $complaint->getAllCountComplaintByStatusOnSpecificUser('diproses', auth()->user()->email);
        $allCountComplaintByStatusDone = $complaint->getAllCountComplaintByStatusOnSpecificUser('diselesaikan', auth()->user()->email);
        $allCountComplaintByStatusReject = $complaint->getAllCountComplaintByStatusOnSpecificUser('ditolak', auth()->user()->email);
        $allCountComplaintByStatusPending = $complaint->getAllCountComplaintByStatusOnSpecificUser('ditunda', auth()->user()->email);
        $paginationComplaint = $complaint->complaintWithPaginationOnSpecificUser(auth()->user()->email);
        return inertia('Masyarakat/DashboardComplaint/Index', [
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
        $complaintMediaType = new ComplaintMediaTypeQuery();
        $defaultComplaintMediaTypeForMasyarakat = $complaintMediaType->getDefaultComplaintMediaTypeForMasyarakat()->id;

        $complaintStatus = new ComplaintStatusQuery();
        $allComplaintStatus = $complaintStatus->getAll();

        $complainType = new ComplaintTypeQuery();
        $allComplainType = $complainType->getComplaintTypeExcept("pelanggaran-disiplin-pegawai-negeri-sipil");

        $subdistrict = new SubdistrictQuery();
        $subdistricts = $subdistrict->getAllSubdistrictWithVillage();

        return inertia('Masyarakat/CreateComplaint/Create', [
            'defaultComplaintMediaTypeForMasyarakat' => $defaultComplaintMediaTypeForMasyarakat,
            'allComplaintStatus' => $allComplaintStatus,
            'allComplainType' => $allComplainType,
            'subdistricts' => $subdistricts,
            'defaultComplaintStatus' => $complaintStatus->getComplaintStatusBySlug('diproses'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ComplaintPostRequest $request)
    {
        $validated = $request->validated();

        $complaint = new Complaint();
        $complaint->complaint_type_id = $validated['complainType'];
        $complaint->complaint_media_types_id = $validated['complainMediaType'];
        $complaint->user_email = $validated['userEmail'];
        $complaint->complaint_village_id = $validated['village'];
        $complaint->complaint_subdistrict_id = $validated['subdistricts'];
        $complaint->certificate_no = $validated['certificateNumber'];
        $complaint->description = $validated['description'];
        $complaint->complaint_statuses_id = $validated['complainStatus'];
        $complaint->save();

        $queryComplaint = new ComplaintTypeQuery();
        $listTeamHandlingComplaint = $queryComplaint->getSeksiWithComplaint($validated['complainType'])->seksis;

        foreach ($listTeamHandlingComplaint as $seksi) {
            $complaintHandling = new ComplaintHandling();
            $status = new ComplaintStatusQuery();
            $complaintHandling->complaint_id = $complaint->id;
            $complaintHandling->seksi_id = $seksi->id;
            $complaintHandling->status_id = $status->getComplaintStatusBySlug('diproses')->id;
            $complaintHandling->save();
        }

        $notification = new Notification();
        $notification->user_email = $validated['userEmail'];
        $notification->title = "Pengaduan Baru ".$validated['certificateNumber'];
        $notification->content = "Pengaduan sedang diproses oleh Kepala Seksi terkait." . "Dengan Data sertifikasi:" . $validated['certificateNumber'] . "Dengan Deskripsi:" . $validated['description'];
        $notification->save();

        $notificationQuery = new NotificationQuery();

        event(new ComplaintRegister(
            $validated['userEmail'],
            $notificationQuery->getAllNotification($validated['userEmail'])
        ));

        return redirect()->route('complaint.index')->with('message', 'Pengaduan Berhasil Diajukan');
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
