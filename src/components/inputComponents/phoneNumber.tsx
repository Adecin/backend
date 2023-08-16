"use client";
import React, { useState } from "react";
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
  classes?: any;
  value?: any;
}

const PhoneNumber = (props: InputTypes) => {
  const [CountryCode, setCountryCode] = useState("91");
  const {
    label,
    error,
    onblur,
    touched,
    handleChange,
    placeholder,
    name,
    type,
    customStyle,
    classes,
    value,
  } = props;
  return (
    <>
      <div className={`flex flex-col p-4 ${classes}`}>
        <label className={`text-grey pb-1 capitalize `}>{label ?? ""}</label>
        <div className="flex items-center">
          <select
            onChange={(e) => {
              setCountryCode(e.target.value);
            }}
            className="py-4 px-2 bg-[#FBFBFB] rounded-l-[5px]"
            value={CountryCode}
          >
            <option value={"+91"}>+91</option>
          </select>
          <input
            className={`w-full px-2 py-3 placeholder-gray-400 placeholder-opacity-25  outline-none rounded-r-[5px] ${
              touched && touched[name] && error && error[name]
                ? "text-error border-2 border-error"
                : ""
            }`}
            placeholder={placeholder ?? "Enter text"}
            onBlur={onblur}
            name={name}
            type={type}
            value={(value && value[name]) ?? ""}
            onChange={handleChange}
            style={customStyle}
          />
        </div>
        <span className="text-[10px] my-1 text-error">
          {(touched && touched[name] && error && error[name]) ?? ""}
        </span>
      </div>
    </>
  );
};

export default PhoneNumber;
