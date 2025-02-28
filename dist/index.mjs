var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};

// src/components/ui/button.tsx
import React from "react";
import { Loader2 } from "lucide-react";
var Button = (_a) => {
  var _b = _a, {
    variant = "primary",
    color,
    textColor,
    isLoading,
    icon,
    className,
    children
  } = _b, props = __objRest(_b, [
    "variant",
    "color",
    "textColor",
    "isLoading",
    "icon",
    "className",
    "children"
  ]);
  const baseStyles = "px-4 py-2 rounded-md font-medium transition flex items-center justify-center space-x-2";
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
    icon: "p-2 rounded-full bg-gray-200 hover:bg-gray-300"
  };
  return /* @__PURE__ */ React.createElement(
    "button",
    __spreadValues({
      className: `${baseStyles} ${variants[variant]} ${className}`,
      style: {
        backgroundColor: color || void 0,
        color: textColor || (variant === "primary" ? "black" : "white")
      },
      disabled: variant === "disabled" || isLoading
    }, props),
    isLoading && /* @__PURE__ */ React.createElement(Loader2, { className: "w-5 h-5 animate-spin" }),
    icon && /* @__PURE__ */ React.createElement("span", null, icon),
    children && /* @__PURE__ */ React.createElement("span", null, children)
  );
};
var button_default = Button;

// src/components/ui/form.tsx
import React2, { useState } from "react";
var Input = (_a) => {
  var _b = _a, {
    label,
    type = "text",
    error,
    className
  } = _b, props = __objRest(_b, [
    "label",
    "type",
    "error",
    "className"
  ]);
  const [showPassword, setShowPassword] = useState(false);
  return /* @__PURE__ */ React2.createElement("div", { className: "flex flex-col space-y-1" }, label && /* @__PURE__ */ React2.createElement("label", { className: "font-medium text-gray-700" }, label), /* @__PURE__ */ React2.createElement("div", { className: "relative" }, /* @__PURE__ */ React2.createElement(
    "input",
    __spreadValues({
      type: type === "password" && showPassword ? "text" : type,
      className: `border rounded-md px-3 py-2 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? "border-red-500" : "border-gray-300"} ${className}`
    }, props)
  ), type === "password" && /* @__PURE__ */ React2.createElement(
    "button",
    {
      type: "button",
      className: "absolute right-3 top-2 text-gray-600",
      onClick: () => setShowPassword(!showPassword)
    },
    showPassword ? "\u{1F648}" : "\u{1F441}"
  )), error && /* @__PURE__ */ React2.createElement("p", { className: "text-red-500 text-sm" }, error));
};
var Select = (_a) => {
  var _b = _a, {
    label,
    options,
    error,
    className
  } = _b, props = __objRest(_b, [
    "label",
    "options",
    "error",
    "className"
  ]);
  return /* @__PURE__ */ React2.createElement("div", { className: "flex flex-col space-y-1" }, label && /* @__PURE__ */ React2.createElement("label", { className: "font-medium text-gray-700" }, label), /* @__PURE__ */ React2.createElement(
    "select",
    __spreadValues({
      className: `border rounded-md px-3 py-2 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? "border-red-500" : "border-gray-300"} ${className}`
    }, props),
    options.map((option) => /* @__PURE__ */ React2.createElement("option", { key: option.value, value: option.value }, option.label))
  ), error && /* @__PURE__ */ React2.createElement("p", { className: "text-red-500 text-sm" }, error));
};
var Checkbox = (_a) => {
  var _b = _a, { label, className } = _b, props = __objRest(_b, ["label", "className"]);
  return /* @__PURE__ */ React2.createElement("div", { className: "flex items-center space-x-2 cursor-pointer" }, /* @__PURE__ */ React2.createElement("input", __spreadValues({ type: "checkbox", className: "w-4 h-4" }, props)), label && /* @__PURE__ */ React2.createElement("span", { className: "text-gray-700" }, label));
};
export {
  button_default as Button,
  Checkbox,
  Input,
  Select
};
