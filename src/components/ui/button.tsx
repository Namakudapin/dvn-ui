"use client";

import React from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "destructive" | "success" | "warning" | "disabled" | "loading" | "link" | "ghost" | "icon";
  size?: "small" | "medium" | "large";
  color?: string;
  textColor?: string;
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right"; // 🔹 Support ikon di kiri & kanan
}

const Button: React.FC<ButtonProps> = ({ 
  variant = "primary", 
  size = "medium", 
  color, 
  textColor, 
  isLoading, 
  icon, 
  iconPosition = "left",
  className, 
  children, 
  ...props 
}) => {
  const baseStyles = `rounded-md font-medium transition flex items-center justify-center space-x-2 
                      duration-200 active:scale-95`; // 🔹 Animasi hover & klik
  
  const sizes = {
    small: "px-3 py-1 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  };

  const variants = {
    primary: color ? "" : "bg-white text-black border border-gray-300 hover:bg-gray-100",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    outline: "border border-gray-600 text-white hover:bg-gray-100",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    success: "bg-green-600 text-white hover:bg-green-700",
    warning: "bg-yellow-500 text-black hover:bg-yellow-600",
    disabled: "bg-gray-300 text-gray-500 cursor-not-allowed",
    loading: "bg-blue-500 text-white cursor-not-allowed opacity-70",
    link: "text-blue-600 hover:underline",
    ghost: "text-gray-600 hover:bg-gray-200",
    icon: "p-2 rounded-full bg-gray-200 hover:bg-gray-300",
  };

  return (
    <button
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`}
      style={{
        backgroundColor: color || undefined,
        color: textColor || (variant === "primary" ? "black" : "white"),
        border: color ? "none" : undefined, // ✅ Hapus border jika custom color
      }}
      disabled={variant === "disabled" || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
      {!isLoading && icon && iconPosition === "left" && <span>{icon}</span>}
      {children && <span>{children}</span>}
      {!isLoading && icon && iconPosition === "right" && <span>{icon}</span>}
    </button>
  );
};

export default Button;
