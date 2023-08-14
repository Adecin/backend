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
import { useState } from "react";
import FarmerList from "../assign-farmer-list";
import BreadCrumb from "@/components/table/bread-crumb";
import LabelText from "@/components/lebelText";
import PhoneNumber from "@/components/inputComponents/phoneNumber";

export default function OfficerProfileEdit(props: any) {
  const [farmerPop, setFarmerPop] = useState(false);

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

  return (
    <>
      <div className="p-[3rem]">
        <BreadCrumb />
        {/* <PageHeader>{``}</PageHeader> */}
        <div className="py-[3rem] flex flex-col gap-y-8">
          <div className="profileInfo">
            <HeaderText required={true} text={`Personal info`} />
            <div className="bg-[#F4F8FF] flex gap-x-6 p-[2rem] mt-[1rem]">
              <div className="imageContainerdiv mt-5">
                <LabelText labelName={`Profile photo`} />
                <div className="imageContainer relative flex flex-col bg-[#F5F5F5] h-[136px] w-[136px] rounded-[50%] my-3 mt-6">
                  <img
                    className="m-auto m-auto rounded-[50%] "
                    src={`app/field-officer/profile.svg`}
                    alt="profile"
                    width={100}
                    height={100}
                  />
                  <IconButton
                    className="m-1 p-0 w-6 self-end"
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                    style={{ position: "absolute", bottom: "0", right: "0" }}
                  >
                    <input
                      hidden
                      accept="image/*"
                      //onChange={() => {}}
                      type="file"
                    />
                    <EditRoundedIcon
                      className=""
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
              </div>
              <div className="w-full grid grid-cols-3">
                <TextInput
                  label={"Employee ID"}
                  name="employee_id"
                  placeholder="Type ID in exact format"
                  handleChange={(e: any) => {
                    console.log(e.target.value);
                  }}
                />
                <TextInput
                  label={"Name"}
                  name="employee_id"
                  placeholder="Type name"
                  handleChange={(e: any) => {
                    console.log(e.target.value);
                  }}
                />
                <PhoneNumber
                  label="Phone Number"
                  placeholder="Type phone mobile"
                  name="phone"
                  handleChange={() => {}}
                />
                <TextInput
                  label={"Personal mail ID"}
                  name="employee_id"
                  placeholder="Type mail ID"
                  handleChange={(e: any) => {
                    console.log(e.target.value);
                  }}
                />
                <TextInput
                  label={"Company mail ID"}
                  name="employee_id"
                  placeholder="Type mail ID"
                  handleChange={(e: any) => {
                    console.log(e.target.value);
                  }}
                />
                <TextInput
                  label={"Date of birth"}
                  name="employee_id"
                  type="date"
                  handleChange={(e: any) => {
                    console.log(e.target.value);
                  }}
                />
                <SelectMenu
                  classes={`pt-[1rem]`}
                  labelname={"Gender"}
                  name={""}
                  data={[]}
                  handleChange={undefined}
                  value={undefined}
                  placeHolderText={"Select"}
                />
              </div>
            </div>
          </div>

          <div className="address">
            <HeaderText text={`Address`} required={true} />
            <div className="bg-[#F4F8FF] p-[2rem] mt-[1rem] w-full grid grid-cols-3">
              <TextInput
                label={"House No, street, area"}
                name="employee_id"
                placeholder="Type here"
                handleChange={(e: any) => {
                  console.log(e.target.value);
                }}
              />
              <SelectMenu
                classes={`pt-[1rem]`}
                labelname={"District"}
                name={""}
                data={[]}
                handleChange={undefined}
                value={undefined}
                placeHolderText={"Select"}
              />
              <SelectMenu
                classes={`pt-[1rem]`}
                labelname={"State"}
                name={""}
                data={[]}
                handleChange={undefined}
                value={undefined}
                placeHolderText={"Select"}
              />
              <SelectMenu
                classes={`pt-[1rem]`}
                labelname={"Village"}
                name={""}
                data={[]}
                handleChange={undefined}
                value={undefined}
                placeHolderText={"Select"}
              />
              <TextInput
                label={"Pin code"}
                name="employee_id"
                placeholder="Type pin code"
                handleChange={(e: any) => {
                  console.log(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex justify-between gap-x-8">
            <div className="w-[75%]">
              <HeaderText text={`Start and relieving date`} />
              <div className="bg-[#F4F8FF] w-full flex mt-[1rem] px-[2rem] py-[1rem]">
                <div className="w-full">
                  <TextInput
                    required={true}
                    label={"Joining date"}
                    name="employee_id"
                    type="date"
                    handleChange={(e: any) => {
                      console.log(e.target.value);
                    }}
                  />
                </div>
                <div className="w-full">
                  <TextInput
                    label={"Relieving date"}
                    name="employee_id"
                    type="date"
                    handleChange={(e: any) => {
                      console.log(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="w-full">
              <HeaderText text={`Education details`} required={true} />
              <div className="bg-[#F4F8FF] flex flex-col mt-[1rem] px-[2rem] py-[1rem]">
                <div className="w-full">
                  <TextInput
                    label={"Education"}
                    name="employee_id"
                    placeholder="Type education (ex: 12th, B.com etc)"
                    customStyle={{
                      width: "100%",
                    }}
                    handleChange={(e: any) => {
                      console.log(e.target.value);
                    }}
                  />
                </div>
                <div className="flex justify-between items-center mt-4 px-4">
                  <Button
                    className="m-0 p-0 mr-2 w-[10rem]"
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                    style={{
                      textTransform: "none",
                      fontSize: "16px",
                    }}
                  >
                    Upload Certificate
                    <input
                      hidden
                      accept="image/*"
                      //onChange={() => {}}
                      type="file"
                    />
                  </Button>
                  <LabelText
                    customStyle={{ width: "200px", fontSize: "11px" }}
                    labelName={`(file format pdf,word,image) *`}
                  />
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
                    labelname={"Marital status"}
                    name={""}
                    data={[]}
                    handleChange={undefined}
                    value={undefined}
                    placeHolderText={"Select"}
                  />
                  <TextInput
                    label={"Spouse name"}
                    name="employee_id"
                    type="date"
                    classes={`pt-0`}
                    placeholder="Type name here"
                    handleChange={(e: any) => {
                      console.log(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <LabelText
                    labelName={`Children`}
                    customStyle={{ padding: "1rem", paddingTop: "0" }}
                  />
                  <div className="grid grid-cols-2 w-full">
                    <SelectMenu
                      labelname={"Male"}
                      name={""}
                      data={[]}
                      handleChange={undefined}
                      value={undefined}
                      placeHolderText={"Select"}
                    />
                    <SelectMenu
                      labelname={"Female"}
                      name={""}
                      data={[]}
                      handleChange={undefined}
                      value={undefined}
                      placeHolderText={"Select"}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[80%]">
              <HeaderText text={`Government ID proof`} required={true} />
              <div className="bg-[#F4F8FF] mt-[1rem] py-[1rem]">
                <TextInput
                  label={"Aadhar no"}
                  name="employee_id"
                  placeholder="Type Aadhar number here"
                  handleChange={(e: any) => {
                    console.log(e.target.value);
                  }}
                />
                <div className="flex items-center justify-between">
                  <Button
                    className="m-0 p-0 mr-2 w-[12rem]"
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                    style={{
                      textTransform: "none",
                      fontSize: "16px",
                    }}
                  >
                    Upload Aadhar*
                    <input
                      hidden
                      accept="image/*"
                      //onChange={() => {}}
                      type="file"
                    />
                  </Button>
                  <LabelText
                    customStyle={{ width: "200px", fontSize: "11px" }}
                    labelName={`(file format pdf,word,image) *`}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <HeaderText text={`Assign Farmer`} required={true} />
            <div className="bg-[#F4F8FF] mt-[1rem] p-[2rem]">
              <div className="grid grid-cols-3">
                <SelectMenu
                  labelname={"Crop type"}
                  name={""}
                  data={[]}
                  handleChange={undefined}
                  value={undefined}
                  placeHolderText={"Select"}
                />
                <SelectMenu
                  labelname={"State name"}
                  name={""}
                  data={[]}
                  handleChange={undefined}
                  value={undefined}
                  placeHolderText={"Select"}
                />
                <SelectMenu
                  labelname={"Village"}
                  name={""}
                  data={[]}
                  handleChange={undefined}
                  value={undefined}
                  placeHolderText={"Select"}
                />
              </div>
              <div className="px-[1rem] flex items-center gap-x-8">
                <div>
                  <LabelText labelName={`Farmer`} />
                  <div className="flex gap-x-4 pt-3">
                    <Chip
                      sx={{
                        "&.css-50y8m9-MuiButtonBase-root-MuiChip-root .MuiChip-deleteIcon":
                          {
                            color: "#ffffff",
                          },
                      }}
                      style={{
                        background: "#3D7FFA",
                        padding: "1.5rem",
                        borderRadius: "10px",
                        color: "#fff",
                      }}
                      label="DTC0001"
                      onDelete={() => {}}
                    />
                    <Chip
                      style={{
                        background: "#3D7FFA",
                        padding: "1.5rem",
                        borderRadius: "10px",
                        color: "#fff",
                      }}
                      label="DTC0001"
                      onDelete={() => {}}
                    />
                    <Chip
                      style={{
                        background: "#3D7FFA",
                        padding: "1.5rem",
                        borderRadius: "10px",
                        color: "#fff",
                      }}
                      label="DTC0001"
                      onDelete={() => {}}
                    />
                  </div>
                </div>
                <CustomButton
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
                    marginTop: "1.65rem",
                  }}
                  handleOnClick={() => {
                    setFarmerPop(true);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="bg-[#F4F8FF] w-full p-[1rem]">
            <CustomButton
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
          </div>
          <div className="flex self-center">
            <CustomButton
              buttonName={`Save Changes`}
              customStyle={{
                background: "#3D7FFA",
                padding: "1rem 3rem",
              }}
            />
          </div>
        </div>
      </div>
      <Dialog open={farmerPop} maxWidth={`xs`} fullWidth={true}>
        <FarmerList
          onClose={() => {
            setFarmerPop(false);
          }}
          data={farmerData}
        />
      </Dialog>
    </>
  );
}

const farmerData = [
  { name: "Anbu", id: "" },
  { name: "Babu", id: "" },
  { name: "RajaManickam Selvaraj", id: "" },
  { name: "Dharmaraj Selvadhurai", id: "" },
  { name: "Venkata Narashimha Raju", id: "" },
];
