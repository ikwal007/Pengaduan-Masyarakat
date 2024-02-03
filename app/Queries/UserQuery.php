<?php

namespace App\Queries;

use App\Models\User;

class UserQuery
{
    /**
     * Get the count of worker accounts (users with roles other than 'Masyarakat').
     *
     * @return int
     */
    public static function getCountAccountWorker()
    {
        // Use the User model to query the database
        return User::whereDoesntHave('roles', function ($query) {
            // Exclude roles with the name 'Masyarakat'
            $query->where('name', 'Masyarakat');
        })->count(); // Get the count of matching records
    }

    /**
     * Get the count of 'Masyarakat' accounts (users with 'Masyarakat' role).
     *
     * @return int
     */
    public static function getCountAccountMasyarakat()
    {
        // Use the User model to query the database
        return User::whereHas('roles', function ($query) {
            // Include only roles with the name 'Masyarakat'
            $query->where('name', 'Masyarakat');
        })->count(); // Get the count of matching records
    }

    /**
     * Get all worker account data (users with roles other than 'Masyarakat') with roles eager loaded.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public static function getAllAccountWorkerDatas()
    {
        // Use the User model to query the database
        return User::whereDoesntHave('roles', function ($query) {
            // Exclude roles with the name 'Masyarakat' and "Super Admin"
            $query->where('name', 'Masyarakat')->orWhere('name', 'Super_Admin');
        })->with('roles')->paginate(5); // Get all matching records with roles eager loaded
    }

    /**
     * Get detailed account information by user ULID.
     *
     * @param string $userUlid The ULID of the user.
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public static function getDetailAccount($userUlid)
    {
        // Use the Eloquent ORM to fetch the user with roles
        // Note: Eager loading is employed to retrieve roles along with the user in a more efficient manner
        return User::where('id', $userUlid)->with('roles')->first();
    }
}
