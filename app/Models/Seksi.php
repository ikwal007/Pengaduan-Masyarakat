<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Seksi extends Model
{
    use HasFactory, HasUlids;

    protected $keyType = 'string';
    protected $primaryKey = 'id';
    protected $table = 'seksis';
    public $incrementing = false;
    public $timestamps = true;

    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];

    public function complaintTypes()
    {
        return $this->belongsToMany(ComplaintType::class, 'complaint_types_has_seksis', 'seksi_id', 'complaint_type_id');
    }

    public function complaintHandling(): HasMany
    {
        return $this->hasMany(ComplaintHandling::class, 'seksi_id');
    }
}
