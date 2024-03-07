<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ComplaintType extends Model
{
    use HasFactory, HasUlids;

    protected $keyType = 'string';
    protected $primaryKey = 'id';
    protected $table = 'complaint_types';
    public $incrementing = false;
    public $timestamps = true;

    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];

    public function complaints(): HasMany
    {
        return $this->hasMany(Complaint::class, 'complaint_type_id');
    }

    public function seksis()
    {
        return $this->belongsToMany(Seksi::class, 'complaint_types_has_seksis', 'complaint_type_id', 'seksi_id');
    }

    public function getSeksiWithComplaint(String $id)
    {
        return $this->with(['seksis'])->find($id);
    }
}
