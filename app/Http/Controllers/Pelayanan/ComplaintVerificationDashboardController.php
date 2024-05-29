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
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class ComplaintVerificationDashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $complaint = new ComplaintQuery();
        $allCountComplaint = $complaint->getAllCountComplaintOnConditionConfirm(0);
        $paginationComplaint = $complaint->complaintWithPaginationBasedConfirmed(0);
        return inertia('Pelayanan/DashboardVerifikasiPengaduan/Index', [
            'countComplaint' => $allCountComplaint,
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
        $userId = auth()->user()->id;
        $complaint = Complaint::where('id', $id)
            ->where(function ($query) use ($userId) {
                $query->where('locked_by', null)
                    ->orWhere('locked_at', '<', Carbon::now()->subMinutes(1))
                    ->orWhere('locked_by', $userId);
            })
            ->first();

        if (!$complaint) {
            return redirect()->route('pelayanan.complaint-verification-dashboard-index')->with('message', 'Complaint sedang dikunci oleh pengguna lain.');
        }

        $complaint->update([
            'locked_by' => $userId,
            'locked_at' => Carbon::now(),
        ]);

        $detailComplaint = (new ComplaintQuery())->getDetailComplaint($id);

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
            'defaultComplaintStatus' => $complaintStatus->getComplaintStatusBySlug('ditunda'),
            'oldDataFormOnSession' => $dataOnSession,
            "detailComplaint" => $detailComplaint
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $userId = auth()->user()->id;

        DB::beginTransaction();

        try {
            $complaint = Complaint::where('id', $id)
                ->where('locked_by', $userId)
                ->lockForUpdate()
                ->first();

            if (!$complaint) {
                DB::rollBack();
                return redirect()->route('pelayanan.complaint-verification-dashboard-index')
                    ->with('error', 'Pengaduan tidak ditemukan atau dikunci oleh pengguna lain.');
            }

            $complaintStatus = new ComplaintStatusQuery();
            $complaintStatusRejected = $complaintStatus->getComplaintStatusBySlug('ditolak');

            if ($request->confirmation === "ditolak") {
                $complaint->complaint_statuses_id = $complaintStatusRejected->id;
            } else {
                $complaint->confirmed = 1;
            }

            $complaint->locked_by = null;
            $complaint->locked_at = null;
            $complaint->save();

            $notification = new Notification();
            $notification->user_email = $complaint->user_email;
            $notification->title = $request->confirmation === "ditolak" ?
                "Penolakan Pengaduan " . $complaint->certificate_no :
                "Pengaduan Telah Diverifikasi Oleh Petugas" . $complaint->certificate_no;
            $notification->content = $request->confirmation === "ditolak" ?
                $request->deskripsiPenolakan . " Dengan ini dari pihak pemohon untuk dapat melengkapi data pada halaman penolakan pengaduan." :
                "Dengan ini dari pihak pemohon untuk dapat menunggu proses dari pengaduan yang akan ditangani oleh seksi terkait.";
            $notification->save();

            event(new ComplaintRegister($complaint->user_email));

            DB::commit();

            return redirect()->route('pelayanan.complaint-verification-dashboard-index')
                ->with('message', 'Pengaduan Telah Diverifikasi');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('pelayanan.complaint-verification-dashboard-index')
                ->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }

        // $complaint = Complaint::with('complaintStatus')->find($id);

        // $complaintStatus = new ComplaintStatusQuery();
        // $complaintStatusRejected = $complaintStatus->getComplaintStatusBySlug('ditolak');

        // if ($request->confirmation === "ditolak") {
        //     $complaint->complaint_statuses_id = $complaintStatusRejected->id;
        //     $complaint->save();

        //     $notification = new Notification();
        //     $notification->user_email = $complaint->user_email;
        //     $notification->title = "Penolakan Pengaduan " . $complaint->certificate_no;
        //     $notification->content = $request->deskripsiPenolakan . " " . "Dengan ini dari pihak pemohon untuk dapat melengkapi data pada halaman penolakan pengaduan.";
        //     $notification->save();

        //     event(new ComplaintRegister(
        //         $complaint->user_email
        //     ));

        //     return redirect()->route('pelayanan.complaint-verification-dashboard-index')->with('message', 'Pengaduan Telah Diverifikasi');
        // } else {
        //     $complaint->confirmed = 1;
        //     $complaint->save();

        //     $notification = new Notification();
        //     $notification->user_email = $complaint->user_email;
        //     $notification->title = "Pengaduan Telah Diverifikasi Oleh Petugas" . $complaint->certificate_no;
        //     $notification->content = "Dengan ini dari pihak pemohon untuk dapat menunggu peroses dari pengaduan yang akan ditangani oleh seksi terkait.";
        //     $notification->save();

        //     event(new ComplaintRegister(
        //         $complaint->user_email
        //     ));
        //     return redirect()->route('pelayanan.complaint-verification-dashboard-index')->with('message', 'Pengaduan Telah Diverifikasi');
        // }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
