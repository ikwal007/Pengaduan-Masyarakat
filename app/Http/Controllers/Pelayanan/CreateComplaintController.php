<?php

namespace App\Http\Controllers\Pelayanan;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\General\ComplaintPostRequest;
use App\Models\Complaint;
use App\Models\ComplaintHandling;
use App\Models\User;
use App\Queries\ComplaintMediaTypeQuery;
use App\Queries\ComplaintStatusQuery;
use App\Queries\ComplaintTypeQuery;
use App\Queries\SubdistrictQuery;

class CreateComplaintController extends Controller
{

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $complaintMediaType = new ComplaintMediaTypeQuery();
        $allComplaintMediaType = $complaintMediaType->getAll();

        $complaintStatus = new ComplaintStatusQuery();
        $allComplaintStatus = $complaintStatus->getAll();

        $complainType = new ComplaintTypeQuery();
        $allComplainType = $complainType->getComplaintTypeExcept("pelanggaran-disiplin-pegawai-negeri-sipil");

        $subdistrict = new SubdistrictQuery();
        $subdistricts = $subdistrict->getAllSubdistrictWithVillage();

        $dataOnSession = $request->session()->get('complain', null);

        return inertia('Pelayanan/CreateComplaint/Create', [
            'allComplaintMediaType' => $allComplaintMediaType,
            'allComplaintStatus' => $allComplaintStatus,
            'allComplainType' => $allComplainType,
            'subdistricts' => $subdistricts,
            'defaultComplaintStatus' => $complaintStatus->getComplaintStatusBySlug('diproses'),
            'oldDataFormOnSession' => $dataOnSession,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ComplaintPostRequest $request)
    {
        $validated = $request->validated();

        $userFail = User::where('email', $validated['userEmail'])->first();


        $complaint = new Complaint();

        $complaint->complaint_type_id = $validated['complainType'];
        $complaint->complaint_media_types_id = $validated['complainMediaType'];
        $complaint->user_email = $validated['userEmail'];
        $complaint->complaint_village_id = $validated['village'];
        $complaint->complaint_subdistrict_id = $validated['subdistricts'];
        $complaint->certificate_no = $validated['certificateNumber'];
        $complaint->description = $validated['description'];
        $complaint->complaint_statuses_id = $validated['complainStatus'];

        if ($userFail === null) {
            $request->session()->put('complain', $complaint->toArray());
            return redirect()->route('pelayanan.create_user')->with('message', 'Pengaduan Gagal Diproses, Email Belum Didaftarkan lanjut untuk medaftar akun');
        }

        $request->session()->forget('complain');

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

        return redirect()->route('pelayanan.dashboard-complaints-index')->with('message', 'Pengaduan Berhasil Disimpan');
    }
}
