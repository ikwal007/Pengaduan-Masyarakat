import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const themeColors = {
    primary: "input-primary",
    secondary: "input-secondary",
    accent: "input-accent",
    info: "input-info",
    success: "input-success",
    warning: "input-warning",
    error: "input-error",
};

const maxWidthClass = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-xl",
    "2xl": "sm:max-w-2xl",
    full: "sm:w-full",
    max: "sm:w-max",
    min: "sm:w-min",
};

const inputSizeClass = {
    xs: "input-xs",
    sm: "input-sm",
    md: "input-md",
    lg: "input-lg",
    xl: "input-xl",
    "2xl": "input-2xl",
};

const Input = ({ children, className, maxWidth = "full" }) => {
    const maxWidthConfig = maxWidthClass[maxWidth];
    return (
        <label className={`${maxWidthConfig} ${className} hover:cursor-pointer`}>{children}</label>
    );
};

const Label = ({ children, labelName, message }) => {
    return (
        <>
            <div className="label">
                {labelName && (
                    <span className="label-text text-gray-700 dark:text-gray-400">
                        {labelName}
                    </span>
                )}
            </div>
            {children}
            {message && (
                <div className="label">
                    <span className="label-text-alt text-red-600">{message}</span>
                </div>
            )}
        </>
    );
};

const InputText = ({
    placeholder,
    theme = "primary",
    maxWidth = "full",
    inputSize = "sm",
    leftIcon = null,
    rightIcon = null,
    id,
    onChange,
    value,
    ...props
}) => {
    // Use vaiabel to manage color based on theme
    const themeConfig = themeColors[theme];
    const maxWidthConfig = maxWidthClass[maxWidth];
    const inputSizeConfig = inputSizeClass[inputSize];
    return (
        <div
            className={`input input-bordere flex items-center gap-2 ${themeConfig} ${inputSizeConfig} ${maxWidthConfig}`}
        >
            {leftIcon && leftIcon}
            <input
                id={id}
                type="text"
                placeholder={placeholder}
                className={`grow border-0 focus:ring-0`}
                onChange={onChange}
                value={value}
                {...props}
            />
            {rightIcon && rightIcon}
        </div>
    );
};
const InputEmail = ({
    placeholder,
    theme = "primary",
    maxWidth = "full",
    inputSize = "sm",
    leftIcon = null,
    rightIcon = null,
    id,
    onChange,
    value,
    ...props
}) => {
    // Use vaiabel to manage color based on theme
    const themeConfig = themeColors[theme];
    const maxWidthConfig = maxWidthClass[maxWidth];
    const inputSizeConfig = inputSizeClass[inputSize];
    return (
        <div
            className={`input input-bordere flex items-center gap-2 autofill:t ${themeConfig} ${inputSizeConfig} ${maxWidthConfig}`}
        >
            {leftIcon && leftIcon}
            <input
                id={id}
                type="email"
                placeholder={placeholder}
                className={`grow border-0 focus:ring-0`}
                onChange={onChange}
                value={value}
                {...props}
            />
            {rightIcon && rightIcon}
        </div>
    );
};
const InputNumber = ({
    placeholder,
    message,
    theme = "primary",
    maxWidth = "full",
    inputSize = "sm",
    leftIcon = null,
    rightIcon = null,
    id,
    onChange,
    value,
    ...props
}) => {
    // Use state to manage color based on theme
    const themeConfig = themeColors[theme];
    const maxWidthConfig = maxWidthClass[maxWidth];
    const inputSizeConfig = inputSizeClass[inputSize];

    return (
        <div
            className={`input input-bordere flex items-center gap-2 ${themeConfig} ${inputSizeConfig} ${maxWidthConfig}`}
        >
            {leftIcon && leftIcon}
            <input
                id={id}
                type="number"
                placeholder={placeholder}
                className={`grow border-0 focus:ring-0`}
                onChange={onChange}
                value={value}
                {...props}
            />
            {rightIcon && rightIcon}
        </div>
    );
};

const InputPassword = ({
    placeholder,
    message,
    theme = "primary",
    maxWidth = "full",
    inputSize = "sm",
    leftIcon = null,
    id,
    onChange,
    value,
    ...props
}) => {
    const [show, setShow] = useState(false);

    // Use vaiabel to manage color based on theme
    const themeConfig = themeColors[theme];
    const maxWidthConfig = maxWidthClass[maxWidth];
    const inputSizeConfig = inputSizeClass[inputSize];

    const toggleShow = () => {
        setShow(!show);
    };

    return (
        <div
            className={`input input-bordere flex relative items-center gap-2 ${themeConfig} ${inputSizeConfig} ${maxWidthConfig}`}
        >
            {leftIcon && leftIcon}
            <input
                id={id}
                type={show ? "text" : "password"}
                placeholder={placeholder}
                className={`grow border-0 focus:ring-0`}
                onChange={onChange}
                value={value}
                {...props}
            />
            <button
                className={`absolute inset-y-0 right-0 flex items-center mr-3 focus:outline-none`}
                type="button"
                onClick={toggleShow}
            >
                {show ? (
                    <FaEyeSlash
                        className={`w-5 h-5 text-gray-400 dark:text-gray-400`}
                    />
                ) : (
                    <FaEye
                        className={`w-5 h-5 text-gray-400 dark:text-gray-400`}
                    />
                )}
            </button>
        </div>
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

const InputFile = ({ id, name, onChange, value, accept, maxWidth = "max" }) => {
    const maxWidthConfig = maxWidthClass[maxWidth];
    return (
        <div className="flex items-center">
            <input
                id={id}
                name={name}
                type="file"
                className={`hidden`}
                accept={accept}
                onChange={onChange}
                value={value}
            />
        </div>
    );
};

Input.Label = Label;
Input.InputText = InputText;
Input.InputEmail = InputEmail;
Input.InputNumber = InputNumber;
Input.InputPassword = InputPassword;
Input.InputRadio = InputRadio;
Input.InputCheckbox = InputCheckbox;
Input.InputFile = InputFile;

export default Input;
