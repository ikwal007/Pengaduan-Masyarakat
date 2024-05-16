<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\File;

class Complaint extends Model
{
    use HasFactory, HasUlids;

    protected $keyType = 'string';
    protected $primaryKey = 'id';
    protected $table = 'complaints';
    public $incrementing = false;

    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];

    public function complaintStatus(): BelongsTo
    {
        return $this->belongsTo(ComplaintStatus::class, 'complaint_statuses_id', 'id');
    }

    public function complaintType(): BelongsTo
    {
        return $this->belongsTo(complaintType::class, 'complaint_type_id');
    }

    public function complaintMediaType(): BelongsTo
    {
        return $this->belongsTo(ComplaintMediaType::class, 'complaint_media_types_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_email', 'email')->with(['roles']);
    }

    public function village(): BelongsTo
    {
        return $this->belongsTo(Village::class, 'complaint_village_id')->with('subdistrict');
    }

    public function subdistrict(): BelongsTo
    {
        return $this->belongsTo(Subdistrict::class, 'complaint_subdistrict_id')->with('village');
    }

    public function complaintHandling(): HasMany
    {
        return $this->hasMany(ComplaintHandling::class, 'complaint_id', 'id')->with('complaintStatus');
    }

    public function archives(): HasMany
    {
        return $this->hasMany(Archives::class, 'complaint_id', 'id');
    }
}
