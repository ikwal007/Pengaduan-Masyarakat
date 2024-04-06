import GlobalLink from "@/Components/Atoms/GlobalLink";
import Typography from "@/Components/Atoms/Typography";
import Profile from "@/Components/Detail/DetailProfile";
import AuthenticatedLayout2 from "@/Layouts/AuthenticatedLayout2";
import { usePage } from "@inertiajs/react";
import { IoMdArrowRoundBack } from "react-icons/io";

const Show = () => {
    // Extract detailAccountData from usePage().props
    const { detailAccountData } = usePage().props;


    return (
        <>
            {/* Back button */}
            <div className="w-max p-2">
                <GlobalLink
                    href={route("super-admin.dashboard-manages-worker-accounts-index")}
                    className="flex items-center group"
                >
                    <IoMdArrowRoundBack />
                    <Typography theme="primary" tag="span">Kembali</Typography>
                </GlobalLink>
            </div>

            {/* Main content */}
            <main className="h-full pb-16 overflow-y-auto mt-5">
                <div className="container px-6 mx-auto grid">
                    <h4 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300 mt-3">
                        Data Pengguna
                    </h4>
                    <Profile>
                        <Profile.Foto src={detailAccountData.avatar} />
                        <Profile.Detail>
                            <Profile.Item
                                title="name"
                                data={detailAccountData.full_name}
                            />
                            <Profile.Item
                                title="Email"
                                data={detailAccountData.email}
                            />
                            <Profile.Item
                                title="Role"
                                data={detailAccountData.roles[0].name}
                            />
                            <Profile.Item
                                title="No Telp"
                                data={detailAccountData.phone_number}
                            />
                        </Profile.Detail>
                    </Profile>
                </div>
            </main>
        </>
    );
};

Show.layout = (page) => (
    <AuthenticatedLayout2 title={`Tampilan Detail Akun Pekerja`}>
        {page}
    </AuthenticatedLayout2>
);

export default Show;
