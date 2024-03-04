<?php

namespace App\Queries;

use App\Models\Subdistrict;

class SubdistrictQuery extends Subdistrict
{
    public function getAllSubdistrictWithVillage()
    {
        return $this->with('village')->get();
    }
}
