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
import PhoneNumber from "@/components/inputComponents/phoneNumber";
import BreadCrumb from "@/components/table/bread-crumb";
import LabelText from "@/components/labelText";

export default function OfficerProfileAdd(props: any) {
  const [farmerPop, setFarmerPop] = useState(false);
  const [profileCreated, setProfileCreated] = useState(false);

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

  const gender =[
    {name:"Male", id:"male"},
    {name:"Female", id:"female"},
    {name:"Others", id:"others"},
  ]

  return (
    <div className="p-[3rem]">
      <BreadCrumb lastName="Add Staff" />
      <div className="py-[3rem]  flex flex-col gap-y-8">
        <div className="profileInfo">
          <HeaderText text={`Personal info`} />
          <div className="bg-[#F4F8FF] flex gap-x-6 p-[2rem] mt-[1rem]">
            <div className="imageContainer mt-5">
              <LabelText labelName={`Profile photo`} />
              <div className="imageContainer relative flex flex-col bg-[#F5F5F5] h-[136px] w-[136px] my-3 mt-6">
                <Image
                  className="m-auto h-full w-full"
                  src={``}
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
                >
                  <input
                    hidden
                    accept="image/*"
                    //onChange={() => {}}
                    type="file"
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
            </div>
            <div className="w-full grid grid-cols-3">
              <TextInput
                label={"Employee ID"}
                name="employee_id"
                required
                placeholder="Type ID in exact format"
                handleChange={(e: any) => {
                  console.log(e.target.value);
                }}
              />
              <TextInput
                label={"Name"}
                name="employee_id"
                required
                placeholder="Type name"
                handleChange={(e: any) => {
                  console.log(e.target.value);
                }}
              />
              <PhoneNumber
                label="Phone Number"
                placeholder="Type phone mobile"
                name="phone"
                required
                handleChange={(e: any) => {
                  console.log(e.target.value);
                }}              />
              <TextInput
                label={"Personal mail ID"}
                name="employee_id"
                required
                placeholder="Type mail ID"
                handleChange={(e: any) => {
                  console.log(e.target.value);
                }}
              />
              <TextInput
                label={"Company mail ID"}
                name="employee_id"
                placeholder="Type mail ID"
                required
                handleChange={(e: any) => {
                  console.log(e.target.value);
                }}
              />
              <TextInput
                label={"Date of birth"}
                name="employee_id"
                required
                type="date"
                handleChange={(e: any) => {
                  console.log(e.target.value);
                }}
              />
              <SelectMenu
                classes={`pt-[1rem]`}
                labelname={"Gender"}
                required
                name={""}
                data={gender}
                handleChange={undefined}
                value={(e: any) => (e.target.value)}
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
              required
              placeholder="Type here"
              handleChange={(e: any) => {
                console.log(e.target.value);
              }}
            />
            <SelectMenu
              classes={`pt-[1rem]`}
              labelname={"District"}
              required
              name={""}
              data={[]}
              handleChange={undefined}
              value={undefined}
              placeHolderText={"Select"}
            />
            <SelectMenu
              classes={`pt-[1rem]`}
              labelname={"State"}
              required
              name={""}
              data={[]}
              handleChange={undefined}
              value={undefined}
              placeHolderText={"Select"}
            />
            <SelectMenu
              classes={`pt-[1rem]`}
              labelname={"Village"}
              required
              name={""}
              data={[]}
              handleChange={undefined}
              value={undefined}
              placeHolderText={"Select"}
            />
            <TextInput
              label={"Pin code"}
              required
              name="employee_id"
              placeholder="Type pin code"
              handleChange={(e: any) => {
                console.log(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex justify-between gap-x-8">
          <div className="w-[65%]">
            <HeaderText text={`Start and relieving date`} />
            <div className="bg-[#F4F8FF] w-full flex mt-[1rem] px-[2rem] py-[1rem]">
              <div className="w-full">
                <TextInput
                  label={"Joining date"}
                  required={true}
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
          <div className="w-[100%]">
            <HeaderText text={`Education details`} required={true} />
            <div className="bg-[#F4F8FF] flex flex-col mt-[1rem] px-[2rem] py-[1rem]">
              <div className="w-full">
                <TextInput
                  label={"Education"}
                  required
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
                    textDecoration: "underline",
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
                  labelName={`(file format pdf,word,image)`}
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
                  required
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
                required
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
                    textDecoration: "underline",
                  }}
                >
                  Upload Aadhar
                  <input
                    hidden
                    accept="image/*"
                    //onChange={() => {}}
                    type="file"
                  />
                </Button>
                <LabelText
                  customStyle={{ width: "200px", fontSize: "11px" }}
                  labelName={`(file format pdf,word,image)`}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          style={
            {
              //profileCreated ? {} : { opacity: "0.5" }
            }
          }
        >
          <HeaderText text={`Job Role`} required/>
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
            </div >
            <LabelText labelName={`Assigned`} classes={` m-4`}/>
            <div className="flex w-full">
              <SelectMenu
                classes={` w-full`}
                labelname={"Village"}
                required
                name={""}
                data={[]}
                handleChange={undefined}
                value={undefined}
                placeHolderText={"Select"}
              />
              <SelectMenu
                classes={` w-full`}
                labelname={"District"}
                required
                name={""}
                data={[]}
                handleChange={undefined}
                value={undefined}
                placeHolderText={"Select"}
              />
            </div>
          </div>
        </div>
        <div className="flex self-center">
          <CustomButton
            buttonName={`Create Profile`}
            customStyle={{
              padding: "1rem 3rem",
            }}
          />
        </div>
      </div>
    </div>
  );
};
