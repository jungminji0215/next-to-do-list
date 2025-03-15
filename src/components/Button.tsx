import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "warning" | "danger";
}

const variantStyles: { [key in NonNullable<ButtonProps["variant"]>]: string } =
  {
    primary: "bg-blue-500 text-white",
    secondary: "bg-gray-500 text-white",
    warning: "bg-yellow-500 text-white",
    danger: "bg-red-500 text-white",
  };

export default function Button({
  variant = "primary",
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={`${variantStyles[variant]} whitespace-nowrap rounded-md p-2 ${
        className || ""
      }`}
    >
      {children}
    </button>
  );
}
