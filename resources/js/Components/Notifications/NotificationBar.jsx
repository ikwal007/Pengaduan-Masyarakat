import { MdClose, MdDeleteForever } from "react-icons/md";
import Typography from "../Atoms/Typography";
import Button from "../Atoms/Button";

const NotificationBar = ({
    notificationsBarMenu,
    setNotificationsBarMenu,
    handlerGetNotification,
    data,
}) => {
    const { content, title, user, id } = data;
    const { email, full_name } = user;

    const handlerDeleteNotification = async () => {
        const res = await fetch(
            route("general.get-notification-destroy", { id: id }),
            {
                method: "DELETE",
            }
        )
            .then((res) => res.json())
            .catch((err) => console.log(err));

        if (res.status === 200) {
            setNotificationsBarMenu(!notificationsBarMenu);
            handlerGetNotification();
        }
    };
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
                <div className="flex items-center justify-between gap-3 px-4 ">
                    <Button
                        maxWidth="max"
                        theme="danger"
                        onClick={handlerDeleteNotification}
                        children={
                            <div className="flex items-center gap-2">
                                <Typography
                                    tag="span"
                                    theme="primary"
                                    className="ml-4 text-lg font-bold"
                                >
                                    Hapus Notifikasi
                                </Typography>
                                <MdDeleteForever className="w-6 h-6" />
                            </div>
                        }
                    />
                </div>
            </div>
        </aside>
    );
};

export default NotificationBar;
