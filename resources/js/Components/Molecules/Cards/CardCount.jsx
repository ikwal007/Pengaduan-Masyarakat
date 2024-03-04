import Typography from "@/Components/Atoms/Typography";
import React from "react";

const themeColors = {
    primary: {
        text: "text-purple-500",
        background: "bg-purple-100",
        darkText: "dark:text-purple-100",
        darkBackground: "dark:bg-purple-500",
    },
    warning: {
        text: "text-orange-500",
        background: "bg-orange-100",
        darkText: "dark:text-orange-100",
        darkBackground: "dark:bg-orange-500",
    },
    success: {
        text: "text-green-500",
        background: "bg-green-100",
        darkText: "dark:text-green-100",
        darkBackground: "dark:bg-green-500",
    },
    info: {
        text: "text-blue-500",
        background: "bg-blue-100",
        darkText: "dark:text-blue-100",
        darkBackground: "dark:bg-blue-500",
    },
    danger: {
        text: "text-red-500",
        background: "bg-red-100",
        darkText: "dark:text-red-100",
        darkBackground: "dark:bg-red-500",
    },
};

const CardCount = ({ title, value, icon, theme = "primary" }) => {
    const color = themeColors[theme];
    return (
        <>
            <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                <div className={`p-3 mr-4 rounded-full ${color.background} ${color.text} ${color.darkBackground} ${color.darkText}`}>
                    {icon}
                </div>
                <div>
                    <Typography tag="h3" className="mb-2 text-sm font-medium">
                        {title}
                    </Typography>
                    <Typography className="text-lg font-semibold">
                        {value}
                    </Typography>
                </div>
            </div>
        </>
    );
};

export default CardCount;
