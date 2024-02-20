import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AuthenticatedLayout2 from "@/Layouts/AuthenticatedLayout2";
import { Head } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";

const Dashboard = () => {
    const { auth } = usePage().props;

    console.log('ini dashboard: ', auth);
    return (
        <>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            You're logged in!
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

Dashboard.layout = (page) => (
    <AuthenticatedLayout2
        title={`Dashboard Mengelola Profile Akun | Edit Password`}
    >
        {page}
    </AuthenticatedLayout2>
);

export default Dashboard;
