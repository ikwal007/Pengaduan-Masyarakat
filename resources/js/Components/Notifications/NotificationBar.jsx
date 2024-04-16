import { usePage } from "@inertiajs/react";
import { useEffect, useRef } from "react";
import GlobalLink from "../Atoms/GlobalLink";
import { IoHomeOutline } from "react-icons/io5";
import { MdAdd, MdClose, MdCreate } from "react-icons/md";
import Typography from "../Atoms/Typography";
import Button from "../Atoms/Button";

const NotificationBar = ({
    notificationsBarMenu,
    setNotificationsBarMenu,
    data,
}) => {
    const { content, title, user } = data;
    const { email, full_name } = user;
    return (
        <aside className="fixed inset-y-0 z-20 flex-shrink-0 w-64 md:w-96 mt-16 overflow-y-auto bg-white dark:bg-gray-800 transition ease-in-out duration-150 opacity-100 transform right-0">
            <div className="py-4 text-gray-500 dark:text-gray-400">
                <div className="flex items-center justify-between gap-3 px-4 ">
                    <Typography tag="span" className="ml-4 text-lg font-bold">
                        Deskripsi Notifikasi
                    </Typography>
                    <Button
                        maxWidth="max"
                        onClick={() =>
                            setNotificationsBarMenu(!notificationsBarMenu)
                        }
                        children={<MdClose className="w-5 h-5" />}
                    />
                </div>
                <div className="flex flex-wrap p-4 gap-2">
                    <div
                        tabIndex={0}
                        className="collapse collapse-arrow border border-base-300 bg-base-200"
                    >
                        <div className="collapse-title text-xl font-medium">
                            {title}
                        </div>
                        <div className="collapse-content">
                            <p>{content}</p>
                            <p>{full_name}</p>
                            <p>{email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default NotificationBar;
