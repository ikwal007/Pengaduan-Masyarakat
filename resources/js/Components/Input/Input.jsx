import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const themeColors = {
    primary: {
        border: "border-gray-600",
        shadowOutline: "shadow-outline-gray-400",
        focusBorder: "focus:border-gray-400",
        focusRing: "focus:ring-gray-100",
        labelText: "text-gray-600",
    },
    danger: {
        border: "border-red-600",
        shadowOutline: "shadow-outline-red-400",
        focusBorder: "focus:border-red-400",
        focusRing: "focus:ring-red-100",
        labelText: "text-red-600",
    },
    success: {
        border: "border-green-600",
        shadowOutline: "shadow-outline-green-400",
        focusBorder: "focus:border-green-400",
        focusRing: "focus:ring-green-100",
        labelText: "text-green-600",
    },
    warning: {
        border: "border-yellow-600",
        shadowOutline: "shadow-outline-yellow-400",
        focusBorder: "focus:border-yellow-400",
        focusRing: "focus:ring-yellow-100",
        labelText: "text-yellow-600",
    },
};

const Input = ({ children, className }) => {
    return <div className={`text-sm mt-4 ${className}`}>{children}</div>;
};

const Label = ({ children, labelName }) => {
    return (
        <label htmlFor="" className="block font-medium text-gray-700">
            <span className="text-gray-700 dark:text-gray-400">
                {labelName}
            </span>
            {children}
        </label>
    );
};

const InputText = ({
    placeholder,
    message,
    theme,
    id,
    onChange,
    value,
    ...props
}) => {
    // Use state to manage color based on theme
    const [color, setColor] = useState(themeColors.primary);

    // useEffect to update color based on theme changes
    useEffect(() => {
        if (theme && themeColors[theme]) {
            setColor(themeColors[theme]);
        }
    }, [theme]);
    return (
        <>
            <input
                className={`block rounded-md w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 border-2 dark:text-gray-300 dark:focus:shadow-outline-gray form-input disabled:bg-gray-100 disabled:border-none disabled:cursor-not-allowed ${color.border} ${color.shadowOutline} ${color.focusBorder} ${color.focusRing}`}
                placeholder={placeholder}
                type="text"
                id={id}
                onChange={onChange}
                value={value}
                {...props}
            />
            {message && (
                <span className={`text-xs ${color.labelText}`}>{message}</span>
            )}
        </>
    );
};

/**
 * InputPassword component
 * @param {InputPasswordProps} props - Component properties
 */
const InputPassword = ({
    placeholder,
    message,
    theme,
    id,
    onChange,
    value,
}) => {
    const [show, setShow] = useState(false);

    // Use state to manage color based on theme
    const [color, setColor] = useState(themeColors.primary);

    // useEffect to update color based on theme changes
    useEffect(() => {
        if (theme && themeColors[theme]) {
            setColor(themeColors[theme]);
        }
    }, [theme]);

    const toggleShow = () => {
        setShow(!show);
    };

    return (
        <>
            <div className="relative text-gray-500">
                <input
                    className={`block rounded-md w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 border-2 dark:text-gray-300 dark:focus:shadow-outline-gray form-input disabled:bg-gray-100 disabled:border-none disabled:cursor-not-allowed ${color.border} ${color.shadowOutline} ${color.focusBorder} ${color.focusRing}`}
                    placeholder={placeholder}
                    id={id}
                    onChange={onChange}
                    value={value}
                    type={show ? "text" : "password"}
                />
                <button
                    className={`absolute inset-y-0 right-0 flex items-center mr-3 focus:outline-none`}
                    type="button"
                    onClick={toggleShow}
                >
                    {show ? (
                        <FaEyeSlash
                            className={` ${color.labelText} dark:text-gray-400`}
                        />
                    ) : (
                        <FaEye
                            className={` ${color.labelText} dark:text-gray-400`}
                        />
                    )}
                </button>
            </div>
            {message && (
                <span className={`text-xs ${color.labelText}`}>{message}</span>
            )}
        </>
    );
};

const InputRadio = ({ title }) => {
    return (
        <div className="inline-flex mr-2 items-center">
            <input
                type="radio"
                class="text-purple-600 form-radio focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                name="accountType"
                value="personal"
            />
            <span className="ml-2">{title}</span>
        </div>
    );
};

const InputCheckbox = ({ children }) => {
    return (
        <div className="flex items-center">
            <input
                type="checkbox"
                className="text-purple-600 form-checkbox focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
            />
            <span className="ml-2">{children}</span>
        </div>
    );
};

Input.Label = Label;
Input.InputText = InputText;
Input.InputPassword = InputPassword;
Input.InputRadio = InputRadio;
Input.InputCheckbox = InputCheckbox;

export default Input;
