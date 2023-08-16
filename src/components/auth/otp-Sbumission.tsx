import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "@emotion/styled";
import CustomButton from "../customButton";

export default function OtpSubmit(props: any) {
    const { onClose, setpasswordPop } = props;

    const [otp, setOtp] = useState(new Array(4).fill(""));

    const handleChange = (element: any, index: number) => {
        if (isNaN(element.value)) return false;
        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
        //Focus next input
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    // enter button submit
    const keyPress = (e: any) => {
        if (e.keyCode == 13) {
        }
    };

    // useEffect
    useEffect(() => {
        // get keyboard event listener
        document.addEventListener("keypress", keyPress, true);
    }, []);

    const otpNotNull = (item: any) => item !== ``;

    return (
        <div className="loginContainer flex flex-col items-center m-auto bg-[#EBEFF8] rounded-[5px] w-[514px] py-4" >
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
            <h2 className='text-[14px] text-grey font-normal pt-4 mt-3 pb-2' style={{
                lineHeight: "18px",
                letterSpacing: "0.1em",
                textAlign: "center",
            }}>{`OTP has been sent to your mobile number`}</h2>
            <div className="flex gap-4">
                {otp.map((data, index) => {
                    return (
                        <input
                            className="otp-field border-[1px] border-solid border-primary rounded-[2px] text-center"
                            type="text"
                            name="otp"
                            maxLength={1}
                            key={index}
                            value={data}
                            onChange={e => handleChange(e.target, index)}
                            onFocus={e => e.target.select()}
                            style={{
                                width: "25px",
                                height: "25px"
                            }}
                        />
                    );
                })}
            </div>
            <p className='text-[12px] font-normal pt-4 mt-3 pb-2' style={{
                lineHeight: "15px",
                letterSpacing: "0.1em",
                textAlign: "center",
            }}><span className="text-grey pr-1">{`Didn't receive OTP`}</span><span className="text-primary pl-1 cursor-pointer underline">{`Resend again?`}</span></p>
            <div className="w-full flex justify-center gap-x-6 px-3">
                <CustomButton
                    classes={`m-auto py-2 px-[2rem] my-3 text-[#fff]`}
                    disable={!(otp.every(otpNotNull))}
                    customStyle={(otp.every(otpNotNull)) ? {
                        textTransform: "none",
                        fontSize: "16px",
                        background: "#3D7FFA",
                    } : {
                        textTransform: "none",
                        fontSize: "16px",
                        background: "#8585853d",
                    }}
                    handleOnClick={() => {
                        alert("Entered OTP is " + otp.join(""));
                        onClose();
                        setpasswordPop();
                    }}
                    buttonName={`verify`}
                />
            </div>
        </div>
    );
};
