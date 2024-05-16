import { useEffect, useRef, useState } from "react";
import Aside from "../Sidebars/Aside";
import { usePage } from "@inertiajs/react";
import { FaRegUser } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";
import GlobalLink from "../Atoms/GlobalLink";
import Button from "../Atoms/Button";
import { IoMoonSharp, IoNotifications, IoSunny } from "react-icons/io5";
import Avatar from "../Atoms/Avatar";
import Typography from "../Atoms/Typography";
import NotificationBar from "../Notifications/NotificationBar";
import Pusher from "pusher-js";

const Header1 = () => {
    // state variables
    const [dark, setDark] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] =
        useState(false);
    const [notificationsBarMenu, setNotificationsBarMenu] = useState(false);
    const [isSideMenuOpenMobile, setIsSideMenuOpenMobile] = useState(false);
    const [showDetailNotification, setShowDetailNotification] = useState({});
    const [dataNotification, setDataNotification] = useState([]);

    const { auth } = usePage().props;

    // refs for profile and notifications menus
    const profileMenuRef = useRef(null);
    const notificationsMenuRef = useRef(null);
    const mobileMenuRef = useRef(null);

    const handlerFirstOpenNotification = async (id) => {
       const res = await axios.get(route("general.get-notification-update", [id, auth.user.email]));
       return res;
    };

    // Function to handle profile and notifications button clicks
    const handleButtonClick = async (button, dataDetailNotification) => {
        switch (button) {
            case "profile":
                setIsProfileMenuOpen(!isProfileMenuOpen);
                break;
            case "notifications":
                setIsNotificationsMenuOpen(!isNotificationsMenuOpen);
                break;
            case "notificationBar":
                if (dataDetailNotification.read === 0) {
                    await handlerFirstOpenNotification(dataDetailNotification.id);
                    setShowDetailNotification(dataDetailNotification);

                    setNotificationsBarMenu(!notificationsBarMenu);
                } else {
                    setShowDetailNotification(dataDetailNotification);
                    setNotificationsBarMenu(!notificationsBarMenu);
                }
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

    const handlerGetNotification = async () => {
        const res = await axios.get(route("general.get-notification-index"), {
            params: {
                email: auth.user.email,
            },
        });
        setDataNotification(res.data);
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

    useEffect(() => {
        handlerGetNotification();

        // Pusher.logToConsole = true;

        const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
            app_id: import.meta.env.VITE_PUSHER_APP_ID,
            secret: import.meta.env.VITE_PUSHER_APP_SECRET,
            cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
        });

        pusher
            .subscribe("notification-to-masyarakat")
            .bind("ComplaintRegister", function ({ email, notification }) {
                if (email === auth.user.email) {
                    setDataNotification(notification)
                }
            });

        return () => {
            pusher.unbind("ComplaintRegister");
            pusher.unsubscribe("notification-to-masyarakat");
            pusher.disconnect();
        };
    }, []);

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
                                    <ul className="absolute right-0 w-56 max-h-[400px] overflow-auto p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:text-gray-300 dark:border-gray-700 dark:bg-gray-700">
                                        {dataNotification.length > 0 ? (
                                            dataNotification.map((data, i) => (
                                                <li className="flex" key={i}>
                                                    <button
                                                        className="inline-flex items-center justify-between w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200 gap-1"
                                                        onClick={() =>
                                                            handleButtonClick(
                                                                "notificationBar",
                                                                data
                                                            )
                                                        }
                                                    >
                                                        <span>
                                                            {data.title}
                                                        </span>
                                                        {data.read === 0 ? (
                                                            <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-600 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-600">
                                                                New
                                                            </span>
                                                        ): null}
                                                    </button>
                                                </li>
                                            ))
                                        ) : (
                                            <li className="flex">
                                                <button className="inline-flex items-center justify-between w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200">
                                                    <span>
                                                        Tidak Ada Notifikasi
                                                        untuk saat ini
                                                    </span>
                                                </button>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            )}
                        </li>
                        {notificationsBarMenu && (
                            <NotificationBar
                                notificationsBarMenu={notificationsBarMenu}
                                data={showDetailNotification}
                                setNotificationsBarMenu={
                                    setNotificationsBarMenu
                                }
                            />
                        )}
                        {/* <!-- Profile menu --> */}
                        <li className="relative" ref={profileMenuRef}>
                            <Button
                                theme={"transparent"}
                                maxWidth="max"
                                onClick={() => handleButtonClick("profile")}
                            >
                                <Avatar maxWidth="sm" src={auth.user.avatar} />
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
                                                className="!justify-start group"
                                                href={`/profile/${auth.user.id}`}
                                            >
                                                <Typography
                                                    tag="span"
                                                    className="font-semibold"
                                                >
                                                    <FaRegUser className="w-4 h-4 mr-3" />
                                                </Typography>
                                                <Typography
                                                    tag="span"
                                                    className="font-semibold"
                                                >
                                                    Profile
                                                </Typography>
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
                                                <Typography
                                                    tag="span"
                                                    className="font-semibold"
                                                >
                                                    <TbLogout className="w-4 h-4 mr-3" />
                                                </Typography>
                                                <Typography
                                                    tag="span"
                                                    className="font-semibold"
                                                >
                                                    Logout
                                                </Typography>
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
