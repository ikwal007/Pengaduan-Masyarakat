import React from "react";
import Typography from "../Atoms/Typography";

const Card = ({ children }) => {
    return (
        <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
            {children}
        </div>
    );
};

const CardIcon = ({ theme = "primary", children }) => {
    

    console.log(theme);
    return (
        <div
            className={` ${themeConfig.text} ${themeConfig.background}  ${themeConfig.darkText} ${themeConfig.darkBackground}`}
        >
            {children}
        </div>
    );
};

const CardInfo = ({ title, value }) => {
    return (
        <div>
            <Typography tag="h3" className="mb-2 text-sm font-medium">
                {title}
            </Typography>
            <Typography className="text-lg font-semibold">
                {value}
            </Typography>
        </div>
    );
};

// const Card = ({ children }) => {
//     return (
//         <CardComponent>
//             {React.Children.map(children, (child) => {
//                 return React.cloneElement(child);
//             })}
//         </CardComponent>
//     );
// };

Card.Icon = CardIcon;
Card.Info = CardInfo;

export default Card;
