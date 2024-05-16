<?php

namespace App\Http\Controllers\Masyarakat;

use App\Models\Complaint;
use Illuminate\Support\Str;
use App\Models\Notification;
use Illuminate\Http\Request;
use App\Models\ComplaintStatus;
use App\Queries\ComplaintQuery;
use App\Models\ComplaintHandling;
use App\Queries\SubdistrictQuery;
use App\Queries\NotificationQuery;
use App\Queries\ComplaintTypeQuery;
use App\Http\Controllers\Controller;
use App\Queries\ComplaintStatusQuery;
use App\Queries\ComplaintMediaTypeQuery;
use App\Events\Masyarakat\ComplaintRegister;
use App\Http\Requests\General\ComplaintPostRequest;
use App\Models\Archives;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class DashboardComplaintController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $complaint = new ComplaintQuery();
        $status = new ComplaintStatusQuery();
        $allStatus = $status->getAll();
        $allCountComplaint = $complaint->getAllCountComplaintOnSpecificUser(auth()->user()->email);
        $allCountComplaintByStatusProsessing = $complaint->getAllCountComplaintByStatusOnSpecificUser('diproses', auth()->user()->email);
        $allCountComplaintByStatusDone = $complaint->getAllCountComplaintByStatusOnSpecificUser('diselesaikan', auth()->user()->email);
        $allCountComplaintByStatusReject = $complaint->getAllCountComplaintByStatusOnSpecificUser('ditolak', auth()->user()->email);
        $allCountComplaintByStatusPending = $complaint->getAllCountComplaintByStatusOnSpecificUser('ditunda', auth()->user()->email);
        $paginationComplaint = $complaint->complaintWithPaginationOnSpecificUser(auth()->user()->email);
        return inertia('Masyarakat/DashboardComplaint/Index', [
            'countComplaint' => fn () => $allCountComplaint,
            'countComplaintByStatusProsessing' => fn () => $allCountComplaintByStatusProsessing,
            'countComplaintByStatusDone' => fn () => $allCountComplaintByStatusDone,
            'countComplaintByStatusReject' => fn () => $allCountComplaintByStatusReject,
            'countComplaintByStatusPending' => fn () => $allCountComplaintByStatusPending,
            'paginationComplaint' => fn () => $paginationComplaint,
            'allStatus' => $allStatus,
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
            'defaultComplaintStatus' => $complaintStatus->getComplaintStatusBySlug('ditunda'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ComplaintPostRequest $request)
    {
        $validated = $request->validated();

        $statusComplaint = new ComplaintStatusQuery();
        $defaultComplaintStatus = $statusComplaint->getComplaintStatusBySlug('ditunda')->id;

        $complaint = new Complaint();
        $complaint->complaint_type_id = $validated['complainType'];
        $complaint->complaint_media_types_id = $validated['complainMediaType'];
        $complaint->user_email = $validated['userEmail'];
        $complaint->complaint_village_id = $validated['village'];
        $complaint->complaint_subdistrict_id = $validated['subdistricts'];
        $complaint->certificate_no = $validated['certificateNumber'];
        $complaint->description = $validated['description'];
        $complaint->complaint_statuses_id = $defaultComplaintStatus;
        $complaint->confirmed = 0;
        $complaint->save();

        if (!empty($request['inputFiles'])) {
            foreach ($request['inputFiles'] as $data) {
                $archives = new Archives();
                $patch = '/upload/archives/' . $validated['userEmail'] . '/';
                $avatar = $data['file'];
                $slug = Str::slug($avatar->getClientOriginalName());
                $filename = time() . '-' . $slug . '.' . $avatar->getClientOriginalExtension();
                $avatar->move(public_path($patch), $filename);
                $archives->complaint_id = $complaint->id;
                $archives->resource = $patch . $filename;
                $archives->save();
            }
        }

        $queryComplaint = new ComplaintTypeQuery();
        $listTeamHandlingComplaint = $queryComplaint->getSeksiWithComplaint($validated['complainType'])->seksis;

        foreach ($listTeamHandlingComplaint as $seksi) {
            $complaintHandling = new ComplaintHandling();
            $status = new ComplaintStatusQuery();
            $complaintHandling->complaint_id = $complaint->id;
            $complaintHandling->seksi_id = $seksi->id;
            $complaintHandling->status_id = $status->getComplaintStatusBySlug('ditunda')->id;
            $complaintHandling->save();
        }

        $notification = new Notification();
        $notification->user_email = $validated['userEmail'];
        $notification->title = "Pengaduan Baru " . $validated['certificateNumber'];
        $notification->content = "Pengaduan sedang ditinjau oleh pelayanan." . "Dengan Data sertifikasi:" . $validated['certificateNumber'] . "Dengan Deskripsi:" . $validated['description'];
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
        $complaint = new ComplaintQuery();
        $detailComplaint = $complaint->getDetailComplaint($id);
        if ($detailComplaint->complaintStatus->slug === 'ditolak') {
            return redirect()->route("complaint.index");
        }
        return inertia('Masyarakat/ShowComplaint/Show', [
            "detailComplaint" => $detailComplaint
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $complaint = new ComplaintQuery();
        $detailComplaint = $complaint->getDetailComplaint($id);

        $complainType = new ComplaintTypeQuery();
        $allComplainType = $complainType->getComplaintTypeExcept("pelanggaran-disiplin-pegawai-negeri-sipil");

        $subdistrict = new SubdistrictQuery();
        $subdistricts = $subdistrict->getAllSubdistrictWithVillage();

        return inertia('Masyarakat/EditComplaint/Edit', [
            'detailComplaint' => $detailComplaint,
            'allComplainType' => $allComplainType,
            'subdistricts' => $subdistricts,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $findComplaint = Complaint::with('archives')->find($id);
        $statusComplaint = new ComplaintStatusQuery();
        $defaultComplaintStatus = $statusComplaint->getComplaintStatusBySlug('ditunda')->id;
        $request->validate([
            "data.complainType" => "required",
            "data.complainMediaType" => "required",
            "data.userEmail" => ['required', 'email:rfc,dns'],
            "data.subdistricts" => "required",
            "data.village" => "required",
            "data.certificateNumber" => "required",
            "data.description" => "required",
        ]);

        if ($findComplaint->complaint_type_id !== $request->data['complainType']) {
            $findComplaint->complaint_type_id = $request->data['complainType'];
        }
        if ($findComplaint->complaint_media_types_id !== $request->data['complainMediaType']) {
            $findComplaint->complaint_media_types_id = $request->data['complainMediaType'];
        }

        if ($findComplaint->complaint_village_id !== $request->data['village']) {
            $findComplaint->complaint_village_id = $request->data['village'];
        }
        if ($findComplaint->complaint_subdistrict_id !== $request->data['subdistricts']) {
            $findComplaint->complaint_subdistrict_id = $request->data['subdistricts'];
        }

        if ($findComplaint->certificate_no !== $request->data['certificateNumber']) {
            $findComplaint->certificate_no = $request->data['certificateNumber'];
        }

        if ($findComplaint->description !== $request->data['description']) {
            $findComplaint->description = $request->data['description'];
        }

        if ($findComplaint->complaint_statuses_id !== $defaultComplaintStatus) {
            $findComplaint->complaint_statuses_id = $defaultComplaintStatus;
        }

        $findComplaint->confirmed = 0;

        $findComplaint->save();

        if (!empty($request->data['inputFiles'])) {
            foreach ($request->data['inputFiles'] as $data) {
                $archives = new Archives();
                $patch = '/upload/archives/' . $request->data['userEmail'] . '/';
                $avatar = $data['file'];
                $slug = Str::slug($avatar->getClientOriginalName());
                $filename = time() . '-' . $slug . '.' . $avatar->getClientOriginalExtension();
                $avatar->move(public_path($patch), $filename);
                $archives->complaint_id = $findComplaint->id;
                $archives->resource = $patch . $filename;
                $archives->save();
            }
        }

        $notification = new Notification();
        $notification->user_email = $request->data['userEmail'];
        $notification->title = "Edit Pengaduan" . " - " . $request->data['certificateNumber'];
        $notification->content = "Pengaduan sedang ditinjau oleh pelayanan." . "Dengan Data sertifikasi:" . $request->data['certificateNumber'] . "Dengan Deskripsi:" . $request->data['description'] . "Untuk informasi lanjut silahkan lihat di menu notifikasi";
        $notification->save();

        $notificationQuery = new NotificationQuery();

        event(new ComplaintRegister(
            $request->data['userEmail'],
            $notificationQuery->getAllNotification($request->data['userEmail'])
        ));

        return redirect()->route('complaint.index')->with('message', 'Pengaduan Berhasil Diupdate');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $findComplaint = Complaint::with(['archives', 'complaintHandling'])->find($id);

        if (!empty($findComplaint->archives)) {
            foreach ($findComplaint->archives as $data) {
                File::delete(public_path($data->resource));
            }
        }


        $notification = new Notification();
        $notification->user_email = $findComplaint->user_email;
        $notification->title = "Hapus Pengaduan" . " - " . $findComplaint->certificate_no;
        $notification->content = "Pengaduan Telah dihapus." . "Dengan Data sertifikasi:" . $findComplaint->certificate_no . "Dengan Deskripsi:" . $findComplaint->description;
        $notification->save();
        $findComplaint->delete();

        $notificationQuery = new NotificationQuery();

        event(new ComplaintRegister(
            $findComplaint->user_email,
            $notificationQuery->getAllNotification($findComplaint->user_email)
        ));

        return redirect()->route('complaint.index')->with('message', 'Pengaduan Berhasil Dihapus');
    }
}
