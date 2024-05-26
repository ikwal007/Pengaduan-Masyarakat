import { useEffect } from "react";

const useRefreshLook = (complaintId, userId) => {
    useEffect(() => {
        // Fungsi untuk memperbarui waktu kuncian
        const refreshLock = async () => {
            try {
                const response = await fetch(
                    route("pelayanan.complaints-refresh-lock", {
                        id: complaintId,
                        user: userId,
                    }),
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        // Set interval untuk memperbarui waktu kuncian setiap 30 detik
        const intervalId = setInterval(refreshLock, 30000);

        // Membersihkan interval saat komponen di-unmount
        return () => clearInterval(intervalId);
    }, []);
};

export default useRefreshLook;
