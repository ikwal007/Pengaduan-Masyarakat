
export default function DateConverter(date) {

    // Buat objek Date dari string
    const newDate = new Date(date);

    // Format tanggal dan waktu menjadi format yang lebih terbaca
    const formattedDate = newDate.toLocaleString("id-ID", {
        weekday: "long", // Nama hari (Senin, Selasa, dll)
        year: "numeric", // Tahun lengkap (2024)
        month: "long", // Nama bulan (Mei)
        day: "numeric", // Tanggal (17)
        hour: "2-digit", // Jam (08)
        minute: "2-digit", // Menit (03)
        second: "2-digit", // Detik (55)
        timeZoneName: "short", // Zona waktu (WIB)
    });

    return formattedDate
}
