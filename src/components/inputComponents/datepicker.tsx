"use client";
import React, { useRef } from "react";
interface InputTypes {
  label: string;
  error?: any;
  handleChange: any;
  name: string;
  placeholder?: string;
  onblur?: any;
  required?: boolean;
  touched?: any;
}

const DatePicker = (props: InputTypes) => {
  const {
    label,
    required,
    error,
    onblur,
    touched,
    handleChange,
    placeholder,
    name,
  } = props;

  return (
    <>
      <div className="flex flex-col  p-4 ">
        <label className={`text-grey pb-1 capitalize `}>
          {label ?? ""}
          <span>{required ? "*" : ""}</span>
        </label>
        <input
          className={`w-full px-2 py-3 placeholder-gray-400 placeholder-opacity-25  outline-none rounded-[5px] ${
            touched && touched[name] && error && error[name]
              ? "text-error border-2 border-error"
              : ""
          }`}
          type="date"
          placeholder={placeholder ?? "Enter text"}
          onBlur={onblur}
          name={name}
          onChange={handleChange}
        />
        <span className="text-[10px] my-1 text-error">
          {(touched && touched[name] && error && error[name]) ?? ""}
        </span>
      </div>
    </>
  );
};

export default DatePicker;
