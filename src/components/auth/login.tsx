import { useState, useEffect } from "react";
import { Formik, useFormik } from "formik";
import React from "react";
import styled from "@emotion/styled";
import { styled as muIstyle } from "@mui/material";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useRouter } from "next/router";
import CustomButton from "../customButton";
import TextInput from "../inputComponents/textInput";
import { userLogin } from "@/redux/reducer/login/login";

export default function AppLogin(props: any) {
  const dispatch = useDispatch();
  const router = useRouter();

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
    if (e.keyCode == 13) {
      // put the login here
      handleSubmit();
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
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
            handleOnClick={() => {
              router.push("/forget-password");
            }}
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
    </>
  );
}
