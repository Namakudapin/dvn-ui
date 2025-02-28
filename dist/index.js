"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
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
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/components/ui/index.ts
var index_exports = {};
__export(index_exports, {
  Button: () => button_default,
  Checkbox: () => Checkbox,
  Input: () => Input,
  Select: () => Select
});
module.exports = __toCommonJS(index_exports);

// src/components/ui/button.tsx
var import_react = __toESM(require("react"));
var import_lucide_react = require("lucide-react");
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
  return /* @__PURE__ */ import_react.default.createElement(
    "button",
    __spreadValues({
      className: `${baseStyles} ${variants[variant]} ${className}`,
      style: {
        backgroundColor: color || void 0,
        color: textColor || (variant === "primary" ? "black" : "white")
      },
      disabled: variant === "disabled" || isLoading
    }, props),
    isLoading && /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Loader2, { className: "w-5 h-5 animate-spin" }),
    icon && /* @__PURE__ */ import_react.default.createElement("span", null, icon),
    children && /* @__PURE__ */ import_react.default.createElement("span", null, children)
  );
};
var button_default = Button;

// src/components/ui/form.tsx
var import_react2 = __toESM(require("react"));
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
  const [showPassword, setShowPassword] = (0, import_react2.useState)(false);
  return /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex flex-col space-y-1" }, label && /* @__PURE__ */ import_react2.default.createElement("label", { className: "font-medium text-gray-700" }, label), /* @__PURE__ */ import_react2.default.createElement("div", { className: "relative" }, /* @__PURE__ */ import_react2.default.createElement(
    "input",
    __spreadValues({
      type: type === "password" && showPassword ? "text" : type,
      className: `border rounded-md px-3 py-2 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? "border-red-500" : "border-gray-300"} ${className}`
    }, props)
  ), type === "password" && /* @__PURE__ */ import_react2.default.createElement(
    "button",
    {
      type: "button",
      className: "absolute right-3 top-2 text-gray-600",
      onClick: () => setShowPassword(!showPassword)
    },
    showPassword ? "\u{1F648}" : "\u{1F441}"
  )), error && /* @__PURE__ */ import_react2.default.createElement("p", { className: "text-red-500 text-sm" }, error));
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
  return /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex flex-col space-y-1" }, label && /* @__PURE__ */ import_react2.default.createElement("label", { className: "font-medium text-gray-700" }, label), /* @__PURE__ */ import_react2.default.createElement(
    "select",
    __spreadValues({
      className: `border rounded-md px-3 py-2 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? "border-red-500" : "border-gray-300"} ${className}`
    }, props),
    options.map((option) => /* @__PURE__ */ import_react2.default.createElement("option", { key: option.value, value: option.value }, option.label))
  ), error && /* @__PURE__ */ import_react2.default.createElement("p", { className: "text-red-500 text-sm" }, error));
};
var Checkbox = (_a) => {
  var _b = _a, { label, className } = _b, props = __objRest(_b, ["label", "className"]);
  return /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex items-center space-x-2 cursor-pointer" }, /* @__PURE__ */ import_react2.default.createElement("input", __spreadValues({ type: "checkbox", className: "w-4 h-4" }, props)), label && /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-gray-700" }, label));
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Button,
  Checkbox,
  Input,
  Select
});
