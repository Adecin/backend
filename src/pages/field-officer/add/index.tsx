"use client";

import HeaderText from "@/components/textComponents/headerText";
import { Button, Chip, Dialog, IconButton } from "@mui/material";
import Image from "next/image";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import TextInput from "@/components/inputComponents/textInput";
import SelectMenu from "@/components/inputComponents/selectMenu";
import CustomButton from "@/components/customButton";
import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import FarmerList from "../assign-farmer-list";
import PhoneNumber from "@/components/inputComponents/phoneNumber";
import BreadCrumb from "@/components/table/bread-crumb";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from "react-redux";
import { getState } from "@/redux/reducer/dropdown/get-state";
import { getDistrict } from "@/redux/reducer/dropdown/get-district";
import { getVillage } from '@/redux/reducer/dropdown/get-village';
import { addFieldOfficer } from "@/redux/reducer/fieldOfficer/addFieldOfficer";
import { assignFarmerList } from '@/redux/reducer/fieldOfficer/assignFarmerList';
import { useRouter, usePathname } from "next/navigation";
import {unassignFarmerList} from "@/redux/reducer/fieldOfficer/unassignFarmerList";

export default function OfficerProfileAdd(props: any) {
  const [farmerPop, setFarmerPop] = useState(false);
  const [profileCreated, setProfileCreated] = useState(false);
  const dispatch = useDispatch();
  const [previewImage, setPreviewImage] = useState<any>(null);
  const openProfile: any = useRef(null);
  const aadhar: any = useRef(null);
  const education: any = useRef(null);

  // api data
  const GetState = useSelector((state: any) => state.ListState);
  const GetDistrict = useSelector((state: any) => state.ListDistrict);
  const GetSVillage = useSelector((state: any) => state.ListVillage);
  const addFieldOffData = useSelector((state: any) => state.AddFieldOfficerData);
  const unAssignListFarmer = useSelector((store: any) => store.UnassignFarmerListData);
  const assignFarmerListFarmer = useSelector((store: any) => store.AssignFarmerListData);


  const [filterData, setFilterData] = useState({
    stateFilter: 'all',
    districtFilter: '',
    villageFillter: ''
  });
  // console.log(addFieldOffData);
  // console.log(unAssignListFarmer);

  // useEffect(() => {
  //   console.log(addFieldOffData);
  //   if (addFieldOffData.response.id) {

  //   }
  // }, [addFieldOffData])

  // useEffects
  useEffect(() => {
    dispatch(getState());
    dispatch(getVillage());
    dispatch(getDistrict());
    dispatch(unassignFarmerList(""));
  }, []);


  useEffect(() => {
    const query = `?village=${filterData.villageFillter}`;
    dispatch(unassignFarmerList(query));
  }, [filterData, farmerPop])

  useEffect(() => {
    dispatch(assignFarmerList(`?id=${addFieldOffData.response.id}`))
  }, [addFieldOffData, farmerPop])

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

  const fieldProfileSchema = Yup.object().shape({
    employeeId: Yup.string().required('Employee Id is required'),
    name: Yup.string().required('Name is required'),
    phoneNo: Yup.string()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(10, 'Must be exactly 10 digits')
      .max(10, 'Must be exactly 10 digits')
      .required('Contact number is required'),
    emailId: Yup.string().required('Email is required').matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Enter valid email'
    ),
    companyEmailId: Yup.string().required('Company Email is required').matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Enter valid email'
    ),
    dob: Yup.string().required('Dob is required'),
    gender: Yup.string().required("Age is required"),
    address: Yup.string().required('Address is required'),
    pincode: Yup.string().required('Pincode is required'),
    stateId: Yup.string().required("State is required"),
    districtId: Yup.string().required("District is required"),
    villageId: Yup.string().required("Village is required"),
    joiningDate: Yup.string().required("Joining Date is required"),
    relievingDate: Yup.string(),
    martialStatus: Yup.string().required("Marital status is required"),
    educationName: Yup.string().required('Education Name is required'),
    adharNumber: Yup.string()
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
      .test(
        "Aadhar image required",
        "Aadhar image required",
        (value: any) => {
          if (value.type) {
            return true;
          } else {
            return false;
          }
        }
      )
      .required("Aadhar image  is required"),
    educationCertificate: Yup.mixed()
      .test(
        "Certificate required",
        "Certificate required",
        (value: any) => {
          if (value.type) {
            return true;
          } else {
            return false;
          }
        }
      )
      .required("Certificate is required"),
  });

  // formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      employeeId: '',
      name: '',
      phoneNo: '',
      emailId: '',
      companyEmailId: '',
      dob: '',
      gender: '',
      address: '',
      stateId: '',
      districtId: '',
      villageId: '',
      pincode: '',
      joiningDate: '',
      relievingDate: '',
      educationName: '',
      educationCertificate: "",
      martialStatus: "",
      spouseName: "",
      childrenMale: "",
      childrenFemale: "",
      aadharNo: '',
      aadharImage: "",
      profileImage: "",

    },
    validationSchema: fieldProfileSchema,
    onSubmit: (values: any) => {
      // const formData = new FormData();
      // formData.append('first_name', values.first_name);
      // formData.append('last_name', values.last_name);
      // formData.append('profile', values.profile);
      // formData.append('country', values.country);
      // formData.append('contact_number', values.contact_number);
      // formData.append('state', values.state);
      // formData.append('city', values.city);
      console.log(values);
      submit(values);
    },
  });

  // submit farm
  const submit = (data: any) => {
    const apiFormData = new FormData();

    for (let key in data) {
      apiFormData.append(key, data[key]);
    }
    apiFormData.append("status", "Approved");
    dispatch(addFieldOfficer(apiFormData));
  };

  console.log(`state`,addFieldOffData)

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    setFieldTouched,
    setFieldValue,
    resetForm,
    setErrors,
    errors,
    setFieldError,
  }: any = formik;

  const PageHeader = styled.p`
    font-size: 18px;
    font-weight: 500;
    line-height: 21px;
    letter-spacing: 0.05em;
    text-align: left;
    &::before {
      content: "<";
      color: #3d7ffa;
      font-size: 22px;
      padding: 10px;
    }
  `;
  const pathName = usePathname();
  console.log(`pathName`,pathName)

  return (
    <div className="p-[3rem] mx-[3rem]">
      <BreadCrumb lastName="Add field officer" />
      <div className="py-[3rem]  flex flex-col gap-y-8">
        <div className="profileInfo">
          <HeaderText required={true} text={`Personal info`} />
          <div className="bg-[#F4F8FF] flex gap-x-6 p-[2rem] mt-[1rem]">
            <div className="imageContainer">
              <div className="p-5 relative w-[180px] max-w-[150px] h-[180px]">
                <div className="text-grey text-[16px] my-2">
                  Profile Photo <span className="text-error">*</span>
                </div>
                <img
                  src={
                    previewImage ??
                    "https://media.istockphoto.com/id/1092520698/photo/indian-farmer-at-onion-field.webp?b=1&s=170667a&w=0&k=20&c=pGCpSylCt1jR82BrJxM-9aEwklSsVzK2MvXNfCic1EA="
                  }
                  alt="profile"
                  className="rounded-[50%] w-[100px] h-[100px]"
                />
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  ref={openProfile}
                  name={"profileImage"}
                  onChange={(e: any) => {
                    setFieldValue(`profileImage`, e.target.files[0]);
                    setPreviewImage(URL.createObjectURL(e.target.files[0]));
                    setFieldTouched(`profileImage`, true, false);
                  }}
                />
                <div
                  onClick={() => {
                    openProfile.current.click();
                  }}
                  className="bg-primary cursor-pointer p-2 w-[30px] rounded-[50%] absolute right-6 bottom-5"
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.5944 4.39863L8.57133 1.40685L9.56717 0.409589C9.83984 0.13653 10.1749 0 10.5723 0C10.9696 0 11.3044 0.13653 11.5766 0.409589L12.5725 1.40685C12.8451 1.67991 12.9874 2.00948 12.9993 2.39556C13.0111 2.78164 12.8807 3.11098 12.608 3.38356L11.5944 4.39863ZM10.563 5.44932L3.02308 13H0V9.9726L7.53993 2.42192L10.563 5.44932Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div className="p-5 pt-0 text-[10px] text-error">
                  {touched?.profileImage && errors?.profileImage
                    ? errors?.profileImage ?? ""
                    : ""}
                </div>
              </div>
            </div>
            <div className="w-full grid grid-cols-3">
              <TextInput
                value={values}
                label={"Employee ID"}
                name="employeeId"
                placeholder="Type ID in exact format"
                onblur={handleBlur}
                handleChange={handleChange}
                touched={touched}
                error={errors}
                required={true}
              />
              <TextInput
                value={values}
                label={"Name"}
                name="name"
                placeholder="Type name"
                onblur={handleBlur}
                handleChange={handleChange}
                touched={touched}
                error={errors}
                required={true}
              />
              <PhoneNumber
                value={values}
                label="Phone Number"
                placeholder="Type phone mobile"
                name="phoneNo"
                onblur={handleBlur}
                handleChange={handleChange}
                touched={touched}
                error={errors}
                required={true}
              />
              <TextInput
                value={values}
                label={"Personal mail ID"}
                name="emailId"
                placeholder="Type mail ID"
                onblur={handleBlur}
                handleChange={handleChange}
                touched={touched}
                error={errors}
                required={true}
              />
              <TextInput
                value={values}
                label={"Company mail ID"}
                name="companyEmailId"
                placeholder="Type mail ID"
                onblur={handleBlur}
                handleChange={handleChange}
                touched={touched}
                error={errors}
                required={true}
              />
              <TextInput
                value={values}
                label={"Date of birth"}
                name="dob"
                type="date"
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
                  }
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
          <div className="w-[100%]">
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
                <input
                  ref={education}
                  type="file"
                  hidden
                  name={"educationCertificate"}
                  accept="image/*, .doc, .pdf, .docx"
                  onChange={(e: any) => {
                    setFieldValue(`educationCertificate`, e.target.files[0]);
                    setFieldTouched(`educationCertificate`, true, false);
                  }}
                />

                <div
                  onClick={() => {
                    education.current.click();
                  }}
                  className="text-primary underline cursor-pointer"
                >
                  Upload Certificate*{" "}
                </div>
                <span className="text-grey  underline-none">
                  &nbsp;(file format pdf,word,image)*
                </span>
              </div>
              <div className="p-5 pt-0 text-[10px] text-error">
                {touched?.educationCertificate && errors?.educationCertificate
                  ? errors?.educationCertificate ?? ""
                  : ""}
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
                  name="martialStatus"
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
                  classes={'pt-0'}
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

                <div
                  onClick={() => {
                    aadhar.current.click();
                  }}
                  className="text-primary underline cursor-pointer ml-8"
                >
                  Upload Aadhar*{" "}
                </div>
                <span className="text-grey  underline-none mr-8">
                  &nbsp;(file format pdf,word,image)*
                </span>
              </div>
              <div className="p-5 pt-0 text-[10px] text-error">
                {touched?.aadharImage && errors?.aadharImage
                  ? errors?.aadharImage ?? ""
                  : ""}
              </div>
              <div className="p-5 pt-0 text-text">
                {values.aadharImage?.name ?? ""}
              </div>
            </div>
          </div>
        </div>
        {!addFieldOffData.response.id && (<div className="flex self-center">
          <CustomButton
            buttonName={`Create Profile`}
            customStyle={{
              padding: "1rem 3rem",
            }}
            handleOnClick={() => {
              handleSubmit();
            }}
          />
        </div>)}
        {addFieldOffData.response.id && (<div>
          <div className="w-full">
            <HeaderText text={`Assign Farmer`} />
            <div className="bg-[#F4F8FF] mt-[1rem] p-[2rem]">
              <div className="grid grid-cols-3">
                <SelectMenu
                  //readOnly={!profileCreated}
                  labelname={"Crop type"}
                  name={""}
                  data={[]}
                  handleChange={undefined}
                  value={undefined}
                  placeHolderText={"Select"}
                />
                <SelectMenu
                  name="districtIds"
                  labelname="District"
                  placeHolderText="Select district"
                  data={districtDropDown ?? []}
                  value={values}
                  handleChange={handleChange}
                  onblur={handleBlur}
                  touched={touched}
                  required={true}
                  error={errors}
                />
                <SelectMenu
                  name="villageFillter"
                  labelname="Village"
                  placeHolderText="Select village"
                  data={villageDropDown ?? []}
                  value={filterData}
                  handleChange={(e: any) => {
                    setFilterData({
                      ...filterData,
                      villageFillter: e.target.value
                    })
                    console.log(e.target.value);
                  }}
                  onblur={handleBlur}
                  touched={touched}
                  required={true}
                  error={errors}
                />
              </div>
              <div className="px-[1rem]">
                <LabelText labelName={`Farmer`} />
                <div className="gap-x-4 pt-3">
                  {assignFarmerListFarmer?.response?.length ?
                    assignFarmerListFarmer?.response?.map((item: any, index: number) => {
                      console.log(item);
                      return (
                        <>
                          <Chip
                            style={{
                              margin: '5px',
                              background: "#3D7FFA",
                              padding: "1.5rem",
                              borderRadius: "10px",
                              color: "#fff",
                            }}
                            label={item.farmerId.farmerId}
                            onDelete={() => { }}
                          />
                        </>
                      )
                    })
                    :
                    <p>No Assigned Data</p>
                  }
                </div>
                <CustomButton
                  //disable={!profileCreated}
                  startIcon={
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 0C7.35774 0.0318782 4.83268 1.09568 2.96418 2.96418C1.09568 4.83268 0.0318782 7.35774 0 10C0.0318782 12.6423 1.09568 15.1673 2.96418 17.0358C4.83268 18.9043 7.35774 19.9681 10 20C12.6423 19.9681 15.1673 18.9043 17.0358 17.0358C18.9043 15.1673 19.9681 12.6423 20 10C19.9681 7.35774 18.9043 4.83268 17.0358 2.96418C15.1673 1.09568 12.6423 0.0318782 10 0ZM15.7143 10.7143H10.7143V15.7143H9.28571V10.7143H4.28571V9.28571H9.28571V4.28571H10.7143V9.28571H15.7143V10.7143Z"
                        fill="#3D7FFA"
                      />
                    </svg>
                  }
                  buttonName={`Add farmer`}
                  customStyle={{
                    background: "none",
                    color: "#3D7FFA",
                    margin: "0.5rem",
                  }}
                  handleOnClick={() => {
                    setFarmerPop(true);
                  }}
                />
              </div>
            </div>
          </div>
          {/* <div className="bg-[#F4F8FF] w-full p-[1rem]">
            <CustomButton
              //disable={!profileCreated}
              startIcon={
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 0C7.35774 0.0318782 4.83268 1.09568 2.96418 2.96418C1.09568 4.83268 0.0318782 7.35774 0 10C0.0318782 12.6423 1.09568 15.1673 2.96418 17.0358C4.83268 18.9043 7.35774 19.9681 10 20C12.6423 19.9681 15.1673 18.9043 17.0358 17.0358C18.9043 15.1673 19.9681 12.6423 20 10C19.9681 7.35774 18.9043 4.83268 17.0358 2.96418C15.1673 1.09568 12.6423 0.0318782 10 0ZM15.7143 10.7143H10.7143V15.7143H9.28571V10.7143H4.28571V9.28571H9.28571V4.28571H10.7143V9.28571H15.7143V10.7143Z"
                    fill="#3D7FFA"
                  />
                </svg>
              }
              buttonName={`Assign farmer`}
              customStyle={{
                background: "none",
                color: "#3D7FFA",
              }}
              handleOnClick={() => {
                setFarmerPop(true);
              }}
            />
          </div> */}
        </div>)}
        {addFieldOffData.response.id && (<div className="flex self-center">
          <CustomButton
            buttonName={`Create Assign`}
            customStyle={{
              padding: "1rem 3rem",
            }}
          />
        </div>)}
      </div>
      <Dialog open={farmerPop} maxWidth={`xs`} fullWidth={true}>
        <FarmerList
          onClose={() => {
            setFarmerPop(false);
          }}
          fieldOfficerId={addFieldOffData.response.id}
          data={unAssignListFarmer.response.data}
        />
      </Dialog>
    </div>
  );
}

const farmerData = [
  { name: "Anbu", id: "" },
  { name: "Babu", id: "" },
  { name: "RajaManickam Selvaraj", id: "" },
  { name: "Dharmaraj Selvadhurai", id: "" },
  { name: "Venkata Narashimha Raju", id: "" },
];

const LabelText = (props: any) => {
  const { labelName, customStyle } = props;
  return (
    <p
      className=""
      style={{
        fontSize: "16px",
        fontWeight: 400,
        lineHeight: "24px",
        letterSpacing: "0.05em",
        textAlign: "left",
        color: "#858585",
        ...customStyle,
      }}
    >
      {labelName}
    </p>
  );
};
