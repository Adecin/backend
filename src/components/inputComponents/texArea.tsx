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
  } = props;

  return (
    <>
      <div className="flex flex-col  p-4 ">
        <label
          className="pb-1 text-[#858585] leading-[18.75px] font-normal capitalize"
          style={{ ...labelStyle }}
        >
          {label}{" "}
          {required ? (
            <span
              style={{
                color: "#ff2626",
              }}
            >
              *
            </span>
          ) : (
            ""
          )}{" "}
        </label>
        <textarea
          style={{
            resize: resizeValue,
          }}
          className={`w-full px-2 py-3 placeholder-gray-400 placeholder-opacity-25 outline-none rounded-[5px] h-[100px] ${
            touched && touched[name] && error && error[name]
              ? "text-error border-2 border-error"
              : ""
          }`}
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
}
