import { usePage } from "@inertiajs/react";
import { useEffect, useRef } from "react";
import GlobalLink from "../Atoms/GlobalLink";
import { IoHomeOutline } from "react-icons/io5";
import { MdAdd, MdCreate } from "react-icons/md";
import Typography from "../Atoms/Typography";

const Aside = () => {
    const { auth } = usePage().props;
    return (
        <aside className="fixed inset-y-0 z-20 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-white dark:bg-gray-800 md:hidden transition ease-in-out duration-150 opacity-100 transform -translate-x-5">
            <div className="py-4 text-gray-500 dark:text-gray-400">
                <GlobalLink theme="transparent" href="#" className="hover:bg-transparent active:bg-transparent focus:bg-transparent">
                    <Typography tag="span" className="ml-4 text-lg font-bold">
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
                            {route().current("pelayanan.create-complaint") ? (
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
                            {route().current("complaint.*") &&
                            !route().current("complaint.create") ? (
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
                            <Typography tag="span" className="ml-4" theme="primary">
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
    );
};

export default Aside;
