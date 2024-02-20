import GlobalLink from "@/Components/Atoms/GlobalLink";
import Profile from "@/Components/Detail/DetailProfile";
import Notif1 from "@/Components/Notifications/Notif1";
import AuthenticatedLayout2 from "@/Layouts/AuthenticatedLayout2";
import { usePage } from "@inertiajs/react";
import { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

const Show = () => {
    const { auth, flash } = usePage().props;

    const [show, setShow] = useState(true);
    return (
        <>
            {flash.message && show && (
                <Notif1 message={flash.message} show={show} setShow={setShow} />
            )}
            <div className="w-max p-2">
                <GlobalLink
                    href="/super-admin/dashboard-manages-worker-accounts"
                    className="flex items-center group"
                >
                    <IoMdArrowRoundBack />
                    <span>Kembali</span>
                </GlobalLink>
            </div>
            <main className="h-full pb-16 overflow-y-auto mt-5">
                <div className="container px-6 mx-auto grid">
                    <h4 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
                        Form Data Pengguna
                    </h4>
                    <Profile>
                        <Profile.Foto src={import.meta.env.VITE_APP_URL+auth.user.avatar} />
                        <Profile.Detail>
                            <Profile.Item
                                title="name"
                                data={auth.user.full_name}
                            />
                            <Profile.Item
                                title="Email"
                                data={auth.user.email}
                            />
                            <Profile.Item
                                title="Role"
                                data={auth.user.role.name}
                            />
                            <Profile.Item
                                title="No Telp"
                                data={auth.user.phone_number}
                            />
                            <GlobalLink
                                href={`/profile/${auth.user.id}/edit`}
                                theme={"primary"}
                                className="mt-4"
                                maxWidth="max"
                            >
                                <span>Edit Profile</span>
                            </GlobalLink>
                        </Profile.Detail>
                    </Profile>
                </div>
            </main>
        </>
    );
};

Show.layout = (page) => (
    <AuthenticatedLayout2 title={`Profile User`}>{page}</AuthenticatedLayout2>
);

export default Show;
