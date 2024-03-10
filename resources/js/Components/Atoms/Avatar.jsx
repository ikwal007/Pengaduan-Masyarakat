import React from "react";
import { FaUser } from "react-icons/fa";

const Avatar = ({ src = null, maxWidth = "md" }) => {
    const {width, height} = {
        sm: {
            width: "w-6",
            height: "h-6",
        },
        md: {
            width: "w-12",
            height: "h-12",
        },
        lg: {
            width: "w-16",
            height: "h-16",
        },
        xl: {
            width: "w-24",
            height: "h-24",
        },
        full: {
            width: "w-full",
            height: "h-full",
        }
    }[maxWidth];
    return (
        <div className="avatar">
            <div className={`${height} rounded-full`}>
                {src ? (
                    <img src={src} />
                ) : (
                    <FaUser
                        className={`${width} ${height} text-purple-600`}
                    />
                )}
            </div>
        </div>
    );
};

export default Avatar;
