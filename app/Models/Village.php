<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Village extends Model
{
    use HasFactory, HasUlids;

    protected $keyType = 'string';
    protected $primaryKey = 'id';
    protected $table = 'villages';
    public $incrementing = false;

    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];

    public function subdistrict(): BelongsTo
    {
        return $this->belongsTo(Subdistrict::class, 'subdistrict_id', 'id');
    }

    public function complaints(): HasMany
    {
        return $this->hasMany(Complaint::class, 'complaint_village_id');
    }
}
