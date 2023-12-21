<?php

namespace Database\Seeders;

use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            'Super_Admin',
            'Pelayanan_Publik',
            'Seksi',
            'Masyarakat',
        ];

        foreach ($roles as $roleName) {
            $this->createRole($roleName);
        }
    }

    /**
     * Create a role with a ULID identifier.
     *
     * @param  string  $name
     * @return void
     */
    private function createRole(string $name): void
    {
        Role::create([
            'id' => (string) Str::ulid(),
            'name' => $name,
        ]);
    }
}
