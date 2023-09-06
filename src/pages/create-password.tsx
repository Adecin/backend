import * as Yup from "yup";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import CustomButton from "@/components/customButton";
import TextInput from "@/components/inputComponents/textInput";
export default function ResetPassword(props: any) {
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
          <div className="loginContainer m-auto bg-[#EBEFF8] rounded-[5px] w-[514px] py-4">
            <p
              style={{
                color: "#3D7FFA",
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
                  required
                  labelStyle={{ fontWeight: 700, color: "#43424D" }}
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
                  required
                  labelStyle={{ fontWeight: 700, color: "#43424D" }}
                  type={`password`}
                  value={values}
                  name="confirm_password"
                  onblur={handleBlur}
                  touched={touched}
                  handleChange={handleChange}
                  error={errors}
                  label="Confirm Password"
                  placeholder="Confirm new password"
                />
              </div>
              <div className="w-full justify-center flex gap-x-6 px-3 my-4">
                <CustomButton
                  classes={` w-full py-3 text-[#fff]`}
                  labelStyle={{ fontWeight: 400 }}
                  customStyle={{
                    textTransform: "none",
                    fontSize: "14px",
                    background: "#858585",
                    width: "130px",
                  }}
                  handleOnClick={() => {
                    handleSubmit();
                  }}
                  buttonName={`Cancel`}
                />

                <CustomButton
                  classes={` w-full py-3`}
                  handleOnClick={() => {
                    handleSubmit();
                  }}
                  labelStyle={{ fontWeight: 400 }}
                  customStyle={{
                    fontSize: "14px",
                    width: "130px",
                  }}
                  buttonName={`Reset`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
