<?php

namespace Database\Seeders;

use App\Models\Subdistrict;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubdistrictSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Subdistrict::create([
            'name' => 'Kecamatan Meuraxa'
        ]);
        Subdistrict::create([
            'name' => 'Kecamatan Jaya Baru'
        ]);
        Subdistrict::create([
            'name' => 'Kecamatan Banda Raya'
        ]);
        Subdistrict::create([
            'name' => 'Kecamatan Baiturrahman'
        ]);
        Subdistrict::create([
            'name' => 'Kecamatan Lueng Bata'
        ]);
        Subdistrict::create([
            'name' => 'Kecamatan Kuta Alam'
        ]);
        Subdistrict::create([
            'name' => 'Kecamatan Kuta Raja'
        ]);
        Subdistrict::create([
            'name' => 'Kecamatan Syiah Kuala'
        ]);
        Subdistrict::create([
            'name' => 'Kecamatan Ulee Kareng'
        ]);
    }
}
