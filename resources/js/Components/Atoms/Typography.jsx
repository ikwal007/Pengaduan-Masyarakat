import React from 'react';

const Typography = ({tag = 'h1', children, className}) => {
    const Tag = tag
    return (
        <Tag className={`${className} text-gray-700 dark:text-gray-200 dark:group-hover:text-gray-700 transition duration-700 ease-in-out`}>
            {children}
        </Tag>
    );
}

export default Typography;
