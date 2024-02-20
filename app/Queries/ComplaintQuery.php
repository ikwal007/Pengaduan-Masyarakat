<?php

namespace App\Queries;

use App\Models\Complaint;

class ComplaintQuery extends Complaint
{
    protected $table = 'complaints';

    public function getAllCountComplaint() {

        $count = $this->count();

        return $count;
    }
}
