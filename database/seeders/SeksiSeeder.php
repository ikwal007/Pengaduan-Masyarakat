<?php

namespace Database\Seeders;

use App\Models\Seksi;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class SeksiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $datas = [
            (object) [
                'name' => 'seksi survei dan pemetaan',
            ],
            (object) [
                'name' => 'seksi penetapan hak dan pendaftaran',
            ],
            (object) [
                'name' => 'seksi penataan dan pemberdayaan',
            ],
            (object) [
                'name' => 'seksi pengadaan tanah dan pengembangan',
            ],
            (object) [
                'name' => 'seksi pengendalian dan penanganan sengketa',
            ],
        ];

        foreach ($datas as $data) {
            $seksi = new Seksi();
            $seksi->name = $data->name;
            $seksi->slug = Str::slug($data->name);
            $seksi->save();
        }
    }
}
