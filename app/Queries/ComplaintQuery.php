<?php

namespace App\Queries;

use App\Models\Complaint;
class ComplaintQuery extends Complaint
{
    public function getAllCountComplaint()
    {

        $count = $this->count();

        return $count;
    }

    public function getAllCountComplaintNotConfirmed()
    {
        return $this->where('confirmed', 0)->count();
    }

    public function getAllCountComplaintOnSpecificUser(String $email)
    {
        return $this->whereHas('user', function ($query) use ($email) {
            $query->where('email', $email);
        })->count();
    }

    public function getAllCountComplaintByStatus($status)
    {
        return $this->whereHas('complaintStatus', function ($query) use ($status) {
            $query->where('slug', $status);
        })->count();
    }

    public function getAllCountComplaintByStatusOnSpecificUser(String $status, String $email)
    {
        return $this->whereHas('complaintStatus', function ($query) use ($status) {
            $query->where('slug', $status);
        })->whereHas('user', function ($query) use ($email) {
            $query->where('email', $email);
        })->count();
    }

    public function complaintWithPagination(String $filterByStatus =  null)
    {
        $res = null;

        if ($filterByStatus) {
            $res = $this->whereHas('complaintStatus', function ($query) use ($filterByStatus) {
                $query->where('slug', $filterByStatus);
            })->with(['complaintStatus', 'complaintType', 'complaintMediaType', 'user', 'village', 'subdistrict'])->paginate(10);

            return $res;
        }

        $res = $this->with(['complaintStatus', 'complaintType', 'complaintMediaType', 'user', 'village', 'subdistrict'])->paginate(10);

        return $res;
    }
    
    public function complaintWithPaginationBasedConfirmed(Bool $confirmed, String $filterByStatus =  null)
    {
        $res = null;

        if ($filterByStatus) {
            $res = $this->where('confirmed', $confirmed)->whereHas('complaintStatus', function ($query) use ($filterByStatus) {
                $query->where('slug', $filterByStatus);
            })->with(['complaintStatus', 'complaintType', 'complaintMediaType', 'user', 'village', 'subdistrict'])->paginate(10);

            return $res;
        }

        $res = $this->where('confirmed', $confirmed)->whereHas('complaintStatus', function ($query) {
            $query->where('slug', '!=', 'ditolak');
        })->with(['complaintStatus', 'complaintType', 'complaintMediaType', 'user', 'village', 'subdistrict'])->paginate(10);

        return $res;
    }

    public function searchComplaintWithPagination(String $search)
    {
        return $this->where(function ($complaint) use ($search) {
            $complaint->where('user_email', 'like', '%' . $search . '%')
                ->orWhere('certificate_no', 'like', '%' . $search . '%')
                ->orWhere('description', 'like', '%' . $search . '%');
        })->orWhereHas('user', function ($user) use ($search) {
            $user->where('full_name', 'like', '%' . $search . '%');
        })->orWhereHas('complaintType', function ($complaintType) use ($search) {
            $complaintType->where('name', 'like', '%' . $search . '%');
        })->orWhereHas('complaintMediaType', function ($complaintMediaType) use ($search) {
            $complaintMediaType->where('name', 'like', '%' . $search . '%');
        })->orWhereHas('complaintStatus', function ($complaintStatus) use ($search) {
            $complaintStatus->where('name', 'like', '%' . $search . '%');
        })->orWhereHas('village', function ($village) use ($search) {
            $village->where('name', 'like', '%' . $search . '%');
        })->orWhereHas('subdistrict', function ($subdistrict) use ($search) {
            $subdistrict->where('name', 'like', '%' . $search . '%');
        })->with(['complaintStatus', 'complaintType', 'complaintMediaType', 'user', 'village', 'subdistrict'])->paginate(10);
    }

    public function complaintWithPaginationOnSpecificUser(String $email, String $filterByStatus = null)
    {

        if ($filterByStatus) {
            return $this->whereHas('user', function ($user) use ($email) {
                $user->where('email', $email);
            })->whereHas('complaintStatus', function ($complaintStatus) use ($filterByStatus) {
                $complaintStatus->where('slug', 'like', '%' . $filterByStatus . '%');
            })->with(['complaintStatus', 'complaintType', 'complaintMediaType', 'user', 'village', 'subdistrict'])->paginate(10);
        }

        return $this->whereHas('user', function ($query) use ($email) {
            $query->where('email', $email);
        })->with(['complaintStatus', 'complaintType', 'complaintMediaType', 'user', 'village', 'subdistrict'])->latest()->paginate(10);
    }

    public function getDetailComplaintOnSeksiWithComplaintHandling(String $complaintHandlingId)
    {
        return $this->whereHas('complaintHandling', function ($complaintHandling) use ($complaintHandlingId) {
            $complaintHandling->where('id', $complaintHandlingId);
        })->with(['complaintStatus', 'complaintType', 'complaintMediaType', 'user', 'village', 'subdistrict', 'complaintHandling'])->first();
    }

    public function getDetailComplaint(String $complaintId)
    {
        return $this->where('id', $complaintId)->with(['complaintStatus', 'complaintType', 'complaintMediaType', 'user', 'village', 'subdistrict', "complaintHandling", "archives"])->first();
    }
}
