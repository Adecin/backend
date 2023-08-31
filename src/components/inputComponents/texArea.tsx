"use client";
import React from "react";
interface propsType {
  label: string;
  labelStyle?: any;
  error?: any;
  handleChange: any;
  name: string;
  placeholder?: string;
  onblur?: any;
  touched?: any;
  resizeValue?: any;
  required?: boolean;
  value?: any;
  classes?: any;
  customStyle?: any;
  readOnly?: any;
}

export default function TextArea(props: propsType) {
  const {
    label,
    labelStyle,
    error,
    onblur,
    touched,
    handleChange,
    placeholder,
    name,
    resizeValue,
    required,
    classes,
    value,
    customStyle,
    readOnly = false,
  } = props;

  return (
    <>
      <div className={`flex flex-col  p-4` + classes}>
        <label
          className="pb-1 text-[#858585] leading-[18.75px] font-normal capitalize"
          style={{ ...labelStyle }}
        >
          {label} {required ? <span className="text-error">*</span> : ""}{" "}
        </label>
        <textarea
          style={{
            resize: resizeValue,
            ...customStyle,
          }}
          readOnly={readOnly}
          className={`w-full px-2 py-3 placeholder-gray-400 placeholder-opacity-25 outline-none rounded-[5px] h-[100px] ${
            touched && touched[name] && error && error[name]
              ? "text-error border-2 border-error"
              : ""
          }`}
          placeholder={placeholder ?? "Enter text"}
          onBlur={onblur}
          name={name}
          onChange={handleChange}
          value={(value && value[name]) ?? value}
        />
        <span className="text-[10px] my-1 text-error">
          {(touched && touched[name] && error && error[name]) ?? ""}
        </span>
      </div>
    </>
  );
}
