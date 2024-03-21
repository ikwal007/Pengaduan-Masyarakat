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

    public function getAllCountComplaintByStatusOnSpecificSeksi(String $statusSlug, String $seksisName)
    {
        return $this->whereHas('complaintType', function ($complaintType) use ($seksisName) {
            $complaintType->whereHas('seksis', function ($seksis) use ($seksisName) {
                $seksis->where('name', 'like', '%' . $seksisName . '%');
            });
        })->whereHas('complaintHandling', function ($complaintHandling) use ($statusSlug) {
            $complaintHandling->whereHas('complaintStatus', function ($complaintStatus) use ($statusSlug) {
                $complaintStatus->where('slug', $statusSlug);
            });
        })->count();
    }

    public function getAllCountComplaintOnSpecificSeksi(String $seksisName)
    {
        return $this->whereHas('complaintType', function ($complaintType) use ($seksisName) {
            $complaintType->whereHas('seksis', function ($seksis) use ($seksisName) {
                $seksis->where('name', 'like', '%' . $seksisName . '%');
            });
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
        })->with(['complaintStatus', 'complaintType', 'complaintMediaType', 'user', 'village', 'subdistrict'])->paginate(10);
    }

    public function complaintWithPaginationOnSpecificSeksi(String $seksisName, String $statusSlug =  null)
    {
        $res = null;

        if ($statusSlug) {
            $res = $this->whereHas('complaintType', function ($complaintType) use ($seksisName) {
                $complaintType->whereHas('seksis', function ($seksis) use ($seksisName) {
                    $seksis->where('name', 'like', '%' . $seksisName . '%');
                });
            })->whereHas('complaintHandling', function ($complaintHandling) use ($statusSlug) {
                $complaintHandling->whereHas('complaintStatus', function ($complaintStatus) use ($statusSlug) {
                    $complaintStatus->where('slug', $statusSlug);
                });
            })->with(['complaintStatus', 'complaintType', 'complaintMediaType', 'user', 'village', 'subdistrict', 'complaintHandling'])->paginate(10);
        }

        $res = $this->whereHas('complaintType', function ($complaintType) use ($seksisName) {
            $complaintType->whereHas('seksis', function ($seksis) use ($seksisName) {
                $seksis->where('name', 'like', '%' . $seksisName . '%');
            });
        })->with(['complaintStatus', 'complaintType', 'complaintMediaType', 'user', 'village', 'subdistrict', 'complaintHandling'])->paginate(10);

        return $res;
    }

    public function getDetailComplaintOnSeksiWithComplaintHandling(String $complaintHandlingId)
    {
        return $this->whereHas('complaintHandling', function ($complaintHandling) use ($complaintHandlingId) {
            $complaintHandling->where('id', $complaintHandlingId);
        })->with(['complaintStatus', 'complaintType', 'complaintMediaType', 'user', 'village', 'subdistrict', 'complaintHandling'])->first();
    }
}
