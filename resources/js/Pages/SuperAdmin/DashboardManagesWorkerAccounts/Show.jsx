import GlobalLink from "@/Components/Atoms/GlobalLink";
import Profile from "@/Components/Detail/DetailProfile";
import AuthenticatedLayout2 from "@/Layouts/AuthenticatedLayout2";
import { usePage } from "@inertiajs/react";
import { IoMdArrowRoundBack } from "react-icons/io";

const Show = () => {
    const { detailAccountData } = usePage().props;
    console.log(detailAccountData);

    const listRoles = (roles) => {
        const nameRole = roles.map((role) => role.name);
        return nameRole.join(", ");
    };
    return (
        <>
            <div className="w-max p-2">
                <GlobalLink
                    href="/super-admin/dashboard-manages-worker-accounts"
                    className="flex items-center group"
                >
                    <GlobalLink.Icon children={<IoMdArrowRoundBack />} />
                    <GlobalLink.Title children={"Kembali"} />
                </GlobalLink>
            </div>
            <Profile>
                <Profile.Foto src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/4/avatar.jpg" />
                <Profile.Detail>
                    <Profile.Item title="name" data={detailAccountData.full_name} />
                    <Profile.Item title="Email" data={detailAccountData.email} />
                    <Profile.Item title="Role" data={listRoles(detailAccountData.roles)} />
                    <Profile.Item title="No Telp" data={detailAccountData.phone_number} />
                </Profile.Detail>
            </Profile>
        </>
    );
};

Show.layout = (page) => (
    <AuthenticatedLayout2 title={`Show Details Worker Accounts`}>
        {page}
    </AuthenticatedLayout2>
);

export default Show;
