<?php

namespace Database\Seeders;

use App\Models\Subdistrict;
use App\Models\Village;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VillageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $idKecamatanBaiturrahman = Subdistrict::where('name', 'Kecamatan Baiturrahman')->value('id');
        $idKecamatanBandaRaya = Subdistrict::where('name', 'Kecamatan Banda Raya')->value('id');
        $idkecamatanMeuraxa = Subdistrict::where('name', 'Kecamatan Meuraxa')->value('id');
        $idKecamatanJayaBaru = Subdistrict::where('name', 'Kecamatan Jaya Baru')->value('id');
        $idKecamatanLuengBata = Subdistrict::where('name', 'Kecamatan Lueng Bata')->value('id');
        $idKecamatanKutaAlam = Subdistrict::where('name', 'Kecamatan Kuta Alam')->value('id');
        $idKecamatanKutaRaja = Subdistrict::where('name', 'Kecamatan Kuta Raja')->value('id');
        $idKecamatanSyiahKuala = Subdistrict::where('name', 'Kecamatan Syiah Kuala')->value('id');
        $idKecamatanUleeKareng = Subdistrict::where('name', 'Kecamatan Ulee Kareng')->value('id');

        Village::create([
            'name' => 'Kelurahan/Desa Ateuk Pahlawan',
            'subdistrict_id' => $idKecamatanBaiturrahman
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Peuniti',
            'subdistrict_id' => $idKecamatanBaiturrahman
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Kampung Baru',
            'subdistrict_id' => $idKecamatanBaiturrahman
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Neusu Jaya',
            'subdistrict_id' => $idKecamatanBaiturrahman
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Seutui',
            'subdistrict_id' => $idKecamatanBaiturrahman
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Sukaramai',
            'subdistrict_id' => $idKecamatanBaiturrahman
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Ateuk Deah Tanoh',
            'subdistrict_id' => $idKecamatanBaiturrahman
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Ateuk Munjeng',
            'subdistrict_id' => $idKecamatanBaiturrahman
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Neusu Aceh',
            'subdistrict_id' => $idKecamatanBaiturrahman
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Ateuk Jawo',
            'subdistrict_id' => $idKecamatanBaiturrahman
        ]);



        Village::create([
            'name' => 'Kelurahan/Desa Lam Ara',
            'subdistrict_id' => $idKecamatanBandaRaya
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Lampuot',
            'subdistrict_id' => $idKecamatanBandaRaya
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Lhong Cut',
            'subdistrict_id' => $idKecamatanBandaRaya
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Lhong Raya',
            'subdistrict_id' => $idKecamatanBandaRaya
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Mibo',
            'subdistrict_id' => $idKecamatanBandaRaya
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Peunyeurat',
            'subdistrict_id' => $idKecamatanBandaRaya
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Geuceu Iniem',
            'subdistrict_id' => $idKecamatanBandaRaya
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Geuceu Kayee Jato',
            'subdistrict_id' => $idKecamatanBandaRaya
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Geuceu Komplek',
            'subdistrict_id' => $idKecamatanBandaRaya
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Lam Lagang',
            'subdistrict_id' => $idKecamatanBandaRaya
        ]);



        Village::create([
            'name' => 'Kelurahan/Desa Lamtemen Barat',
            'subdistrict_id' => $idKecamatanJayaBaru
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Lamtemen Timur',
            'subdistrict_id' => $idKecamatanJayaBaru
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Punge Blang Cut',
            'subdistrict_id' => $idKecamatanJayaBaru
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Bitai',
            'subdistrict_id' => $idKecamatanJayaBaru
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Lamjamee',
            'subdistrict_id' => $idKecamatanJayaBaru
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Lampoh Daya',
            'subdistrict_id' => $idKecamatanJayaBaru
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Ulee Pata',
            'subdistrict_id' => $idKecamatanJayaBaru
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Emperom',
            'subdistrict_id' => $idKecamatanJayaBaru
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Geuceu Meunara',
            'subdistrict_id' => $idKecamatanJayaBaru
        ]);



        Village::create([
            'name' => 'Kelurahan/Desa Kuta Alam',
            'subdistrict_id' => $idKecamatanKutaAlam
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Laksana',
            'subdistrict_id' => $idKecamatanKutaAlam
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Peunayong',
            'subdistrict_id' => $idKecamatanKutaAlam
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Mulia',
            'subdistrict_id' => $idKecamatanKutaAlam
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Beurawe',
            'subdistrict_id' => $idKecamatanKutaAlam
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Kota Baru',
            'subdistrict_id' => $idKecamatanKutaAlam
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Bandar Baru',
            'subdistrict_id' => $idKecamatanKutaAlam
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Keuramat (Kramat)',
            'subdistrict_id' => $idKecamatanKutaAlam
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Lampineung',
            'subdistrict_id' => $idKecamatanKutaAlam
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Lampriet',
            'subdistrict_id' => $idKecamatanKutaAlam
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Lambaro Skep',
            'subdistrict_id' => $idKecamatanKutaAlam
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Lamdingin',
            'subdistrict_id' => $idKecamatanKutaAlam
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Lampulo',
            'subdistrict_id' => $idKecamatanKutaAlam
        ]);



        Village::create([
            'name' => 'Kelurahan/Desa Gampong Jawa',
            'subdistrict_id' => $idKecamatanKutaRaja
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Gampong Pande',
            'subdistrict_id' => $idKecamatanKutaRaja
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Keudah',
            'subdistrict_id' => $idKecamatanKutaRaja
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Peulanggahan',
            'subdistrict_id' => $idKecamatanKutaRaja
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Lampaseh Kota',
            'subdistrict_id' => $idKecamatanKutaRaja
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Merduati',
            'subdistrict_id' => $idKecamatanKutaRaja
        ]);



        Village::create([
            'name' => 'Kelurahan/Desa Lam Dom (Landom)',
            'subdistrict_id' => $idKecamatanLuengBata
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Batoh',
            'subdistrict_id' => $idKecamatanLuengBata
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Cot Mesjid',
            'subdistrict_id' => $idKecamatanLuengBata
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Lamseupeung',
            'subdistrict_id' => $idKecamatanLuengBata
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Lueng Bata',
            'subdistrict_id' => $idKecamatanLuengBata
        ]);
        Village::create([
            'name' => ' Kelurahan/Desa Panteriek',
            'subdistrict_id' => $idKecamatanLuengBata
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Blang Cut',
            'subdistrict_id' => $idKecamatanLuengBata
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Lampaloh',
            'subdistrict_id' => $idKecamatanLuengBata
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Sukadamai',
            'subdistrict_id' => $idKecamatanLuengBata
        ]);


        Village::create([
            'name' => 'Kelurahan/Desa Lampaseh Aceh',
            'subdistrict_id' => $idkecamatanMeuraxa
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Punge Jurong',
            'subdistrict_id' => $idkecamatanMeuraxa
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Alue Deah Teungoh',
            'subdistrict_id' => $idkecamatanMeuraxa
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Deah Baro',
            'subdistrict_id' => $idkecamatanMeuraxa
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Deah Glumpang',
            'subdistrict_id' => $idkecamatanMeuraxa
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Blang Oi',
            'subdistrict_id' => $idkecamatanMeuraxa
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Cot Lamkuweueh',
            'subdistrict_id' => $idkecamatanMeuraxa
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Gampong Pie',
            'subdistrict_id' => $idkecamatanMeuraxa
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Lambung',
            'subdistrict_id' => $idkecamatanMeuraxa
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Punge Ujong',
            'subdistrict_id' => $idkecamatanMeuraxa
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Asoi Nanggro',
            'subdistrict_id' => $idkecamatanMeuraxa
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Gampong Baro',
            'subdistrict_id' => $idkecamatanMeuraxa
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Gampong Blang',
            'subdistrict_id' => $idkecamatanMeuraxa
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Lamjabat',
            'subdistrict_id' => $idkecamatanMeuraxa
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Surien',
            'subdistrict_id' => $idkecamatanMeuraxa
        ]);


        Village::create([
            'name' => 'Kelurahan/Desa Kopelma Darussalam',
            'subdistrict_id' => $idKecamatanSyiahKuala
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Rukoh',
            'subdistrict_id' => $idKecamatanSyiahKuala
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Jeulingke',
            'subdistrict_id' => $idKecamatanSyiahKuala
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Tibang',
            'subdistrict_id' => $idKecamatanSyiahKuala
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Lamgugob',
            'subdistrict_id' => $idKecamatanSyiahKuala
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Alue Naga',
            'subdistrict_id' => $idKecamatanSyiahKuala
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Deah Raya',
            'subdistrict_id' => $idKecamatanSyiahKuala
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Gampong Peurada',
            'subdistrict_id' => $idKecamatanSyiahKuala
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Iemasen Kaye Adang',
            'subdistrict_id' => $idKecamatanSyiahKuala
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Pineung',
            'subdistrict_id' => $idKecamatanSyiahKuala
        ]);



        Village::create([
            'name' => 'Kelurahan/Desa Ceurih',
            'subdistrict_id' => $idKecamatanUleeKareng
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Doi/Doy',
            'subdistrict_id' => $idKecamatanUleeKareng
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Iemasen Ulee Kareng',
            'subdistrict_id' => $idKecamatanUleeKareng
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Lamglumpang',
            'subdistrict_id' => $idKecamatanUleeKareng
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Lambhuk',
            'subdistrict_id' => $idKecamatanUleeKareng
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Lamteh',
            'subdistrict_id' => $idKecamatanUleeKareng
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Ilie',
            'subdistrict_id' => $idKecamatanUleeKareng
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Pango Deah',
            'subdistrict_id' => $idKecamatanUleeKareng
        ]);
        Village::create([
            'name' => 'Kelurahan/Desa Pango Raya',
            'subdistrict_id' => $idKecamatanUleeKareng
        ]);
    }
}
