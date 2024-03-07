<?php

namespace App\Queries;

use App\Models\ComplaintMediaType;

class ComplaintMediaTypeQuery extends ComplaintMediaType
{
    

    public function getAll()
    {
        return $this->all();
    }

    public function getDefaultComplaintMediaTypeForMasyarakat()
    {
        return $this->where('slug', 'langsung')->first();
    }
}