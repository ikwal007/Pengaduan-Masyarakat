<?php 

namespace App\Queries;

use App\Models\ComplaintType;

class ComplaintTypeQuery extends ComplaintType
{
    

    public function getAll()
    {
        return $this->all();
    }

    public function getComplaintTypeExcept($slug)
    {
        return $this->where('slug', '!=', $slug)->get();
    }
}