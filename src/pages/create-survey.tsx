"use client";

import React, { lazy, Suspense, useState } from "react";
import Dialog from "@mui/material/Dialog";
import { Metadata } from "next";
import BreadCrumb from "@/components/table/bread-crumb";
import Filter from "@/components/table/filter";
import SelectMenu from "@/components/inputComponents/selectMenu";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useRouter } from "next/navigation";
import TextInput from "@/components/inputComponents/textInput";
import TextArea from "@/components/inputComponents/texArea";
import { useFormik } from "formik";
import * as Yup from "yup";
import HeaderText from "@/components/textComponents/headerText";
import LabelText from "@/components/labelText";
import styled from "@emotion/styled";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CustomButton from "@/components/customButton";

const CreateSurvey = () => {
  const [searchValue, setSearchValue] = useState("");
  const [allSelect, setSelect] = useState(false);
  const [manageOpen, setManageOpen] = useState(false);
  const router = useRouter();

  const SeperaterText = styled.p`
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    &::before,
    ::after {
      content: "";
      height: 2.25px;
      width: 15rem;
      background-color: #3d7ffa;
      display: block;
    }
    &::before {
      margin-right: 1rem;
    }
    &::after {
      margin-left: 1rem;
    }
  `;

  const blueText = {
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "16px",
    letterSpacing: "0.05em",
  };

  const SignInSchema = Yup.object().shape({
    email: Yup.string()
      .required("Please enter a valid email address.")
      .email("Email is invalid"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: SignInSchema,
    onSubmit: (values: any) => {},
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
      <div className="p-5">
        <div className="px-4">
          <div className="flex justify-between">
            <BreadCrumb classes={` font-bold text-[#43424D]`} />
          </div>
          <div className="flex justify-between ">
            <div className="w-full">
              <TextInput
                classes={` py-0 pt-2`}
                required
                label={"Survey name"}
                name="email"
                value={values}
                onblur={handleBlur}
                touched={touched}
                handleChange={handleChange}
                error={errors}
                placeholder=""
                customStyle={{
                  background: "#F7F7F7",
                }}
              />
              <p className="px-4 py-2">
                <span>{`Created date :`}</span>
                <span>{` 20/05/2023`}</span>
              </p>
            </div>
            <div className="w-full">
              <TextArea
                classes={` py-0 pt-2`}
                customStyle={{
                  background: "#F7F7F7",
                }}
                required
                label={"Survey description"}
                name="email"
                value={values}
                onblur={handleBlur}
                touched={touched}
                handleChange={handleChange}
                error={errors}
                placeholder="Type regulation description here"
              />
            </div>
          </div>
          <div className="w-[65%] m-auto">
            <div className="w-fill flex justify-start">
              <LabelText classes={`w-full`} labelName={`Start date`} />
              <LabelText classes={`w-full`} labelName={`End date`} />
            </div>
            <div className="bg-lGrey w-full flex mt-[1rem] px-[2rem] py-[1rem]">
              <div className="w-full">
                <TextInput
                  label={""}
                  name="joiningDate"
                  type="date"
                  value={values}
                  handleChange={(e: any) => {
                    console.log(e.target.value);
                  }}
                />
              </div>
              <div className="w-full">
                <TextInput
                  label={""}
                  name="relievingDate"
                  type="date"
                  value={values}
                  handleChange={(e: any) => {
                    console.log(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <SeperaterText className="text-primary my-12">{`Regulations`}</SeperaterText>
          <div
            style={{
              borderBottom: "2px solid #D9D9D9",
            }}
            className="flex justify-start gap-x-16 "
          >
            <div
              className=" bg-grey w-[376px] flex flex-col my-[2rem] p-[1rem] relative"
              style={{
                background: "#F7F7F7",
              }}
            >
              <DoNotDisturbOnIcon
                className="flex self-end absolute top-[10px]"
                style={{ color: "red" }}
              />
              <SelectMenu
                labelStyle={{ color: "#3D7FFA" }}
                fieldStyle={{
                  marginTop: "0.5rem",
                  width: "336px",
                }}
                labelname={"Regulation 1"}
                name={""}
                data={[]}
                handleChange={undefined}
                value={values}
                placeHolderText={"Crop Type"}
              />
            </div>
            <CustomButton
              classes={`text-primary`}
              buttonName={`Add Regulation`}
              startIcon={<AddCircleIcon className="text-primary" />}
              customStyle={{
                background: "none",
                padding: "1rem 3rem",
                color: "#3D7FFA",
              }}
              handleOnClick={() => {
                handleSubmit();
              }}
            />
          </div>
          <SeperaterText className="text-primary my-12">{`Crop types`}</SeperaterText>
          <div
            style={{
              borderBottom: "2px solid #D9D9D9",
            }}
          >
            <div className="flex justify-start gap-x-16 my-[2rem]">
              <div
                className=" bg-grey w-[406px] flex flex-col mt-[1rem] px-[1rem] py-[1rem] relative"
                style={{
                  background: "#F7F7F7",
                }}
              >
                <DoNotDisturbOnIcon
                  className="flex self-end absolute top-[10px]"
                  style={{ color: "red" }}
                />
                <SelectMenu
                  labelStyle={{ color: "#3D7FFA" }}
                  fieldStyle={{
                    marginTop: "0.5rem",
                    width: "336px",
                  }}
                  labelname={"FCV"}
                  name={""}
                  data={[]}
                  handleChange={undefined}
                  value={values}
                  placeHolderText={"Burley"}
                />
              </div>
              <CustomButton
                classes={`text-primary`}
                buttonName={`Add crop type`}
                startIcon={<AddCircleIcon className="text-primary" />}
                customStyle={{
                  background: "none",
                  padding: "1rem 3rem",
                  color: "#3D7FFA",
                }}
                handleOnClick={() => {
                  handleSubmit();
                }}
              />
            </div>
            <div className="flex justify-start gap-x-16 my-[2rem]">
              <div
                className=" bg-grey w-[406px] flex flex-col my-[1rem] px-[1rem] py-[1rem] relative"
                style={{
                  background: "#F7F7F7",
                }}
              >
                <DoNotDisturbOnIcon
                  className="flex self-end absolute top-[10px]"
                  style={{ color: "red" }}
                />
                <SelectMenu
                  labelStyle={{ color: "#3D7FFA" }}
                  fieldStyle={{
                    marginTop: "0.5rem",
                    width: "336px",
                  }}
                  labelname={"Non-FCV"}
                  name={""}
                  data={[]}
                  handleChange={undefined}
                  value={values}
                  placeHolderText={"STP 2.0"}
                />
              </div>
              <CustomButton
                classes={`text-primary`}
                buttonName={`Add crop type`}
                startIcon={<AddCircleIcon className="text-primary" />}
                customStyle={{
                  background: "none",
                  padding: "1rem 3rem",
                  color: "#3D7FFA",
                }}
                handleOnClick={() => {
                  handleSubmit();
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center my-4">
          <CustomButton
            buttonName={`Create Survey`}
            customStyle={{
              padding: "1rem 3rem",
            }}
            handleOnClick={() => {
              handleSubmit();
            }}
          />
        </div>
      </div>
    </>
  );
};
export default CreateSurvey;
