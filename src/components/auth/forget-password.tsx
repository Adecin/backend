import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import LabelText from "@/components/labelText";
import CustomButton from "@/components/customButton";
import TextInput from "@/components/inputComponents/textInput";
import CodeSubmit from "@/components/auth/code-submission";
import { forgetPasswordLink } from "@/redux/reducer/login/forgetPasswordLink";
import { useDispatch, useSelector } from "react-redux";

const SignInSchema = Yup.object().shape({
  companyEmailId: Yup.string()
    .test("valid-email", "Enter a valid email address", (value) => {
      if (!value) return false;

      return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(value);
    })
    .required("Email is required"),
});

export default function ForegetPasswordComp(props: any) {
  const [showForm, setShowForm] = useState(true);
  const dispatch = useDispatch();

  const ForgetPasswordResponse = useSelector(
    (state: any) => state.ForgetPassword
  );

  const formik = useFormik({
    initialValues: {
      companyEmailId: "",
    },
    validationSchema: SignInSchema,
    onSubmit: (values) => {
      dispatch(forgetPasswordLink(values));
    },
  });

  useEffect(() => {
    if (ForgetPasswordResponse.isSuccess) {
      setShowForm(false);
    }
  }, [ForgetPasswordResponse]);

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

  const keyPress = (e: any) => {
    if (e.keyCode == 13) {
      handleSubmit();
    }
  };

  return (
    <>
      {showForm ? (
        <div>
          <div
            className="loginDiv bg-[#EBEFF8] rounded-[5px] w-[514px]  py-4"
            style={{ boxShadow: "2px 2px 5px #0000003d" }}
          >
            <p
              className="text-primary text-[24px] font-medium pt-4 mt-3 pb-2"
              style={{
                fontSize: "16px",
                fontWeight: "500",
                lineHeight: "18.75px",
                textAlign: "center",
              }}
            >
              {`Forgot Password ?`}
            </p>
            <div className="text-center mt-10">
              <p
                style={{
                  fontFamily: "Roboto",
                  fontWeight: 600,
                  fontSize: "14px",
                  letterSpacing: "5%",
                  color: "#43424D",
                  lineHeight: "20.54px",
                }}
              >
                Enter Your Email
              </p>
            </div>

            <div className="px-5 my-1 w-full">
              <div className="w-full py-2">
                <LabelText
                  customStyle={{
                    textAlign: "center",
                    fontWeight: 400,
                    fontSize: "14px",
                  }}
                  labelName={`You Will Recieve a Verifiation Code`}
                />
                <TextInput
                  value={values}
                  name="companyEmailId"
                  onblur={handleBlur}
                  handleChange={handleChange}
                  touched={touched}
                  error={errors}
                  label=""
                  placeholder="Enter company mail ID"
                />
              </div>
              <div className="flex justify-center px-4 ">
                <div style={{ width: "150px" }}>
                  <CustomButton
                    classes={`w-full  py-3`}
                    handleOnClick={() => {
                      handleSubmit();
                    }}
                    buttonName={`Send Code`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <CodeSubmit companyEmailId={values.companyEmailId} />
      )}
    </>
  );
}
