<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ComplaintMediaType extends Model
{
    use HasFactory, HasUlids;

    protected $keyType = 'string';
    protected $primaryKey = 'id';
    protected $table = 'complaint_media_types';
    public $incrementing = false;

    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];

    public function complaints(): HasMany
    {
        return $this->hasMany(Complaint::class, 'complaint_media_types_id');
    }
}
