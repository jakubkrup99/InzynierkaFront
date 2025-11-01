import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: "blue" | "gray";
  width?: number;
};

function Button({
  children,
  color = "blue",
  width = 72,
  ...props
}: ButtonProps) {
  const colorStyles = {
    blue: "bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 text-white",
    gray: "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-gray-400 text-gray-600",
  };
  return (
    <button
      {...props}
      className={`font-medium py-3 px-6 w-${width} rounded-xl transition ${colorStyles[color]}`}
    >
      {children}
    </button>
  );
}

export default Button;
