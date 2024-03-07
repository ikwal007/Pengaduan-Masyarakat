<?php

namespace Database\Seeders;

use App\Models\ComplaintType;
use App\Models\Seksi;
use App\Queries\SeksiQuery;
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
        ];

        foreach ($datas as $data) {
            $complaintType = new ComplaintType();
            $complaintType->name = $data->name;
            $complaintType->description = $data->description;
            $complaintType->slug = Str::slug($data->name);
            $complaintType->save();


            if ($complaintType->slug === "pengajuan-sengketa-tanah") {
                $seksi = new SeksiQuery();
                $idSeksi = $seksi->getSpesificIdSeksi('seksi-pengendalian-dan-penanganan-sengketa');
                $complaintType->seksis()->attach($idSeksi);
            }

            if ($complaintType->slug === "pengajuan-buat-sertifikat") {
                $seksi = new SeksiQuery();
                $idSeksi = $seksi->getSpesificIdSeksi('seksi-penetapan-hak-dan-pendaftaran');
                $complaintType->seksis()->attach($idSeksi);
            }
        }
    }
}
