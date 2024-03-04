import React from 'react';

const Typography = ({tag = 'h1', children, className}) => {
    const Tag = tag
    return (
        <Tag className={`${className} text-gray-600 dark:text-gray-400`}>
            {children}
        </Tag>
    );
}

export default Typography;
