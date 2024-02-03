import React from "react";

const Profile = ({ children }) => {
    return <div className="flex flex-col md:flex-row w-full">{children}</div>;
};

const Foto = ({ src }) => {
    return (
        <section className="flex basis-1/3 mb-5 py-10 sm:py-16 lg:py-24">
            <img
                className="object-cover w-32 h-32 mx-auto rounded-full"
                src={src}
                alt=""
            />
        </section>
    );
};

const Detail = ({ children }) => {
    return (
        <section className="basis-1/2 mb-5 py-10 sm:py-16 lg:py-24">
            {children}
        </section>
    );
};

const Item = ({ title, data }) => {
    return (
        <div className="flex text-lg font-semibold text-gray-700 dark:text-gray-200">
            <h1>{title} : </h1>
            <h1>{data}</h1>
        </div>
    );
};

Profile.Foto = Foto;
Profile.Detail = Detail;
Profile.Item = Item;

export default Profile;
