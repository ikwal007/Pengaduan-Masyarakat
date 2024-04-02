<?php

namespace App\Queries;

use App\Models\User;

class UserQuery extends User
{

    /**
     * Get the count of worker accounts (users with roles other than 'Masyarakat').
     *
     * @return int
     */
    public function getCountAccountWorker()
    {
        // Use the User model to query the database
        return $this->whereDoesntHave('roles', function ($query) {
            $query->where('name', 'Masyarakat');
        })->with('roles')->get(); // Get the count of matching records

        // return User::whereHas('roles', function ($query) {
        //     $query->where('name', 'Masyarakat');
        // })->count();
    }

    /**
     * Get the count of 'Masyarakat' accounts (users with 'Masyarakat' role).
     *
     * @return int
     */
    public function getCountAccountMasyarakat()
    {
        // Use the User model to query the database
        return $this->with('roles')->get(); // Get the count of matching records
    }

    /**
     * Get all worker account data (users with roles other than 'Masyarakat') with roles eager loaded.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getAllAccountWorkerDatas()
    {
        // Use the User model to query the database
        return $this->whereDoesntHave('roles', function ($query) {
            // Exclude roles with the name 'Masyarakat' and "Super Admin"
            $query->where('name', 'Masyarakat')->where('name', 'Super_Admin');
        })->with('roles')->paginate(5); // Get all matching records with roles eager loaded
    }

    /**
     * Search all worker account data (users with roles other than 'Masyarakat') with roles eager loaded.
     * 
     * @param string $search The search query.
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function searchAllAccountWorkerDatas($search)
    {
        return $this->whereHas('modelHasRole', function ($modelHasRole) use ($search) {
            $modelHasRole->whereDoesntHave('roles', function ($rule) {
                // Exclude roles with the name 'Masyarakat' and "Super Admin"
                $rule->where('name', 'Masyarakat')->orWhere('name', 'Super_Admin');
            });
        })->with('modelHasRole')->paginate(5);
    }

    /**
     * Get detailed account information by user ULID.
     *
     * @param string $userUlid The ULID of the user.
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function getDetailAccount($userUlid)
    {
        // Use the Eloquent ORM to fetch the user with roles
        // Note: Eager loading is employed to retrieve roles along with the user in a more efficient manner
        return $this->where('id', $userUlid)->with('roles')->first();
    }
}
