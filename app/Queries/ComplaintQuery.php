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

    public function getAllCountComplaintByStatus($status)
    {
        return $this->whereHas('complaintStatus', function ($query) use ($status) {
            $query->where('slug', $status);
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
}
