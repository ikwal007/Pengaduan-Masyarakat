<?php

namespace Database\Seeders;

use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use App\Models\ComplaintMediaType;

class ComplaintMediaTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $datas = [
            (object) [
                'name' => 'Google Form',
                'description' => 'Google Form adalah pengaduan yang dibuat melalui aplikasi Google Form.',
            ],
            (object) [
                'name' => 'Sentuh Tanahku',
                'description' => 'Sentuh Tanahku adalah pengaduan yang dibuat melalui aplikasi Sentuh Tanahku.',
            ],
            (object) [
                'name' => 'WhatsApp',
                'description' => 'WhatsApp adalah pengaduan yang dibuat melalui aplikasi WhatsApp.',
            ],
            (object) [
                'name' => 'Langsung',
                'description' => 'Langsung adalah pengaduan yang dibuat secara sendiri melalui web site atau datang ke kantor terdekat.',
            ],
        ];

        foreach ($datas as $data) {
            $complaintStatus = new ComplaintMediaType();
            $complaintStatus->name = $data->name;
            $complaintStatus->description = $data->description;
            $complaintStatus->slug = Str::slug($data->name);
            $complaintStatus->save();
        }
    }
}
