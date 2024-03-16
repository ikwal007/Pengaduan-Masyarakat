import React from "react";
import { FaUserCircle } from "react-icons/fa";

const Profile = ({ children }) => {
    return (
        <div className="flex flex-col md:flex-row w-full bg-white dark:bg-gray-800 rounded-lg">
            {children}
        </div>
    );
};

const Foto = ({ src = null }) => {
    return (
        <section className="flex basis-1/3 mb-5 py-10 sm:py-16 lg:py-24">
            <div className="flex justify-center items-center w-full">
                {src ? (
                    <div className="avatar">
                        <div className="w-40 rounded-full ring ring-purple-500 ring-offset-base-100 ring-offset-2">
                            <img src={import.meta.env.VITE_APP_URL + src} />
                        </div>
                    </div>
                ) : (
                    <div className="avatar">
                        <div className="w-40 rounded-full ring ring-purple-500 ring-offset-base-100 ring-offset-2">
                            <FaUserCircle className="w-40 h-40 dark:text-purple-200" />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

const Detail = ({ children }) => {
    return (
        <section className="basis-1/2 mb-5 py-10 px-5 sm:py-16 lg:py-24">
            {children}
        </section>
    );
};

const Item = ({ title, data }) => {
    return (
        <div className="flex flex-wrap text-lg font-semibold text-gray-700 dark:text-gray-200">
            <h1>{title} : </h1>
            <h1>{data}</h1>
        </div>
    );
};

Profile.Foto = Foto;
Profile.Detail = Detail;
Profile.Item = Item;

export default Profile;
