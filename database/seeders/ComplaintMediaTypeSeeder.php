<?php

namespace Database\Seeders;

use App\Models\ComplaintMediaType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ComplaintMediaTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ComplaintMediaType::create([
            'name' => 'Langsung',
            'description' => 'Langsung adalah pengaduan yang dibuat secara sendiri melalui web site atau datang ke kantor terdekat.',
        ]);
        ComplaintMediaType::create([
            'name' => 'WhatsApp',
            'description' => 'WhatsApp adalah pengaduan yang dibuat melalui aplikasi WhatsApp.',
        ]);
        ComplaintMediaType::create([
            'name' => 'Sentuh Tanahku',
            'description' => 'Sentuh Tanahku adalah pengaduan yang dibuat melalui aplikasi Sentuh Tanahku.',
        ]);
        ComplaintMediaType::create([
            'name' => 'Google Form',
            'description' => 'Google Form adalah pengaduan yang dibuat melalui aplikasi Google Form.',
        ]);
    }
}
