import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import LabelText from "../labelText";
import CustomButton from "../customButton";
import TextInput from "../inputComponents/textInput";

const SignInSchema = Yup.object().shape({
        phoneNo: Yup.string()
        .matches(/^[0-9]+$/, 'Must be only digits')
        .min(10, 'Must be exactly 10 digits')
        .max(10, 'Must be exactly 10 digits')
        .required('Mobile Number is required'),
});

export default function ForegetPasswordComp(props: any) {

    const { resetPop, closeReset } = props;

    const formik = useFormik({
        initialValues: {
            phoneNo: "",
        },
        validationSchema: SignInSchema,
        onSubmit: (values) => {
            console.log(`values`, values)
            resetPop();
        },
    });

    // useEffect
    useEffect(() => {
        // get keyboard event listener
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
            handleSubmit();
        }
    };

    return (
        <>
            <div className="flex m-auto bg-[#EBEFF8] rounded-[5px] w-[514px] flex flex-col py-4 my-[5rem]" >
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
                    {`Forgot password ?`}
                </p>
                <div className="px-5 my-1 w-full">
                    <div className="w-full py-2">
                        <LabelText customStyle={{ textAlign: "center" }} labelName={`Please enter your registered mobile number`} />
                        <TextInput
                            value={values}
                            name="phoneNo"
                            onblur={handleBlur}
                            handleChange={handleChange}
                            touched={touched}
                            error={errors}
                            label=""
                            placeholder="Enter mobile number"
                        />
                    </div>
                    <div className='w-full px-4 '>
                        <CustomButton
                            classes={` w-full py-3`}
                            handleOnClick={() => { handleSubmit(); }}
                            buttonName={`Get OTP`}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};