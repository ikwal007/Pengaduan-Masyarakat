<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\Guard;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
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

    /**
     * add realationships role to users
     */
    public function modelHasRoles(): HasMany
    {
        return $this->hasMany(ModelHasRole::class, 'role_id')->with('user');
    }

    public function getRoleIdOnParamName($paramName){
        return $this->where('name', $paramName)->first()->id;
    }

    
}
