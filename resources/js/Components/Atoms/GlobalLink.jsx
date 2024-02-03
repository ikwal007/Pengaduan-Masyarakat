import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";

// Define a mapping of themes to their respective colors
const themeColors = {
    primary: {
        text: "text-white",
        background: "bg-purple-500",
        hoverBackground: "hover:bg-purple-600",
        activeBackground: "active:bg-purple-600",
    },
    warning: {
        text: "text-white",
        background: "bg-orange-500",
        hoverBackground: "hover:bg-orange-600",
        activeBackground: "active:bg-orange-600",
    },
    success: {
        text: "text-white",
        background: "bg-green-500",
        hoverBackground: "hover:bg-green-600",
        activeBackground: "active:bg-green-600",
    },
    info: {
        text: "text-white",
        background: "bg-blue-500",
        hoverBackground: "hover:bg-blue-600",
        activeBackground: "active:bg-blue-600",
    },
    danger: {
        text: "text-white",
        background: "bg-red-500",
        hoverBackground: "hover:bg-red-600",
        activeBackground: "active:bg-red-600",
    },
    transparent: {
        text: "text-black",
        background: "bg-transparent",
        hoverBackground: "hover:bg-transparent",
        activeBackground: "active:bg-transparent",
    },
};

const GlobalLink = ({ active = false, theme, className = "", children, ...props }) => {
    // Use state to manage color based on theme
    const [color, setColor] = useState(themeColors.primary);

    // useEffect to update color based on theme changes
    useEffect(() => {
        if (theme && themeColors[theme]) {
            setColor(themeColors[theme]);
        }
    }, [theme]);
    return (
        <Link
            {...props}
            className={`flex items-center justify-between px-4 py-2 max-w-max text-sm font-medium leading-5 ${color.text} transition-colors duration-150 ${color.background} border border-transparent rounded-lg ${color.activeBackground} ${color.hoverBackground} ${className}`}
        >{children}</Link>
    );
};

const LinkTitle = ({ children }) => {
    return <span>{children}</span>;
};

// ButtonIcon Component
const LinkIcon = ({ children }) => {
    return <span className="w-4 h-4">{children}</span>;
};

GlobalLink.Title = LinkTitle;
GlobalLink.Icon = LinkIcon;

export default GlobalLink;
