import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import GlobalLink from "../Atoms/GlobalLink";
import { MdAdd, MdCreate } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import Typography from "../Atoms/Typography";

/**
 * Desktop component representing the sidebar for desktop view.
 * @returns {JSX.Element} JSX representation of the component.
 */
const Desktop = () => {
    const { auth } = usePage().props;
    // State to manage the open/closed state of the side menu
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

    // State to manage the dynamic animation class based on the side menu state
    const [animationClass, setAnimationClass] = useState(
        "opacity-100 max-h-xl"
    );

    useEffect(() => {
        setAnimationClass(
            isSideMenuOpen ? "opacity-100 max-h-xl " : "opacity-25 max-h-0"
        );
    }, [isSideMenuOpen]);

    /**
     * Toggles the state of the side menu between open and closed.
     */
    const handleSideMenuOpen = () => {
        setIsSideMenuOpen(!isSideMenuOpen);
    };

    return (
        <>
            {/* Desktop sidebar  */}
            <aside className="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0">
                <div className="py-4 text-gray-500 dark:text-gray-400">
                    <GlobalLink theme="transparent" href="#" className="hover:bg-transparent active:bg-transparent focus:bg-transparent">
                        <Typography
                            tag="span"
                            className="ml-4 text-lg font-bold"
                        >
                            Pengaduan Masyarakat
                        </Typography>
                    </GlobalLink>
                    {auth.user.role.name === "Super_Admin" && (
                        <ul className="mt-6">
                            <li className="relative px-6 py-3">
                                {route().current(
                                    "super-admin.dashboard-manages-worker-accounts-index"
                                ) ||
                                route().current(
                                    "super-admin.dashboard-manages-worker-accounts-show"
                                ) ||
                                route().current(
                                    "super-admin.dashboard-manages-worker-accounts-edit-password"
                                ) ? (
                                    <span
                                        className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                                        aria-hidden="true"
                                    ></span>
                                ) : null}
                                <GlobalLink
                                    theme="transparent"
                                    className="justify-start"
                                    href={route(
                                        "super-admin.dashboard-manages-worker-accounts-index"
                                    )}
                                >
                                    <Typography tag="span">
                                        <IoHomeOutline className="w-5 h-5" />
                                    </Typography>
                                    <Typography tag="span" className="ml-4">
                                        Dashboard
                                    </Typography>
                                </GlobalLink>
                            </li>
                        </ul>
                    )}
                    {auth.user.role.name === "Pelayanan_Publik" && (
                        <ul className="mt-6">
                            <li className="relative px-6 py-3">
                                {route().current(
                                    "pelayanan.dashboard-complaints-index"
                                ) ? (
                                    <span
                                        className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                                        aria-hidden="true"
                                    />
                                ) : null}
                                <GlobalLink
                                    theme="transparent"
                                    className="justify-start"
                                    href={route(
                                        "pelayanan.dashboard-complaints-index"
                                    )}
                                >
                                    <Typography tag="span">
                                        <IoHomeOutline className="w-5 h-5" />
                                    </Typography>
                                    <Typography tag="span" className="ml-4">
                                        Dashboard
                                    </Typography>
                                </GlobalLink>
                            </li>
                            <li className="relative px-6 py-3">
                                {route().current(
                                    "pelayanan.complaint-verification-dashboard-*"
                                ) ? (
                                    <span
                                        className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                                        aria-hidden="true"
                                    />
                                ) : null}
                                <GlobalLink
                                    theme="transparent"
                                    className="flex flex-col justify-center"
                                    href={route(
                                        "pelayanan.complaint-verification-dashboard-index"
                                    )}
                                >
                                    <Typography tag="span">
                                        <IoHomeOutline className="w-5 h-5" />
                                    </Typography>
                                    <Typography tag="span" className="ml-4 pr-4">
                                        Dashboard Verifikasi Pengaduan
                                    </Typography>
                                </GlobalLink>
                            </li>
                            <li className="relative px-6 py-3">
                                {route().current(
                                    "pelayanan.create-complaint"
                                ) ? (
                                    <span
                                        className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                                        aria-hidden="true"
                                    />
                                ) : null}
                                <GlobalLink
                                    theme="transparent"
                                    className="justify-start"
                                    href={route("pelayanan.create-complaint")}
                                >
                                    <Typography tag="span">
                                        <MdCreate className="w-5 h-5" />
                                    </Typography>
                                    <Typography tag="span" className="ml-4">
                                        Buat Pengaduan
                                    </Typography>
                                </GlobalLink>
                            </li>
                        </ul>
                    )}
                    {auth.user.role.name === "Masyarakat" && (
                        <ul className="mt-6">
                            <li className="relative px-6 py-3">
                                {route().current("complaint.index") ? (
                                    <span
                                        className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                                        aria-hidden="true"
                                    />
                                ) : null}
                                <GlobalLink
                                    theme="transparent"
                                    className="justify-start"
                                    href={route("complaint.index")}
                                >
                                    <Typography tag="span">
                                        <IoHomeOutline className="w-5 h-5" />
                                    </Typography>
                                    <Typography tag="span" className="ml-4">
                                        Dashboard
                                    </Typography>
                                </GlobalLink>
                            </li>
                            <li className="relative px-6 py-3">
                                {route().current("complaint.create") ? (
                                    <span
                                        className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                                        aria-hidden="true"
                                    />
                                ) : null}
                                <GlobalLink
                                    theme="transparent"
                                    className="justify-start"
                                    href={route("complaint.create")}
                                >
                                    <Typography tag="span">
                                        <MdCreate className="w-5 h-5" />
                                    </Typography>
                                    <Typography tag="span" className="ml-4">
                                        Buat Pengaduan
                                    </Typography>
                                </GlobalLink>
                            </li>
                        </ul>
                    )}
                    {auth.user.role.name === "Seksi" && (
                        <ul className="mt-6">
                            <li className="relative px-6 py-3">
                                {route().current("complaint-handling.index") ? (
                                    <span
                                        className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                                        aria-hidden="true"
                                    />
                                ) : null}
                                <GlobalLink
                                    theme="transparent"
                                    className="justify-start"
                                    href={route("complaint-handling.index")}
                                >
                                    <Typography tag="span">
                                        <IoHomeOutline className="w-5 h-5" />
                                    </Typography>
                                    <Typography tag="span" className="ml-4">
                                        Dashboard
                                    </Typography>
                                </GlobalLink>
                            </li>
                        </ul>
                    )}

                    {auth.user.role.name === "Pelayanan_Publik" && (
                        <div className="px-6 my-6 flex items-center">
                            <GlobalLink
                                href={route("pelayanan.create_user")}
                                height="sm"
                                className="h-max"
                            >
                                <Typography tag="span" className="ml-2" theme="primary">
                                    Create User Account
                                </Typography>
                                <Typography tag="span" theme="primary">
                                    <MdAdd className="w-5 h-5" />
                                </Typography>
                            </GlobalLink>
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
};

export default Desktop;
