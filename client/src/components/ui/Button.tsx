import React from "react";
import merge from "../../utils/merge.ts";

export type ButtonVariant = "primary" | "secondary" | "outline" | "danger" | "plain";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
  children: React.ReactNode;
}

const baseStyles = "px-4 py-2 rounded-lg text-white font-medium transition duration-200";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-blue-600 hover:bg-blue-700",
  secondary: "bg-gray-600 hover:bg-gray-700",
  danger: "bg-red-600 hover:bg-red-700",
  outline: "bg-transparent border border-gray-600 text-gray-800 hover:bg-gray-100",
  plain: "hover:opacity-50",
};

const disabledStyles = "opacity-50 cursor-not-allowed";

const Button = ({ variant = "primary", loading = false, children, disabled = false, className, ...props }: ButtonProps) => {
  return (
    <button
      className={merge(baseStyles, variants[variant], disabled || loading ? disabledStyles : "", className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
