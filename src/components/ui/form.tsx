import React, { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: "text" | "password" | "email" | "number" | "search";
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  error,
  className,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col space-y-1">
      {label && <label className="font-medium text-gray-700">{label}</label>}
      <div className="relative">
        <input
          type={type === "password" && showPassword ? "text" : type}
          className={`border rounded-md px-3 py-2 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error ? "border-red-500" : "border-gray-300"
          } ${className}`}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute right-3 top-2 text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁"}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
  error?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  className,
  ...props
}) => {
  return (
    <div className="flex flex-col space-y-1">
      {label && <label className="font-medium text-gray-700">{label}</label>}
      <select
        className={`border rounded-md px-3 py-2 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        } ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, className, ...props }) => {
  return (
    <div className="flex items-center space-x-2 cursor-pointer">
      <input type="checkbox" className="w-4 h-4" {...props} />
      {label && <span className="text-gray-700">{label}</span>}
    </div>
  );
};
