<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ComplaintHandling extends Model
{
    use HasFactory, HasUlids;

    protected $keyType = 'string';
    protected $primaryKey = 'id';
    protected $table = 'complaint_handling';
    public $incrementing = false;

    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];

    public function complaint(): BelongsTo
    {
        return $this->belongsTo(Complaint::class, 'complaint_id', 'id');
    }

    public function complaintStatus(): BelongsTo
    {
        return $this->belongsTo(ComplaintStatus::class, 'complaint_statuses_id', 'id');
    }
}
