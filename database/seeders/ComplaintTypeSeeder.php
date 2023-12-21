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
        ComplaintType::create([
            'id' => (string) Str::ulid(),
            'name' => 'pelayanan pertanahan',
            'description' => 'Pengaduan pelayanan pertanahan yang berkaitan dengan hak atas tanah dan keterkaitannya'
        ]);
        ComplaintType::create([
            'id' => (string) Str::ulid(),
            'name' => 'pelanggaran disiplin Pegawai Negeri Sipil',
            'description' => 'Pengaduan pelanggaran disiplin pegawai negeri sipil yang berkaitan dengan pelayanan di kantor atas ketidak puasan pelanggan'
        ]);
    }
}
