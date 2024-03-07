<?php

namespace App\Queries;

use App\Models\Seksi;

class SeksiQuery extends Seksi
{
    public function getSpesificIdSeksi(String $slug)
    {
        return $this->where('slug', $slug)->first('id');
    }
}
