import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { styled as muIstyle } from "@mui/material";
import { Checkbox, FormControlLabel } from "@mui/material";
import styled from "@emotion/styled";
import CustomButton from "../customButton";
import TextInput from "../inputComponents/textInput";

export default function ResetComp(props: any) {
    const { onClose } = props;

    const passwordSchema = Yup.object().shape({
        confirm_password: Yup.string()
            .required("Please fill the confirm password.")
            .oneOf([Yup.ref("new_password")], "Password must match"),
        new_password: Yup.string()
            .required("Please fill the password.")
            .min(6, "Password must be at least 6 characters")
            .max(40, "Password must not exceed 40 characters")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
                "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            ),
    });

    const formik = useFormik({
        initialValues: {
            new_password: "",
            confirm_password: "",
        },
        validationSchema: passwordSchema,
        onSubmit: () => {
            window.alert(`submitted for new password`);
            onClose();
        },
    });

    //  formik values
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
            handleSubmit();
        }
    };

    // useEffect
    useEffect(() => {
        // get keyboard event listener
        document.addEventListener("keypress", keyPress, true);
    }, []);

    return (
        <div className="loginContainer m-auto bg-[#EBEFF8] rounded-[5px] w-[514px] py-4 my-[2rem]" >
            <p
                style={{
                    color: "#232323",
                    fontSize: "16px",
                    lineHeight: "24px",
                    letterSpacing: "0.1em",
                    fontWeight: "600",
                }}
                className="text-center my-2 py-2"
            >
                {`Reset password`}
            </p>
            <div className="px-5">
                <div className="w-[100%] py-1">
                    <TextInput
                        classes={` py-0 pt-2`}
                        type={`password`}
                        value={values}
                        name="new_password"
                        onblur={handleBlur}
                        touched={touched}
                        handleChange={handleChange}
                        error={errors}
                        label="New Password"
                        placeholder="Type new password"
                    />
                </div>
                <div className="w-[100%] py-1">
                    <TextInput
                        classes={` py-0 pt-2`}
                        type={`password`}
                        value={values}
                        name="confirm_password"
                        onblur={handleBlur}
                        touched={touched}
                        handleChange={handleChange}
                        error={errors}
                        label="Confirm Password"
                        placeholder="Confirm new password" />
                </div>
                <div className="w-full flex gap-x-6 px-3 my-4">
                    <CustomButton
                        classes={` w-full py-3 text-[#fff]`}
                        customStyle={{
                            textTransform: "none",
                            fontSize: "16px",
                            background: "#858585",
                        }}
                        handleOnClick={() => { handleSubmit(); }}
                        buttonName={`Cancel`}
                    />
                    <CustomButton
                        classes={` w-full py-3`}
                        handleOnClick={() => { handleSubmit(); }}
                        buttonName={`Save`}
                    />
                </div>
            </div>
        </div>
    );
};
