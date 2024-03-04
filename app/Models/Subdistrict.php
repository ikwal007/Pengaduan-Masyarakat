<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Subdistrict extends Model
{
    use HasFactory, HasUlids;

    protected $keyType = 'string';
    protected $primaryKey = 'id';
    protected $table = 'subdistricts';
    public $incrementing = false;

    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];

    public function village(): HasMany
    {
        return $this->hasMany(Village::class, 'subdistrict_id', 'id');
    }

    public function complint(): HasMany
    {
        return $this->hasMany(Complaint::class, 'complaint_subdistrict_id');
    }
}
