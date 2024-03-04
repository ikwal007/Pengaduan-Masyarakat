<?php

namespace Database\Seeders;

use App\Models\ComplaintType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ComplaintTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $datas = [
            (object) [
                'name' => 'pengajuan buat sertifikat',
                'description' => 'Pengaduan pelayanan pertanahan yang berkaitan dengan hak atas tanah dan keterkaitannya pada sertifikat tanah yang hilang, terbakar, atau kerusakan pada sertifikat tanah'
            ],
            (object) [
                'name' => 'pengajuan sengketa tanah',
                'description' => 'Pengaduan pelayanan pertanahan yang berkaitan dengan hak atas tanah dan keterkaitannya pada pengambilan tanah oleh orang atau prihal lain yang tidak bertanggung jawab dan melanggar hak atas tanah'
            ],
            (object) [
                'name' => 'pelanggaran disiplin Pegawai Negeri Sipil',
                'description' => 'Pengaduan pelanggaran disiplin pegawai negeri sipil yang berkaitan dengan pelayanan di kantor atas ketidak puasan pelanggan'
            ],
        ];

        foreach ($datas as $data) {
            $complaintStatus = new ComplaintType();
            $complaintStatus->name = $data->name;
            $complaintStatus->description = $data->description;
            $complaintStatus->slug = Str::slug($data->name);
            $complaintStatus->save();
        }
    }
}
