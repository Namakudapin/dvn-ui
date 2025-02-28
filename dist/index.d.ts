import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "destructive" | "success" | "warning" | "disabled" | "loading" | "link" | "ghost" | "icon";
    color?: string;
    textColor?: string;
    isLoading?: boolean;
    icon?: React.ReactNode;
}
declare const Button: React.FC<ButtonProps>;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    type?: "text" | "password" | "email" | "number" | "search";
    error?: string;
}
declare const Input: React.FC<InputProps>;
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    options: {
        value: string;
        label: string;
    }[];
    error?: string;
}
declare const Select: React.FC<SelectProps>;
interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}
declare const Checkbox: React.FC<CheckboxProps>;

export { Button, Checkbox, Input, Select };
