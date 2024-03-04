<?php 

namespace App\Queries;

use App\Models\ComplaintStatus;

class ComplaintStatusQuery extends ComplaintStatus
{
    public function getAll()
    {
        return $this->all();
    }

    public function getComplaintStatusBySlug($slug)
    {
        return $this->where('slug', $slug)->firstOrFail();
    }
}