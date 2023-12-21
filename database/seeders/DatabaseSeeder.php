<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\ComplaintMediaType;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            UserSeeder::class,
            ComplaintTypeSeeder::class,
            ComplaintMediaTypeSeeder::class,
            SeksiSeeder::class,
            SubdistrictSeeder::class,
            VillageSeeder::class,
        ]);
    }
}
