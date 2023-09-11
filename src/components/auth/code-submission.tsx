import { useState, useEffect } from "react";
import CustomButton from "../customButton";
import { blue } from "@mui/material/colors";
import ResetPassword from "./reset-password";
import { verifyLoginOTP } from "@/redux/reducer/login/verifyOtp";
import { dispatch } from "@/redux/store";
import { forgetPasswordLink } from "@/redux/reducer/login/forgetPasswordLink";
import { useSelector } from "react-redux";

export default function CodeSubmit(props: any) {
  const { companyEmailId } = props;
  const [submitted, setSubmitted] = useState(false);
  const [otp, setOtp] = useState(new Array(5).fill(""));

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
    document.addEventListener("keypress", keyPress, true);
  }, []);

  const otpNotNull = (item: any) => item !== ``;

  const resendOTP = (value: any) => {
    dispatch(forgetPasswordLink(value));
  };

  const handleSubmit = () => {
    const otpNumber = Number(otp.join(""));
    dispatch(
      verifyLoginOTP({ companyEmailId: companyEmailId, emailOtp: otpNumber })
    );
  };

  const VerifyState = useSelector((state: any) => state.VerifyPasswordState);

  useEffect(() => {
    if (VerifyState.isSuccess) {
      setSubmitted(true);
    }
  }, [VerifyState]);

  return (
    <>
      {!submitted ? (
        <div
          className="loginDiv bg-[#EBEFF8] rounded-[5px] w-[514px]  py-4"
          style={{ boxShadow: "2px 2px 5px #0000003d" }}
        >
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
          <h2
            className="text-[14px] text-grey font-normal pt-4 mt-3 mb-3 pb-2"
            style={{
              lineHeight: "18px",
              letterSpacing: "0.1em",
              textAlign: "center",
            }}
          >{`A Code has been sent to your Email`}</h2>
          <div className="flex gap-4 justify-center mt-3">
            {otp.map((data, index) => {
              return (
                <input
                  className="otp-field border-[1px] border-solid border-primary rounded-[2px] text-center"
                  type="text"
                  name="otp"
                  maxLength={1}
                  key={index}
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onFocus={(e) => e.target.select()}
                  style={{
                    width: "25px",
                    height: "25px",
                    backgroundColor: /^\d+$/.test(data)
                      ? "#3D7FFA"
                      : "transparent",
                    color: /^\d+$/.test(data) ? "white" : "black",
                  }}
                />
              );
            })}
          </div>
          <p
            className="text-[12px] font-normal pt-4 mt-3 pb-2"
            style={{
              lineHeight: "15px",
              letterSpacing: "0.1em",
              textAlign: "center",
            }}
          >
            <span className="text-grey pr-1">{`Didn't receive Code`}</span>

            <CustomButton
              classes={`text-primary pl-1 cursor-pointer underline`}
              customStyle={{
                background: "none",
                color: "#3D7FFA",
              }}
              buttonName={`Send again`}
            />
          </p>
          <div className="w-full flex justify-center gap-x-6 px-3">
            <CustomButton
              classes={`m-auto py-2 px-[2rem] my-3 text-[#fff]`}
              disable={!otp.every(otpNotNull)}
              customStyle={
                otp.every(otpNotNull)
                  ? {
                      textTransform: "none",
                      fontSize: "16px",
                      background: "#3D7FFA",
                    }
                  : {
                      textTransform: "none",
                      fontSize: "16px",
                      background: "#8585853d",
                    }
              }
              handleOnClick={handleSubmit}
              buttonName={`Verify`}
            />
          </div>
        </div>
      ) : (
        <ResetPassword companyEmailId={companyEmailId} />
      )}
    </>
  );
}
