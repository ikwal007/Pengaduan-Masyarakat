import React from "react";

const CardComponent = ({ children }) => {
  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 ">
      {children}
    </div>
  );
};

const CardIcon = ({ color, bgColor, icon }) => {
  return (
    <div
      className={`p-3 mr-4 text-${color}-500 bg-${bgColor}-100 rounded-full dark:text-${color}-100 dark:bg-${bgColor}-500`}
    >
      {icon}
    </div>
  );
};

const CardInfo = ({ title, value }) => {
  return (
    <div>
      <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
        {title}
      </p>
      <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
        {value}
      </p>
    </div>
  );
};

const Card = ({ children }) => {
  return (
    <CardComponent>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child);
      })}
    </CardComponent>
  );
};

Card.Icon = CardIcon;
Card.Info = CardInfo;

export default Card;
