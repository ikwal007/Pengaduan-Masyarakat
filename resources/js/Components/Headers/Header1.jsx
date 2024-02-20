import { useEffect, useRef, useState } from "react";
import Aside from "../Sidebars/Aside";
import { usePage } from "@inertiajs/react";
import { FaRegUser } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";
import GlobalLink from "../Atoms/GlobalLink";
import Button from "../Atoms/Button";
import { IoMoonSharp, IoNotifications, IoSunny } from "react-icons/io5";

const Header1 = () => {
    // state variables
    const [dark, setDark] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] =
        useState(false);
    const [isSideMenuOpenMobile, setIsSideMenuOpenMobile] = useState(false);

    const { auth } = usePage().props;

    // refs for profile and notifications menus
    const profileMenuRef = useRef(null);
    const notificationsMenuRef = useRef(null);
    const mobileMenuRef = useRef(null);

    // Function to handle profile and notifications button clicks
    const handleButtonClick = (button) => {
        switch (button) {
            case "profile":
                setIsProfileMenuOpen(!isProfileMenuOpen);
                break;
            case "notifications":
                setIsNotificationsMenuOpen(!isNotificationsMenuOpen);
                break;

            default:
                setIsSideMenuOpenMobile(!isSideMenuOpenMobile);
                break;
        }
    };

    // Function to handle dark mode toggle
    const toggleDarkMode = () => {
        setDark((prevDark) => !prevDark);

        document.documentElement.classList.toggle("dark");
    };

    // Function to handle clicks outside of menus, and close them if necessary
    const handleClickOutside = (event) => {
        // Close profile menu if clicked outside
        if (
            profileMenuRef.current &&
            !profileMenuRef.current.contains(event.target)
        ) {
            setIsProfileMenuOpen(false);
        }
        // Close notifications menu if clicked outside
        if (
            notificationsMenuRef.current &&
            !notificationsMenuRef.current.contains(event.target)
        ) {
            setIsNotificationsMenuOpen(false);
        }
        // Close notifications menu if clicked outside
        if (
            mobileMenuRef.current &&
            !mobileMenuRef.current.contains(event.target)
        ) {
            setIsSideMenuOpenMobile(false);
        }
    };

    // Effect to add or remove click outside listener based on menu visibility
    useEffect(() => {
        if (
            isProfileMenuOpen ||
            isNotificationsMenuOpen ||
            isSideMenuOpenMobile
        ) {
            document.addEventListener("click", handleClickOutside);
        } else {
            document.removeEventListener("click", handleClickOutside);
        }

        // Cleanup: remove the event listener when component unmounts or dependencies change
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isProfileMenuOpen, isNotificationsMenuOpen, isSideMenuOpenMobile]);

    // JSX structure for the header
    return (
        <>
            <header className="z-10 py-4 bg-white shadow-md dark:bg-gray-800">
                <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
                    {/* <!-- Mobile hamburger --> */}
                    <div ref={mobileMenuRef}>
                        <button
                            className="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple"
                            aria-label="Menu"
                            onClick={() => handleButtonClick("sideMenu")}
                        >
                            <svg
                                className="w-6 h-6"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </button>

                        {isSideMenuOpenMobile && (
                            <>
                                {/* aside */}
                                <Aside />
                            </>
                        )}
                    </div>
                    <ul className="flex items-center flex-shrink-0 space-x-6">
                        {/* <!-- Theme toggler --> */}
                        <li className="flex">
                            <Button
                                theme={"transparent"}
                                className={"group"}
                                aria-label="Toggle color mode"
                                onClick={toggleDarkMode}
                            >
                                {dark ? (
                                    <div>
                                        <IoSunny className="w-5 h-5 text-purple-600 group-hover:text-purple-500" />
                                    </div>
                                ) : (
                                    <div>
                                        <IoMoonSharp className="w-5 h-5 text-purple-600 group-hover:text-purple-500" />
                                    </div>
                                )}
                            </Button>
                        </li>
                        {/* <!-- Notifications menu --> */}
                        <li className="relative" ref={notificationsMenuRef}>
                            <Button
                                theme={"transparent"}
                                aria-label="Notifications"
                                className={"group"}
                                aria-haspopup="true"
                                onClick={() =>
                                    handleButtonClick("notifications")
                                }
                            >
                                <IoNotifications className="w-5 h-5 text-purple-600 group-hover:text-purple-500" />
                                {/* <!-- Notification badge --> */}
                                <span className="absolute flex h-3 w-3 top-1 right-4">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-gray-500 border-2 border-white"></span>
                                </span>
                            </Button>
                            {isNotificationsMenuOpen && (
                                <div>
                                    <ul
                                        x-transition:leave="transition ease-in duration-150"
                                        x-transition:leave-start="opacity-100"
                                        x-transition:leave-end="opacity-0"
                                        className="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:text-gray-300 dark:border-gray-700 dark:bg-gray-700"
                                    >
                                        <li className="flex">
                                            <a
                                                className="inline-flex items-center justify-between w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                                                href="#"
                                            >
                                                <span>Messages</span>
                                                <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-600 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-600">
                                                    13
                                                </span>
                                            </a>
                                        </li>
                                        <li className="flex">
                                            <a
                                                className="inline-flex items-center justify-between w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                                                href="#"
                                            >
                                                <span>Sales</span>
                                                <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-600 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-600">
                                                    2
                                                </span>
                                            </a>
                                        </li>
                                        <li className="flex">
                                            <a
                                                className="inline-flex items-center justify-between w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                                                href="#"
                                            >
                                                <span>Alerts</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </li>
                        {/* <!-- Profile menu --> */}
                        <li className="relative" ref={profileMenuRef}>
                            <Button
                                theme={"transparent"}
                                maxWidth="2xl"
                                onClick={() => handleButtonClick("profile")}
                            >
                                <img
                                    className="object-cover w-8 h-8 rounded-full"
                                    src="https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=aa3a807e1bbdfd4364d1f449eaa96d82"
                                    alt=""
                                    aria-hidden="true"
                                />
                            </Button>
                            {isProfileMenuOpen && (
                                <div>
                                    <ul
                                        className="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:border-gray-700 dark:text-gray-300 dark:bg-gray-700"
                                        aria-label="submenu"
                                    >
                                        <li className="flex">
                                            <GlobalLink
                                                theme={"transparent"}
                                                className="!justify-start"
                                                href={`/profile/${auth.user.id}`}
                                            >
                                                <FaRegUser className="w-4 h-4 mr-3" />
                                                <span className="font-semibold">
                                                    Profile
                                                </span>
                                            </GlobalLink>
                                        </li>
                                        <li className="flex">
                                            <GlobalLink
                                                maxWidth="full"
                                                href={route("logout")}
                                                method="post"
                                                as="button"
                                                theme={"transparent"}
                                                className="!justify-start"
                                            >
                                                <TbLogout className="w-4 h-4 mr-3" />
                                                <span>Logout</span>
                                            </GlobalLink>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </li>
                    </ul>
                </div>
            </header>
        </>
    );
};

export default Header1;
