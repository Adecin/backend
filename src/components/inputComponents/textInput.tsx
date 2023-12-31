"use client";
import React from "react";
interface InputTypes {
  label: string;
  error?: any;
  handleChange: any;
  name: string;
  placeholder?: string;
  onblur?: any;
  touched?: any;
  type?: string;
  customStyle?: any;
  labelStyle?: any;
  classes?: any;
  required?: boolean;
  value?: any;
  readOnly?: any;
  max?: any;
  min?: any;
  onKeyDown?: any;
}

const TextInput = (props: InputTypes) => {
  const {
    label,
    error,
    onblur,
    touched,
    handleChange,
    placeholder,
    name,
    value,
    type,
    customStyle,
    classes,
    required,
    labelStyle,
    readOnly,
    max,
    min,
    onKeyDown,
  } = props;
  return (
    <>
      <div className={`flex flex-col p-3 ${classes}`}>
        <label className={`text-grey pb-1 capitalize `}>
          <span style={labelStyle}>{label ?? ""}</span>{" "}
          {required ? <span className="text-error">*</span> : ""}{" "}
        </label>
        <input
          className={`w-full px-2 py-3 placeholder-gray-400 placeholder-opacity-25  outline-none rounded-[5px] ${
            touched && touched[name] && error && error[name]
              ? "text-error border-2 border-error"
              : ""
          }`}
          readOnly={readOnly}
          placeholder={placeholder ?? "Enter text"}
          onBlur={onblur}
          name={name}
          onKeyDown={onKeyDown}
          type={type}
          onChange={handleChange}
          style={customStyle}
          value={value[name] ?? value}
          max={max}
          min={min}
        />
        <span className="text-[10px] my-1 text-error">
          {(touched && touched[name] && error && error[name]) ?? ""}
        </span>
      </div>
    </>
  );
};

export default TextInput;
