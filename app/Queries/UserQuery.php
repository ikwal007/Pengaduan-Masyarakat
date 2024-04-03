<?php

namespace App\Queries;

use App\Models\User;

class UserQuery extends User
{
    /**
     * Get the count of worker accounts (users with roles other than 'Masyarakat').
     *
     * @return String
     */
    public function getCountAccountWorker()
    {
        $user = new User();
        // Use the User model to query the database
        return $user->whereDoesntHave('roles', function ($query) {
            $query->where('name', 'Masyarakat')->orWhere('name', 'Super_Admin');
        })->with('roles')->count(); // Get the count of matching records

        // return User::whereHas('roles', function ($query) {
        //     $query->where('name', 'Masyarakat');
        // })->count();
    }

    public function getCountAccountMasyarakat()
    {
        $user = new User();
        // Use the User model to query the database
        return $user->whereHas('roles', function ($roles) {
            $roles->where('name', 'Masyarakat');
        })->with('roles')->count(); // Get the count of matching records
    }

    /**
     * Get all worker account data (users with roles other than 'Masyarakat') with roles eager loaded.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getAllAccountWorkerDatas()
    {
        $user = new User();
        // Use the User model to query the database
        return $user->whereDoesntHave('roles', function ($query) {
            // Exclude roles with the name 'Masyarakat' and "Super Admin"
            $query->where('name', 'Masyarakat')->orWhere('name', 'Super_Admin');
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
        $user = new User();
        return $user->where(function ($users) use ($search) {
            $users->where('full_name', 'like', '%' . $search . '%')
                ->orWhere('email', 'like', '%' . $search . '%')
                ->orWhere('status', 'like', '%' . $search . '%')
                ->orWhereHas('roles', function ($role) use ($search) {
                    $role->where('name', 'like', '%' . $search . '%');
                });
        })
            ->whereDoesntHave('roles', function ($query) {
                $query->where('name', 'Masyarakat')->orWhere('name', 'Super_Admin');
            })->with('roles')->paginate(5);
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
        $user = new User();
        // Use the Eloquent ORM to fetch the user with roles
        // Note: Eager loading is employed to retrieve roles along with the user in a more efficient manner
        return $user->where('id', $userUlid)->with('roles')->first();
    }
}
