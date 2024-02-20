<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\Guard;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Permission\Models\Role as SpatieRole;

class Role extends SpatieRole
{
    use HasFactory, HasUlids;

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'id';
    public $incrementing = false;

    /**
     * add realationships role to users
     */
    public function modelHasRoles()
    {
        return $this->hasMany(ModelHasRole::class, 'role_id');
    }

    public function getRoleIdOnParamName($paramName){
        return $this->where('name', $paramName)->first()->id;
    }

    
}
