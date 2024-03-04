<?php

namespace Database\Seeders;

use App\Models\ComplaintStatus;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ComplaintStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statuses = [
            (object) [
                'name' => 'Diproses',
                'description' => 'pengaduan sedang diproses oleh tim seksi'
            ],
            (object) [
                'name' => 'Ditunda',
                'description' => 'pengaduan sedang ditunda oleh tim seksi' 
            ],
            (object) [
                'name' => 'Diselesaikan',
                'description' => 'pengaduan sudah diselesaikan oleh tim seksi' 
            ],
            (object) [
                'name' => 'Ditolak',
                'description' => 'pengaduan sudah ditolak oleh tim seksi' 
            ],
        ];
        
        foreach ($statuses as $status) {
            $complaintStatus = new ComplaintStatus();
            $complaintStatus->name = $status->name;
            $complaintStatus->description = $status->description;
            $complaintStatus->slug = Str::slug($status->name);
            $complaintStatus->save();
        }
    }
}
