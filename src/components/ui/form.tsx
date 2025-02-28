"use client";

import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { Eye, EyeOff, ChevronDown, Check, X } from "lucide-react";

type FormatType = "number" | "currency" | "date" | "phone" | "none";

interface StyleProps {
  textColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  focusColor?: string;
  errorColor?: string;
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, StyleProps {
  label?: string;
  type?: "text" | "password" | "email" | "number" | "search" | "tel" | "date";
  error?: string;
  labelColor?: string;
  format?: FormatType;
  currencySymbol?: string;
  validate?: "email" | "password" | "required" | "none";
  validateMessage?: string;
  prefixElement?: React.ReactNode; 
  suffixElement?: React.ReactNode; 
  min?: number;
  max?: number;
}

export const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  error,
  className,
  textColor = "text-gray-800",
  backgroundColor = "bg-white",
  borderColor = "border-gray-300",
  focusColor = "border-gray-500",
  errorColor = "text-red-500",
  labelColor = "text-gray-700",
  format = "none",
  currencySymbol = "Rp",
  validate = "none",
  validateMessage,
  prefixElement,
  suffixElement,
  min,
  max,
  onChange,
  value: propValue,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState<string>(propValue as string || "");
  const [formattedValue, setFormattedValue] = useState<string>("");
  const [validationError, setValidationError] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<number>(0);

  const formatValue = (val: string): string => {
    if (!val) return "";

    switch (format) {
      case "number":
        const numVal = val.replace(/[^\d.]/g, "");
        if (min !== undefined || max !== undefined) {
          const numericVal = parseFloat(numVal);
          if (!isNaN(numericVal)) {
            if (min !== undefined && numericVal < min) return min.toString();
            if (max !== undefined && numericVal > max) return max.toString();
          }
        }
        return numVal;

      case "currency":
        const cleanVal = val.replace(/[^\d]/g, "");
        if (cleanVal === "") return "";
        return parseInt(cleanVal, 10).toLocaleString("id-ID");

      case "date":
        let dateVal = val.replace(/[^\d]/g, "");
        if (dateVal.length > 8) dateVal = dateVal.slice(0, 8);
        if (dateVal.length > 4) {
          dateVal = dateVal.slice(0, 4) + "/" + dateVal.slice(4);
        }
        if (dateVal.length > 2) {
          dateVal = dateVal.slice(0, 2) + "/" + dateVal.slice(2);
        }
        return dateVal;

      case "phone":
        const phoneVal = val.replace(/[^\d]/g, "");
        if (phoneVal.length <= 4) return phoneVal;
        if (phoneVal.length <= 8) return phoneVal.slice(0, 4) + "-" + phoneVal.slice(4);
        return phoneVal.slice(0, 4) + "-" + phoneVal.slice(4, 8) + "-" + phoneVal.slice(8, 12);

      default:
        return val;
    }
  };
  
  const hasSuffixElement = useRef(!!suffixElement).current;


  const validateInput = (val: string): string => {
    if (!val && validate === "required") {
      return validateMessage || "Field ini wajib diisi";
    }

    switch (validate) {
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (val && !emailRegex.test(val)) {
          return validateMessage || "Format email tidak valid";
        }
        break;
        
      case "password":
        if (val) {
          const hasLowerCase = /[a-z]/.test(val);
          const hasUpperCase = /[A-Z]/.test(val);
          const hasNumber = /[0-9]/.test(val);
          const hasSpecialChar = /[^A-Za-z0-9]/.test(val);
          const isLongEnough = val.length >= 8;
          
          let strength = 0;
          if (hasLowerCase) strength++;
          if (hasUpperCase) strength++;
          if (hasNumber) strength++;
          if (hasSpecialChar) strength++;
          if (isLongEnough) strength++;
          
          setPasswordStrength(strength);
          
          if (strength < 3) {
            return validateMessage || "Password terlalu lemah";
          }
        }
        break;
    }
    
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const formatted = formatValue(newValue);
    
    setValue(formatted);
    setFormattedValue(formatted);
    
    // Update password strength immediately when typing
    if (validate === "password") {
      validateInput(formatted);
    }
    
    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        value: format === "currency" ? formatted.replace(/[^\d]/g, "") : formatted
      }
    };
    
    if (onChange) {
      onChange(syntheticEvent as any);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    setValidationError(validateInput(value));
  };

  const handleFocus = () => {
    setIsFocused(true);
    setValidationError("");
  };

  useEffect(() => {
    if (propValue !== undefined && propValue !== value) {
      const formatted = formatValue(propValue as string);
      setValue(formatted);
      setFormattedValue(formatted);
      
      // Update password strength when propValue changes
      if (validate === "password" && formatted) {
        validateInput(formatted);
      }
    }
  }, [propValue]);

  const displayValue = () => {
    if (format === "currency" && value) {
      return `${currencySymbol} ${formattedValue}`;
    }
    return formattedValue;
  };

  const renderPasswordStrength = () => {
    if (validate === "password" && value) {
      return (
        <div className="mt-1">
          <div className="flex w-full h-1 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-1 transition-all duration-300 ${
                passwordStrength <= 1 ? "bg-red-500" : 
                passwordStrength <= 3 ? "bg-yellow-500" : "bg-green-500"
              }`} 
              style={{ width: `${(passwordStrength / 5) * 100}%` }}
            />
          </div>
          <p className="text-xs mt-1 text-gray-500">
            {passwordStrength <= 1 ? "Sangat lemah" : 
             passwordStrength <= 2 ? "Lemah" :
             passwordStrength <= 3 ? "Sedang" :
             passwordStrength <= 4 ? "Kuat" : "Sangat kuat"}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col space-y-2">
      {label && <label className={`font-medium ${labelColor}`}>{label}</label>}
      <div className="relative">
        {prefixElement && (
          <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${textColor}`}>
            {prefixElement}
          </div>
        )}
        
        <input
          type={type === "password" && showPassword ? "text" : type}
          className={`border rounded-lg px-4 py-2 w-full focus:outline-none transition duration-300 shadow-sm 
          ${backgroundColor} ${textColor}
          ${validationError || error ? `border-red-500` : `${borderColor} focus:${focusColor}`} 
          ${prefixElement ? "pl-10" : ""} ${suffixElement || (type === "password" && !suffixElement) ? "pr-10" : ""}
          ${className}`}
          value={format === "currency" ? formattedValue : value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        
        {type === "password" && !suffixElement && (
        <button
          type="button"
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${textColor} hover:opacity-70 transition`}
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}

        
        {suffixElement && (
          <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${textColor}`}>
            {suffixElement}
          </div>
        )}
        
        {validate === "email" && value && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {validationError ? (
              <X size={18} className="text-red-500" />
            ) : (
              <Check size={18} className="text-green-500" />
            )}
          </div>
        )}
      </div>
      
      {renderPasswordStrength()}
      
      {(validationError || error) && (
        <p className={`${errorColor} text-sm`}>{validationError || error}</p>
      )}
    </div>
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement>, StyleProps {
  label?: string;
  options: { value: string; label: string }[];
  error?: string;
  labelColor?: string;
  validate?: "required" | "none";
  validateMessage?: string;
  prefixElement?: React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  className,
  textColor = "text-gray-800",
  backgroundColor = "bg-white",
  borderColor = "border-gray-300",
  focusColor = "border-gray-500",
  errorColor = "text-red-500",
  labelColor = "text-gray-700",
  validate = "none",
  validateMessage,
  prefixElement,
  ...props
}) => {
  const [validationError, setValidationError] = useState<string>("");
  
  const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
    if (validate === "required" && !e.target.value) {
      setValidationError(validateMessage || "Field ini wajib diisi");
    } else {
      setValidationError("");
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      {label && <label className={`font-medium ${labelColor}`}>{label}</label>}
      <div className="relative">
        {prefixElement && (
          <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${textColor}`}>
            {prefixElement}
          </div>
        )}
        <select
          className={`border rounded-lg px-4 py-2 w-full focus:outline-none transition duration-300 shadow-sm appearance-none 
          ${backgroundColor} ${textColor}
          ${validationError || error ? `border-red-500` : `${borderColor} focus:${focusColor}`} 
          ${prefixElement ? "pl-10" : ""}
          ${className}`}
          onBlur={handleBlur}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${textColor} pointer-events-none`} size={18} />
      </div>
      {(validationError || error) && (
        <p className={`${errorColor} text-sm`}>{validationError || error}</p>
      )}
    </div>
  );
};

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement>, StyleProps {
  label?: string;
  labelColor?: string;
  checkColor?: string;
  validate?: "required" | "none";
  validateMessage?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ 
  label, 
  className,
  textColor = "text-gray-800",
  borderColor = "border-gray-300",
  focusColor = "border-gray-500",
  labelColor = "text-gray-700",
  checkColor = "bg-blue-500",
  validate = "none",
  validateMessage,
  ...props 
}) => {
  const [validationError, setValidationError] = useState<string>("");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (validate === "required" && !e.target.checked) {
      setValidationError(validateMessage || "Checkbox ini wajib dicentang");
    } else {
      setValidationError("");
    }
    
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <div className="flex flex-col">
      <label className="flex items-center space-x-3 cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            className="peer sr-only"
            onChange={handleChange}
            {...props}
          />
          <div className={`w-5 h-5 border ${borderColor} rounded-md peer-checked:${checkColor} peer-focus:${focusColor} transition-all`}></div>
          <svg
            className={`absolute left-0.5 top-0.5 w-4 h-4 text-white scale-0 peer-checked:scale-100 transition-transform`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        {label && <span className={`${labelColor} font-medium`}>{label}</span>}
      </label>
      {validationError && (
        <p className="text-red-500 text-sm mt-1">{validationError}</p>
      )}
    </div>
  );
};