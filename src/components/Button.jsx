import React from "react";

export const Button = ({ onClick, children, variant = "default" }) => {
  const getClassNames = () => {
    switch (variant) {
      case "ghost":
        return "bg-transparent hover:bg-gray-200 text-gray-700";
      case "default":
      default:
        return "bg-blue-500 hover:bg-blue-600 text-white";
    }
  };

  return (
    <button
      onClick={onClick}
      className={`py-2 px-4 rounded ${getClassNames()}`}
    >
      {children}
    </button>
  );
};
