const themeColors = {
    primary: "select-primary",
    secondary: "select-secondary",
    accent: "select-accent",
    info: "select-info",
    success: "select-success",
    warning: "select-warning",
    error: "select-error",
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

const Select = ({ children, className }) => {
    return (
        <>
            <label className={`form-control w-full ${className}`}>
                {children}
            </label>
        </>
    );
};

const Label = ({
    id,
    children,
    title,
    message,
    value,
    theme = "primary",
    maxWidth = "full",
    onChange,
    ...props
}) => {
    const themeConfig = themeColors[theme];
    const maxWidthConfig = maxWidthClass[maxWidth];
    return (
        <>
            {title && (
                <div className="label">
                    <span className="label-text">{title}</span>
                </div>
            )}
            <select
                {...props}
                id={id}
                className={`select focus:border-0 focus:ring-0 ${themeConfig} ${maxWidthConfig}`}
                value={value}
                onChange={onChange}
            >
                {children}
            </select>
            {message && (
                <div className="label">
                    <span
                        className={`label-text-alt ${
                            message && "text-red-600"
                        }`}
                    >
                        {message}
                    </span>
                </div>
            )}
        </>
    );
};

const Option = ({ title, value, ...props }) => {
    return (
        <>
            <option {...props} value={value}>
                {title}
            </option>
        </>
    );
};

Select.Label = Label;
Select.Option = Option;

export default Select;
