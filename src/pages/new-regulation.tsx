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
import * as Yup from 'yup';
import HeaderText from "@/components/textComponents/headerText";
import LabelText from "@/components/labelText";
import styled from "@emotion/styled";
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CustomButton from "@/components/customButton";

const CreateSurvey = () => {
    const [searchValue, setSearchValue] = useState("");
    const [allSelect, setSelect] = useState(false);
    const [manageOpen, setManageOpen] = useState(false);
    const router = useRouter();

    const SeperaterText = styled.p`
    font-size: 16px;
    line-height: 24px;
    font-weight:500;
    display: flex;
    justify-content: center;
    align-items: center;
    &::before,
    ::after {
      content: '';
      height: 2.25px;
      width: 15rem;
      background-color: #3D7FFA;
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
    }

    const SignInSchema = Yup.object().shape({
        email: Yup.string()
            .required('Please enter a valid email address.')
            .email('Email is invalid'),

    });

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: SignInSchema,
        onSubmit: (values: any) => {
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
            <div className="p-5">
                <div className="px-4">
                    <div className="flex justify-between">
                        <BreadCrumb classes={` font-bold text-[#43424D]`} />
                    </div>
                    <div className="flex justify-between ">
                        <div className='w-full'>
                            <TextInput
                                classes={` py-0 pt-2`}
                                required
                                label={"Regulation name"}
                                name="email"
                                value={values}
                                onblur={handleBlur}
                                touched={touched}
                                handleChange={handleChange}
                                error={errors}
                                placeholder="Type regulation name here"
                                customStyle={{
                                    background: "#F7F7F7",
                                }}
                            />
                        </div>
                        <div className='w-full'>
                            <TextArea
                                classes={` py-0 pt-2`}
                                customStyle={{
                                    background: "#F7F7F7",
                                }}
                                required
                                label={"Regulation description"}
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
                    <div className="py-5" style={{
                        borderBottom: "2px solid #D9D9D9"
                    }}>
                        <SeperaterText className="text-primary my-12" >{`Sub category`}</SeperaterText>

                        <div className="flex justify-between ">
                            <div className='w-full'>
                                <TextInput
                                    classes={` py-0 pt-2`}
                                    required
                                    label={"Category name"}
                                    name="email"
                                    value={values}
                                    onblur={handleBlur}
                                    touched={touched}
                                    handleChange={handleChange}
                                    error={errors}
                                    placeholder="Type category name here"
                                    customStyle={{
                                        background: "#F7F7F7",
                                    }}
                                />
                            </div>
                            <div className='w-full'>
                                <TextArea
                                    classes={` py-0 pt-2`}
                                    customStyle={{
                                        background: "#F7F7F7",
                                    }}
                                    required
                                    label={"Category description"}
                                    name="email"
                                    value={values}
                                    onblur={handleBlur}
                                    touched={touched}
                                    handleChange={handleChange}
                                    error={errors}
                                    placeholder="Type category description here"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="py-3" style={{
                        borderBottom: "2px solid #D9D9D9"
                    }}>
                        <CustomButton
                            classes={`text-primary `}
                            buttonName={`Add sub category`}
                            startIcon={<AddCircleIcon className="text-primary" />}
                            customStyle={{
                                background: "none",
                                padding: "1rem 3rem",
                                color: "#3D7FFA",
                            }}
                            handleOnClick={() => {
                            }}
                        />
                    </div>
                </div>
                <div className="flex justify-center my-[3rem] p-[2rem]">
                    <CustomButton
                        buttonName={`Create regulations `}
                        customStyle={{
                            padding: "1rem 3rem"
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

// manage popup or dialog;