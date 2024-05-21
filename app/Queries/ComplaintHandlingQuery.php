<?php

namespace App\Queries;

use App\Models\ComplaintHandling;

class ComplaintHandlingQuery extends ComplaintHandling
{
    public function getDetailComplaintHandling(String $id)
    {
        return $this->where('id', $id)->with(['complaint', 'complaintStatus'])->first();
    }

    public function getAllCountComplaintOnSpecificSeksi(string $seksisName)
    {
        return $this->whereHas("complaint", function ($complaint) {
            $complaint->where('confirmed', 1);
        })->whereHas('seksis', function ($seksis) use ($seksisName) {
            $seksis->where('name', 'like', '%' . $seksisName . '%');
        })->count();
    }

    public function getAllCountComplaintByStatusOnSpecificSeksi(String $statusSlug, String $seksisName)
    {
        return $this->whereHas('seksis', function ($seksis) use ($seksisName) {
            $seksis->where('name', 'like', '%' . $seksisName . '%');
        })->whereHas('complaint', function ($complaint) {
            $complaint->where('confirmed', 1);
        })->whereHas('complaintStatus', function ($complaintStatus) use ($statusSlug) {
            $complaintStatus->where('slug', $statusSlug);
        })->count();
    }

    public function complaintWithPaginationOnSpecificSeksi(String $seksisName, String $search = null)
    {
        if ($search == null) {
            return $this->whereHas('complaint', function ($complaint) {
                $complaint->where('confirmed', 1);
            })->whereHas('seksis', function ($seksis) use ($seksisName) {
                $seksis->where('name', 'like', '%' . $seksisName . '%');
            })->with(['complaint', 'complaintStatus', 'seksis'])->paginate(10);
        }

        return $this->whereHas("complaint", function ($complaint) {
            $complaint->where('confirmed', 1);
        })->whereHas('seksis', function ($seksis) use ($seksisName) {
            $seksis->where('name', 'like', '%' . $seksisName . '%');
        })->whereHas('complaint', function ($complaint) use ($search) {
            $complaint->where('user_email', 'like', '%' . $search . '%')
                ->orWhere('certificate_no', 'like', '%' . $search . '%')
                ->orWhere('description', 'like', '%' . $search . '%')
                ->orWhereHas('complaintMediaType', function ($complaintType) use ($search) {
                    $complaintType->where('name', 'like', '%' . $search . '%');
                })->orWhereHas('village', function ($village) use ($search) {
                    $village->where('name', 'like', '%' . $search . '%');
                })->orWhereHas('subdistrict', function ($subdistrict) use ($search) {
                    $subdistrict->where('name', 'like', '%' . $search . '%');
                })->orWhereHas('user', function ($user) use ($search) {
                    $user->where('full_name', 'like', '%' . $search . '%');
                })->orWhereHas('complaintHandling', function ($complaintHandling) use ($search) {
                    $complaintHandling->whereHas('complaintStatus', function ($complaintStatus) use ($search) {
                        $complaintStatus->where('name', 'like', '%' . $search . '%');
                    });
                });
        })->with(['complaint', 'complaintStatus', 'seksis'])->paginate(10);
    }
}
