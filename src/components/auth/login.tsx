/**
 * login page to for both Relationship Manager and Admin
 * author: azar
 */
import { useState, useEffect } from "react";
import mainLogo from "../../../assets/mainLogo.png";
import { Formik, useFormik } from "formik";
import Image from "next/image";
import React from "react";
import styled from "@emotion/styled";
import { Button, Checkbox, FormControlLabel, Link } from "@mui/material";
import { styled as muIstyle } from "@mui/material";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useRouter } from "next/router";
import CustomButton from "../customButton";
import TextInput from "../inputComponents/textInput";
import { userLogin } from "@/redux/reducer/login/login";

export default function AppLogin(props: any) {
  const { forgrtLink } = props;
  const dispatch = useDispatch();

  const SignInSchema = Yup.object().shape({
    companyEmailId: Yup.string()
      .required("Please enter a valid email address.")
      .email("Email is invalid"),
    password: Yup.string()
      .required("Please enter a valid password.")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
  });

  const formik = useFormik({
    initialValues: {
      companyEmailId: "",
      password: "",
    },
    validationSchema: SignInSchema,
    onSubmit: (values: any) => {
      console.log(`values`, values);
      loginSubmit(values);
    },
  });

  const loginSubmit = (values: any) => {
    dispatch(userLogin(values));
  };

  useEffect(() => {
    document.addEventListener("keypress", keyPress, true);
  }, []);

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    setFieldValue,
    resetForm,
    errors,
  } = formik;

  // enter button submit
  const keyPress = (e: any) => {
    // console.log("value", e);
    if (e.keyCode == 13) {
      // put the login here
      handleSubmit();
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div
        className="bg-[#EBEFF8] w-[130px] h-[130px] text-primary text-center rounded-[50%] flex items-center justify-center"
        style={{
          fontSize: "30px",
          fontWeight: "500",
          lineHeight: "35px",
          letterSpacing: "0.1em",
          boxShadow: "2px 2px 5px #0000003d",
        }}
      >
        {`DTE`}
      </div>
      <div className="flex flex-col m-auto my-[3rem] items-center">
        <svg
          width="535"
          height="10"
          viewBox="0 0 535 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="535" height="10" rx="5" fill="#426CFF" />
        </svg>
        <div
          className="loginDiv bg-[#EBEFF8] rounded-[5px] w-[514px]  py-4"
          style={{ boxShadow: "2px 2px 5px #0000003d" }}
        >
          <h2
            className="text-primary text-[24px] font-medium pt-4 mt-3 pb-2"
            style={{
              lineHeight: "28px",
              letterSpacing: "0.1em",
              textAlign: "center",
            }}
          >{`Hello! Welcome back`}</h2>
          <div className="loginForm flex flex-col items-center my-2 mx-4 p-2">
            <div className="w-full">
              <TextInput
                classes={` py-0 pt-2`}
                required
                label={"Email"}
                labelStyle={{ fontWeight: 600, color: "#43424D" }}
                name="companyEmailId"
                value={values}
                onblur={handleBlur}
                touched={touched}
                handleChange={handleChange}
                error={errors}
                placeholder="Type company mail ID"
              />
            </div>
            <div className=" relative w-full">
              <TextInput
                classes={` py-0 pt-2`}
                label={`Password`}
                labelStyle={{ fontWeight: 600, color: "#43424D" }}
                type={showPassword ? "text" : "password"}
                name="password"
                value={values}
                onblur={handleBlur}
                touched={touched}
                handleChange={handleChange}
                error={errors}
                placeholder={"Type password"}
                required
              />
              {showPassword ? (
                <VisibilityIcon
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  className="text-primary absolute top-12 right-7 cursor-pointer"
                />
              ) : (
                <VisibilityOffIcon
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  className="text-primary absolute top-12 right-7 cursor-pointer"
                />
              )}
            </div>
            <CustomButton
              classes="p-0 w-[10rem] text-primary flex self-end mx-4"
              customStyle={{
                textTransform: "none",
                fontSize: "16px",
                background: "none",
                color: "#3D7FFA",
              }}
              handleOnClick={forgrtLink}
              buttonName={`Forgot Password ?`}
            />
            <div className="w-full pt-4">
              <CustomButton
                classes={` w-full py-3`}
                handleOnClick={() => {
                  handleSubmit();
                }}
                buttonName={`Sign In`}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
