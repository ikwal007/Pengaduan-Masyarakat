import { IoMdArrowRoundBack } from "react-icons/io";
import GlobalLink from "@/Components/Atoms/GlobalLink";
import AuthenticatedLayout2 from "@/Layouts/AuthenticatedLayout2";
import FormBio from "@/Components/Molecules/Form/FormBio";
import FormEditPassword from "@/Components/Molecules/Form/FormEditPassword";

const Edit = () => {
    return (
        <>
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
                    <div className="px-4 py-3 mb-8 bg-whit rounded-lg shadow-md dark:bg-gray-800">
                        <FormBio />
                        <FormEditPassword />
                    </div>
                </div>
            </main>
        </>
    );
};

Edit.layout = (page) => (
    <AuthenticatedLayout2
        title={`Dashboard Mengelola Profile Akun | Edit Password`}
    >
        {page}
    </AuthenticatedLayout2>
);

export default Edit;
