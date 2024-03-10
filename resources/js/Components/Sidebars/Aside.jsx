import { usePage } from "@inertiajs/react";
import { useEffect, useRef } from "react";
import GlobalLink from "../Atoms/GlobalLink";
import { IoHomeOutline } from "react-icons/io5";
import { MdCreate } from "react-icons/md";

const Aside = () => {
    const { auth } = usePage().props;
    return (
        <aside className="fixed inset-y-0 z-20 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-white dark:bg-gray-800 md:hidden transition ease-in-out duration-150 opacity-100 transform -translate-x-5">
            <div className="py-4 text-gray-500 dark:text-gray-400">
                <a
                    className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
                    href="#"
                >
                    Pengaduan Masyarakat
                </a>
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
                                className="justify-start"
                                href={route(
                                    "super-admin.dashboard-manages-worker-accounts-index"
                                )}
                            >
                                <IoHomeOutline className="w-5 h-5" />
                                <span className="ml-4">Dashboard</span>
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
                                <IoHomeOutline className="w-5 h-5" />
                                <span className="ml-4">Dashboard</span>
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
                                <MdCreate className="w-5 h-5" />
                                <span className="ml-4">Buat Pengaduan</span>
                            </GlobalLink>
                        </li>
                    </ul>
                )}
                {auth.user.role.name === "Masyarakat" && (
                    <ul className="mt-6">
                        <li className="relative px-6 py-3">
                            {route().current(
                                "complaint.*"
                            ) && !route().current("complaint.create") ? (
                                <span
                                    className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                                    aria-hidden="true"
                                />
                            ) : null}
                            <GlobalLink
                                theme="transparent"
                                className="justify-start"
                                href={route(
                                    "complaint.index"
                                )}
                            >
                                <IoHomeOutline className="w-5 h-5" />
                                <span className="ml-4">Dashboard</span>
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
                                <MdCreate className="w-5 h-5" />
                                <span className="ml-4">Buat Pengaduan</span>
                            </GlobalLink>
                        </li>
                    </ul>
                )}

                <div className="px-6 my-6">
                    <button className="flex items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                        Create account
                        <span className="ml-2" aria-hidden="true">
                            +
                        </span>
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Aside;
