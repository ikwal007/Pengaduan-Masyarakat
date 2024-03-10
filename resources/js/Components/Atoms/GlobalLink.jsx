import { Link } from "@inertiajs/react";

// Define a mapping of themes to their respective colors
const themeColors = {
    primary: {
        text: "text-white",
        background: "bg-purple-600",
        hoverBackground: "hover:bg-purple-500",
        activeBackground: "active:bg-purple-600",
    },
    warning: {
        text: "text-white",
        background: "bg-orange-600",
        hoverBackground: "hover:bg-orange-500",
        activeBackground: "active:bg-orange-600",
    },
    success: {
        text: "text-white",
        background: "bg-green-600",
        hoverBackground: "hover:bg-green-500",
        activeBackground: "active:bg-green-600",
    },
    info: {
        text: "text-white",
        background: "bg-blue-600",
        hoverBackground: "hover:bg-blue-500",
        activeBackground: "active:bg-blue-600",
    },
    danger: {
        text: "text-white",
        background: "bg-red-600",
        hoverBackground: "hover:bg-red-500",
        activeBackground: "active:bg-red-600",
    },
    transparent: {
        text: "text-black",
        background: "bg-transparent",
        hoverBackground: "hover:bg-gray-100",
        activeBackground: "active:bg-transparent",
        border: "border-none",
        shadow: "shadow-none",
    },
    white: {
        text: "text-purple-500",
        background: "bg-white",
        hoverBackground: "hover:bg-gray-100",
        activeBackground: "active:bg-gray-200",
    },
    "daisyui-neutral": "btn-neutral",
    "daisyui-primary": "btn-primary",
    "daisyui-secondary": "btn-secondary",
    "daisyui-accent": "btn-accent",
    "daisyui-ghost": "btn-ghost",
    "daisyui-link": "btn-link",
    "daisyui-waring": "btn-warning",
    "daisyui-info": "btn-info",
    "daisyui-success": "btn-success",
    "daisyui-error": "btn-error",
};

const GlobalLink = ({
    active = false,
    theme = "primary",
    className = "",
    maxWidth = "full",
    children,
    ...props
}) => {
    const themeConfig = themeColors[theme];
    const maxWidthClass = {
        sm: "sm:max-w-sm",
        md: "sm:max-w-md",
        lg: "sm:max-w-lg",
        xl: "sm:max-w-xl",
        "2xl": "sm:max-w-2xl",
        full: "sm:w-full",
        max: "sm:w-max",
        min: "sm:w-min",
    }[maxWidth];

    return (
        <Link {...props} className={`btn transition duration-700 ease-in-out ${maxWidthClass} ${themeConfig} ${themeConfig?.text} ${themeConfig?.background} ${themeConfig?.hoverBackground} ${themeConfig?.activeBackground} ${className} ${theme === "transparent" && themeConfig.border} ${theme === "transparent" && themeConfig.shadow}`}>
            {children}
        </Link>
    );
};

export default GlobalLink;
