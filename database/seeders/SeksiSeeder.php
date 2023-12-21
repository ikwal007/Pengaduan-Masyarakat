<?php

namespace Database\Seeders;

use App\Models\Seksi;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SeksiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Seksi::create([
            'name' => 'seksi survei dan pemetaan'
        ]);
        Seksi::create([
            'name' => 'seksi penetapan hak dan pendaftaran'
        ]);
        Seksi::create([
            'name' => 'seksi penataan dan pemberdayaan'
        ]);
        Seksi::create([
            'name' => 'seksi pengadaan tanah dan pengembangan'
        ]);
        Seksi::create([
            'name' => 'seksi pengendalian dan penanganan sengketa'
        ]);
    }
}
