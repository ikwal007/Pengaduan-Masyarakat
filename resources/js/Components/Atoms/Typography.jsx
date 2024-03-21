import React from 'react';

const Typography = ({tag = 'h1', children, className, theme = "secondary"}) => {
    const themeColors = {
        primary: {
            text: "text-white",
        },
        secondary: {
            text: "text-gray-700"
        }
    }[theme];
    const Tag = tag
    return (
        <Tag className={`${className} ${themeColors.text} dark:text-gray-200 dark:group-hover:text-gray-700 transition duration-700 ease-in-out`}>
            {children}
        </Tag>
    );
}

export default Typography;
