import React, { useEffect, useState } from "react";

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
};

const maxWidthClass = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
    xl: 'sm:max-w-xl',
    '2xl': 'sm:max-w-2xl',
    full: 'sm:w-full',
    max: 'sm:max-w',
    min: 'sm:min-w',
}

// Button Component
const Button = ({
    children,
    theme = "primary",
    className,
    maxWidth = "full",
    type = "button",
    disabled = false,
    ...props
}) => {

    const maxWidthConfig = maxWidthClass[maxWidth];
    const color = themeColors[theme];

    // Render the button with dynamic styles
    return (
        <button
        type={type}
        disabled={disabled}
        className={`flex items-center justify-between px-4 py-2 text-sm font-semibold leading-5 ${color.text} transition-colors duration-150 group ${color.background} border border-transparent rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed ${color.activeBackground} ${color.hoverBackground} ${className} ${maxWidthConfig}`}
        {...props}
        >
            {children}
        </button>
    );
};

export default Button;
