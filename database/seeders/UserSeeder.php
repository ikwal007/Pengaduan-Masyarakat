<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        $admin = User::create([
            'full_name' => 'Super Admin',
            'email' => 'superadmin@adminsuper.com',
            'phone_number' => $faker->phoneNumber,
            'password' => Hash::make('adminsuper')
        ]);

        $pelayananPubliks = [
            [
                'full_name' => 'Pelayanan 1',
                'email' => 'pelayanan1@pelayanan.com',
                'phone_number' => $faker->phoneNumber,
                'password' => Hash::make('password')
            ],
            [
                'full_name' => 'Pelayanan 2',
                'email' => 'pelayanan2@pelayanan.com',
                'phone_number' => $faker->phoneNumber,
                'password' => Hash::make('password')
            ],
            [
                'full_name' => 'Pelayanan 3',
                'email' => 'pelayanan3@pelayanan.com',
                'phone_number' => $faker->phoneNumber,
                'password' => Hash::make('password')
            ],
        ];

        $masyarakat = [
            [
                'full_name' => 'junaidi bahar',
                'email' => 'junaidi@masyarakat.co.ac',
                'phone_number' => $faker->phoneNumber,
                'password' => Hash::make('password')
            ],
            [
                'full_name' => 'sulisiati',
                'email' => 'sulisiati@masyarakat.co.ac',
                'phone_number' => $faker->phoneNumber,
                'password' => Hash::make('password')
            ],
        ];

        $seksiUsers = [
            [
                'full_name' => 'seksi survei dan pemetaan',
                'email' => 'ssdp@seksi.com',
                'phone_number' => $faker->phoneNumber,
                'password' => Hash::make('password')
            ],
            [
                'full_name' => 'seksi penetapan hak dan pendaftaran',
                'email' => 'sphdp@seksi.com',
                'phone_number' => $faker->phoneNumber,
                'password' => Hash::make('password')
            ],
            [
                'full_name' => 'seksi penataan dan pemberdayaan',
                'email' => 'spdp@seksi.com',
                'phone_number' => $faker->phoneNumber,
                'password' => Hash::make('password')
            ],
            [
                'full_name' => 'seksi pengadaan tanah dan pengembangan',
                'email' => 'sptdp@seksi.com',
                'phone_number' => $faker->phoneNumber,
                'password' => Hash::make('password')
            ],
            [
                'full_name' => 'seksi pengendalian dan penanganan sengketa',
                'email' => 'spdps@seksi.com',
                'phone_number' => $faker->phoneNumber,
                'password' => Hash::make('password')
            ],
        ];

        foreach ($pelayananPubliks as $pelayananPublik) {
            $pelayananPublik = User::create($pelayananPublik);
            $pelayananPublik->assignRole('Pelayanan_Publik');
        }

        foreach ($seksiUsers as $seksiData) {
            $seksiUser = User::create($seksiData);
            $seksiUser->assignRole('Seksi');
        }
        
        foreach ($masyarakat as $masyarakatData) {
            $seksiUser = User::create($masyarakatData);
            $seksiUser->assignRole('Masyarakat');
        }

        $admin->assignRole('Super_Admin');
    }
}
