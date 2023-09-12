"use client";

import HeaderText from "@/components/textComponents/headerText";
import { Button, Chip, Dialog, IconButton } from "@mui/material";
import Image from "next/image";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import TextInput from "@/components/inputComponents/textInput";
import TextArea from "@/components/inputComponents/texArea";
import SelectMenu from "@/components/inputComponents/selectMenu";
import { isValidHttpUrl } from "@/components/helpers/helperFunction";
import { Labrada } from "next/font/google";
import CustomButton from "@/components/customButton";
import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import PhoneNumber from "@/components/inputComponents/phoneNumber";
import BreadCrumb from "@/components/table/bread-crumb";
import LabelText from "@/components/labelText";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getDistrict } from "@/redux/reducer/dropdown/get-district";
import { getState } from "@/redux/reducer/dropdown/get-state";
import { getVillage } from "@/redux/reducer/dropdown/get-village";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import updateUser from "@/redux/reducer/user/updateUser";
import { oneUserInfo } from "@/redux/reducer/user/getOneUser";

export default function OfficerProfileAdd(props: any) {
  const [previewImage, setPreviewImage] = useState<any>(null);
  const router = useRouter();
  const params = useSearchParams();
  const user_id: any = params?.get("id");
  const openProfile: any = useRef(null);
  const aadhar: any = useRef(null);
  const education: any = useRef(null);
  const dispatch = useDispatch();
  const pathName = usePathname();

  const gender = [
    { name: "Male", id: "male" },
    { name: "Female", id: "female" },
    { name: "Others", id: "others" },
  ];
  const getOneUser = useSelector((store: any) => store.OneUserState);
  const getOneUserData = getOneUser.response;
  //console.log(`getOneUserData`, getOneUserData);

  const GetState = useSelector((state: any) => state.ListState);
  const GetDistrict = useSelector((state: any) => state.ListDistrict);
  const GetSVillage = useSelector((state: any) => state.ListVillage);

  const UserAddSchema = Yup.object().shape({
    employeeId: Yup.string().required("Employee Id is required"),
    name: Yup.string().required("Name is required"),
    phoneNo: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits")
      .required("Contact number is required"),
    emailId: Yup.string()
      .required("Email is required")
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Enter valid email"
      ),
    companyEmailId: Yup.string()
      .required("Company Email is required")
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Enter valid email"
      ),
    dob: Yup.string().required("Dob is required"),
    gender: Yup.string().required("Gender is required"),
    address: Yup.string().required("Address is required"),
    stateId: Yup.string().required("State is required"),
    districtId: Yup.string().required("District is required"),
    villageId: Yup.string().required("Village is required"),
    pincode: Yup.string()
      .matches(/^[0-9]+$/, "Invalid pincode")
      .min(6, "Must be exactly 6 digits")
      .max(6, "Must be exactly 6 digits")
      .required("Pincode is required"),
    joiningDate: Yup.string().required("Joining Date is required"),
    relievingDate: Yup.string(),
    educationName: Yup.string().required("Education Name is required"),
    maritalStatus: Yup.string().required("Marital status is required"),
    aadharNo: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digis")
      .min(12, "Invalid aadhar number")
      .max(12, "Invalid aadhar number")
      .required("Aadhar card number is required"),
    profileImage: Yup.mixed()
      .test(
        "Profile image required",
        "Profile image required",
        (value: any) => {
          if (value.type) {
            return true;
          } else {
            return false;
          }
        }
      )
      .required("Profile image is required"),
    aadharImage: Yup.mixed()
      .test("Aadhar image required", "Aadhar image required", (value: any) => {
        if (value.type) {
          return true;
        } else {
          return false;
        }
      })
      .required("Aadhar image  is required"),
    educationCertificate: Yup.mixed()
      .test("Certificate required", "Certificate required", (value: any) => {
        if (value.type) {
          return true;
        } else {
          return false;
        }
      })
      .required("Certificate is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      employeeId: getOneUserData?.employeeId ?? "",
      name: getOneUserData?.name ?? "",
      phoneNo: getOneUserData?.phoneNo ?? "",
      emailId: getOneUserData?.emailId ?? "",
      companyEmailId: getOneUserData?.companyEmailId ?? "",
      dob: getOneUserData?.dob ?? "",
      gender: getOneUserData?.gender ?? "",
      address: getOneUserData?.address ?? "",
      stateId: getOneUserData?.stateId?.id ?? "",
      districtId: getOneUserData?.districtId?.id ?? "",
      villageId: getOneUserData?.villageId?.id ?? "",
      pincode: getOneUserData?.pincode ?? "",
      joiningDate: getOneUserData?.joiningDate ?? "",
      relievingDate: getOneUserData?.relievingDate ?? "",
      educationName: getOneUserData?.educationName ?? "",
      educationCertificate: getOneUserData?.educationCertificate ?? "",
      maritalStatus: getOneUserData?.maritalStatus ?? "",
      spouseName: getOneUserData?.spouseName ?? "",
      childrenMale: getOneUserData?.childrenMale ?? "",
      childrenFemale: getOneUserData?.childrenFemale ?? "",
      aadharNo: getOneUserData?.aadharNo ?? "",
      aadharImage: getOneUserData?.aadharImage ?? "",
      profileImage: getOneUserData?.profileImage ?? "",
    },
    validationSchema: UserAddSchema,
    onSubmit: (values: any) => {
      //console.log(`values reg`, values);
      submit(values);
    },
  });

  const submit = (data: any) => {
    const apiFormData = new FormData();

    for (let key in data) {
      apiFormData.append(key, data[key]);
    }
    apiFormData.append("id", user_id);
    apiFormData.append("status", "Approved");
    dispatch(updateUser(apiFormData));
  };

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    setFieldValue,
    setFieldTouched,
    resetForm,
    errors,
  } = formik;

  useEffect(() => {
    dispatch(getState());
    dispatch(getVillage());
    dispatch(getDistrict());
  }, []);

  useEffect(() => {
    dispatch(oneUserInfo(user_id));
  }, [user_id]);

  const stateDropDown = GetState.response?.data?.map(
    (e: any, index: number) => {
      return { id: e.id, name: e.name };
    }
  );
  const districtDropDown = GetDistrict.response?.data?.map(
    (e: any, index: number) => {
      return { id: e.id, name: e.name };
    }
  );
  const villageDropDown = GetSVillage.response?.data?.map(
    (e: any, index: number) => {
      return { id: e.id, name: e.name };
    }
  );
  const todayDate = new Date();

  const marriedDropDown = [
    {
      id: "Single",
      name: "Single",
    },
    {
      id: "Married",
      name: "Married",
    },
    {
      id: "Divorced",
      name: "Divorced",
    },
  ];

  return (
    <div className="p-[3rem]">
      <BreadCrumb lastName="Add Staff" />
      <div className="py-[3rem]  flex flex-col gap-y-8">
        <div className="profileInfo">
          <HeaderText text={`Personal info`} />
          <div className="bg-[#F4F8FF] flex gap-x-6 p-[2rem] mt-[1rem]">
            <div className="imageContainer mt-5">
              <div className="text-grey text-[16px] my-2">
                Profile Photo <span className="text-error">*</span>
              </div>{" "}
              <div className="imageContainer relative flex flex-col bg-[#F5F5F5] h-[136px] w-[136px] my-3 mt-6">
                <img
                  className="m-auto h-full w-full rounded-[50%]"
                  src={
                    previewImage ??
                    values.profileImage ??
                    `/sampleProfileAvatar.svg`
                  }
                  alt="alt"
                  width={100}
                  height={100}
                />
                <IconButton
                  className="m-0 p-0 mr-2 w-6 self-end"
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                  style={{ position: "absolute", marginTop: "6.2rem" }}
                  // onClick={() => {
                  //   openProfile.current.click();
                  // }}
                >
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    ref={openProfile}
                    name={"profileImage"}
                    onChange={(e: any) => {
                      setFieldValue(`profileImage`, e.target.files[0]);
                      setPreviewImage(URL.createObjectURL(e.target.files[0]));
                      setFieldTouched(`profileImage`, true, false);
                    }}
                  />
                  <EditRoundedIcon
                    className="self-end mb-1 mr-1"
                    style={{
                      fontSize: "1.5rem",
                      cursor: "pointer",
                      color: "#FFFFFF",
                      background: "#3D7FFA",
                      borderRadius: "50px",
                    }}
                  />
                </IconButton>
              </div>
              <div className="py-3 text-grey text-center w-[100px] text-[10px] underline-none">
                &nbsp;Supported file format <br /> jpg,png,jpeg.
              </div>
              <div className="py-5 px-0 text-[10px] text-error">
                {/* {touched?.profileImage && errors?.profileImage
                  ? errors?.profileImage ?? ""
                  : ""} */}
              </div>
            </div>
            <div className="w-full grid grid-cols-3">
              <TextInput
                label={"Employee ID"}
                name="employeeId"
                value={values}
                placeholder="Type ID in exact format"
                onblur={handleBlur}
                handleChange={handleChange}
                touched={touched}
                error={errors}
                required={true}
              />
              <TextInput
                label={"Name"}
                name="name"
                value={values}
                placeholder="Type name"
                onblur={handleBlur}
                handleChange={handleChange}
                touched={touched}
                error={errors}
                required={true}
              />
              <PhoneNumber
                label="Phone Number"
                placeholder="Type phone mobile"
                name="phoneNo"
                value={values}
                onblur={handleBlur}
                handleChange={handleChange}
                touched={touched}
                error={errors}
                required={true}
              />
              <TextInput
                label={"Personal mail ID"}
                name="emailId"
                value={values}
                placeholder="Type mail ID"
                onblur={handleBlur}
                handleChange={handleChange}
                touched={touched}
                error={errors}
                required={true}
              />
              <TextInput
                label={"Company mail ID"}
                name="companyEmailId"
                value={values}
                placeholder="Type mail ID"
                onblur={handleBlur}
                handleChange={handleChange}
                touched={touched}
                error={errors}
                required={true}
              />
              <TextInput
                label={"Date of birth"}
                name="dob"
                value={values}
                type="date"
                max={
                  todayDate.getFullYear() +
                  "-" +
                  ("0" + (todayDate.getMonth() + 1)).slice(-2) +
                  "-" +
                  ("0" + todayDate.getDate()).slice(-2)
                }
                onblur={handleBlur}
                handleChange={handleChange}
                touched={touched}
                error={errors}
                required={true}
              />
              <SelectMenu
                classes={`pt-[1rem]`}
                name="gender"
                labelname="Gender"
                placeHolderText="Select Gender"
                data={[
                  {
                    name: "Male",
                    id: "MALE",
                  },
                  {
                    name: "Female",
                    id: "FEMALE",
                  },
                ]}
                value={values}
                handleChange={handleChange}
                onblur={handleBlur}
                touched={touched}
                required={true}
                error={errors}
              />
            </div>
          </div>
        </div>
        <div className="address">
          <HeaderText text={`Address`} required={true} />
          <div className="bg-[#F4F8FF] p-[2rem] mt-[1rem] w-full grid grid-cols-3">
            <TextInput
              value={values}
              label={"House No, street, area"}
              name="address"
              placeholder="Type here"
              onblur={handleBlur}
              handleChange={handleChange}
              touched={touched}
              error={errors}
              required={true}
            />
            <SelectMenu
              classes={`pt-[1rem]`}
              name="stateId"
              labelname="State"
              placeHolderText="Select state"
              data={stateDropDown ?? []}
              value={values}
              handleChange={(e: any) => {
                dispatch(getDistrict("?stateId=" + e.target.value));
                setFieldValue("stateId", e.target.value);
              }}
              onblur={handleBlur}
              touched={touched}
              required={true}
              error={errors}
            />
            <SelectMenu
              classes={`pt-[1rem]`}
              name="districtId"
              labelname="District"
              placeHolderText="Select district"
              data={districtDropDown ?? []}
              value={values}
              handleChange={(e: any) => {
                dispatch(getDistrict("?districtId=" + e.target.value));
                setFieldValue("districtId", e.target.value);
              }}
              onblur={handleBlur}
              touched={touched}
              required={true}
              error={errors}
            />
            <SelectMenu
              classes={`pt-[1rem]`}
              name="villageId"
              labelname="Village"
              placeHolderText="Select village"
              data={villageDropDown ?? []}
              value={values}
              handleChange={handleChange}
              onblur={handleBlur}
              touched={touched}
              required={true}
              error={errors}
            />
            <TextInput
              value={values}
              label={"Pin code"}
              name="pincode"
              placeholder="Type pin code"
              onblur={handleBlur}
              handleChange={handleChange}
              touched={touched}
              error={errors}
              required={true}
            />
          </div>
        </div>
        <div className="flex justify-between gap-x-8">
          <div className="w-[65%]">
            <HeaderText text={`Start and relieving date`} />
            <div className="bg-[#F4F8FF] w-full flex mt-[1rem] px-[2rem] py-[1rem]">
              <div className="w-full">
                <TextInput
                  value={values}
                  label={"Joining date"}
                  required={true}
                  name="joiningDate"
                  type="date"
                  onblur={handleBlur}
                  handleChange={handleChange}
                  touched={touched}
                  error={errors}
                />
              </div>
              <div className="w-full">
                <TextInput
                  value={values}
                  label={"Relieving date"}
                  min={values.joiningDate}
                  name="relievingDate"
                  type="date"
                  onblur={handleBlur}
                  handleChange={handleChange}
                  touched={touched}
                  error={errors}
                />
              </div>
            </div>
          </div>
          <div className="w-[100%]">
            <HeaderText text={`Education details`} required={true} />
            <div className="bg-[#F4F8FF] flex flex-col mt-[1rem] px-[2rem] py-[1rem]">
              <div className="w-full">
                <TextInput
                  value={values}
                  label={"Education"}
                  name="educationName"
                  placeholder="Type education (ex: 12th, B.com etc)"
                  customStyle={{
                    width: "100%",
                  }}
                  onblur={handleBlur}
                  handleChange={handleChange}
                  touched={touched}
                  error={errors}
                />
              </div>
              <div className="flex justify-between items-center mt-4 px-4">
                <div className="flex">
                  <Button
                    className="m-0 p-0 mr-2 w-[10rem]"
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                    style={{
                      textTransform: "none",
                      fontSize: "16px",
                      textDecoration: "underline",
                    }}
                  >
                    Upload Certificate
                    <input
                      ref={education}
                      type="file"
                      hidden
                      name={"educationCertificate"}
                      accept="image/*, .doc, .pdf, .docx"
                      onChange={(e: any) => {
                        setFieldValue(
                          `educationCertificate`,
                          e.target.files[0]
                        );
                        setFieldTouched(`educationCertificate`, true, false);
                      }}
                    />
                  </Button>
                  <span style={{ color: "red", padding: "0" }}>{` * `}</span>
                </div>
                <LabelText
                  customStyle={{ width: "200px", fontSize: "11px" }}
                  labelName={`(file format pdf,word,image)`}
                />
              </div>
              <div className="p-5 pt-0 text-[10px] text-error">
                {/* {touched?.educationCertificate && errors?.educationCertificate
                  ? errors?.educationCertificate ?? ""
                  : ""} */}
              </div>
              <div className="p-5 pt-0 text-text">
                {values.educationCertificate?.name ?? ""}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-x-8">
          <div className="w-full">
            <HeaderText text={`Family info`} />
            <div className="bg-[#F4F8FF] w-full mt-[1rem] p-[2rem]">
              <div className="grid grid-cols-2 w-full">
                <SelectMenu
                  required
                  name="maritalStatus"
                  labelname="Marital Status"
                  placeHolderText="Select status"
                  data={marriedDropDown}
                  value={values}
                  handleChange={handleChange}
                  onblur={handleBlur}
                  touched={touched}
                  error={errors}
                />
                <TextInput
                  classes={"pt-0"}
                  label="Spouse Name"
                  placeholder="Type name here"
                  name="spouseName"
                  value={values}
                  handleChange={handleChange}
                  onblur={handleBlur}
                  touched={touched}
                  error={errors}
                />
              </div>
              <div>
                <LabelText
                  labelName={`Children`}
                  customStyle={{ padding: "1rem", paddingTop: "0" }}
                />
                <div className="grid grid-cols-2 w-full">
                  <SelectMenu
                    name="childrenMale"
                    labelname="Male"
                    placeHolderText="Select Male"
                    data={[
                      {
                        name: "0",
                        id: "0",
                      },
                      {
                        name: "1",
                        id: "1",
                      },
                      {
                        name: "2",
                        id: "2",
                      },
                      {
                        name: "3",
                        id: "3",
                      },
                      {
                        name: "4",
                        id: "4",
                      },
                    ]}
                    value={values}
                    handleChange={handleChange}
                    onblur={handleBlur}
                    touched={touched}
                    error={errors}
                  />
                  <SelectMenu
                    name="childrenFemale"
                    labelname="Female"
                    placeHolderText="Select Female"
                    data={[
                      {
                        name: "0",
                        id: "0",
                      },
                      {
                        name: "1",
                        id: "1",
                      },
                      {
                        name: "2",
                        id: "2",
                      },
                      {
                        name: "3",
                        id: "3",
                      },
                      {
                        name: "4",
                        id: "4",
                      },
                    ]}
                    value={values}
                    handleChange={handleChange}
                    onblur={handleBlur}
                    touched={touched}
                    error={errors}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-[80%]">
            <HeaderText text={`Government ID proof`} required={true} />
            <div className="bg-[#F4F8FF] mt-[1rem] py-[1rem]">
              <TextInput
                value={values}
                label={"Aadhar no"}
                name="aadharNo"
                placeholder="Type Aadhar number here"
                onblur={handleBlur}
                handleChange={handleChange}
                touched={touched}
                error={errors}
              />
              <div className="flex items-center justify-between">
                <div className="flex">
                  <Button
                    className="m-0 p-0 mr-2 w-[12rem]"
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                    style={{
                      textTransform: "none",
                      fontSize: "16px",
                      textDecoration: "underline",
                    }}
                  >
                    Upload Aadhar
                    <input
                      ref={aadhar}
                      type="file"
                      hidden
                      name={"aadharImage"}
                      accept="image/*, .doc, .pdf, .docx"
                      onChange={(e: any) => {
                        setFieldValue(`aadharImage`, e.target.files[0]);
                        setFieldTouched(`aadharImage`, true, false);
                      }}
                    />
                  </Button>
                  <span style={{ color: "red" }}>{` * `}</span>
                </div>
                <LabelText
                  customStyle={{ width: "200px", fontSize: "11px" }}
                  labelName={`(file format pdf,word,image)`}
                />
              </div>
              <div className="p-5 pt-0 text-[10px] text-error">
                {/* {touched?.aadharImage && errors?.aadharImage
                  ? errors?.aadharImage ?? ""
                  : ""} */}
              </div>
              <div className="p-5 pt-0 text-text">
                {values.aadharImage?.name ?? ""}
              </div>
            </div>
          </div>
        </div>
        <div>
          <HeaderText text={`Job Role`} required />
          <div className="bg-[#F4F8FF] mt-[1rem] p-[2rem] w-[70%]">
            <div className="flex  w-full">
              <SelectMenu
                classes={` w-full`}
                labelname={"Job Title"}
                required
                name={""}
                data={[]}
                handleChange={undefined}
                value={undefined}
                placeHolderText={"Select"}
              />
              <SelectMenu
                classes={` w-full`}
                labelname={"Reporting Manager"}
                required
                name={""}
                data={[]}
                handleChange={undefined}
                value={undefined}
                placeHolderText={"Select"}
              />
            </div>
            <LabelText labelName={`Assigned`} classes={` m-4`} />
            <div className="flex w-full">
              <SelectMenu
                classes={` w-full`}
                labelname={"Village"}
                required
                name={""}
                data={villageDropDown ?? []}
                handleChange={undefined}
                value={undefined}
                placeHolderText={"Select"}
              />
              <SelectMenu
                classes={` w-full`}
                labelname={"District"}
                required
                name={""}
                data={districtDropDown ?? []}
                handleChange={undefined}
                value={undefined}
                placeHolderText={"Select"}
              />
            </div>
          </div>
        </div>
        <div className="flex self-center">
          <CustomButton
            buttonName={`Update Profile`}
            customStyle={{
              padding: "1rem 3rem",
            }}
            handleOnClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
