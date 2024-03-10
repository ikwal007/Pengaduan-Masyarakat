<?php

namespace App\Queries;

use App\Models\ComplaintHandling;

class ComplaintHandlingQuery extends ComplaintHandling
{
    public function getDetailComplaintHandling(String $id)
    {
        return $this->where('id', $id)->with(['complaint', 'complaintStatus'])->first();
    }
}