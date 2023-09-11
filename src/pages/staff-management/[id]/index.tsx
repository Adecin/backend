"use client";
import Image from "next/image";
import styled from "@emotion/styled";
import SelectMenu from "@/components/inputComponents/selectMenu";
import CustomButton from "@/components/customButton";
import HeaderText from "@/components/textComponents/headerText";
import DatakeyValue from "@/components/textComponents/keyValueText";
import SurveyTable from "@/components/surveyTable";
import { useRouter, useSearchParams } from "next/navigation";
import BreadCrumb from "@/components/table/bread-crumb";
import LabelText from "@/components/labelText";
import Link from "next/link";
import { oneUserInfo } from "@/redux/reducer/user/getOneUser";
import { dispatch } from "@/redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const dataedu = [
  { degree: "12th", certificate: "Certificate" },
  { degree: "B.com", certificate: "Certificate" },
];
export default function OfficerProfile(props: any) {
  //const { data } = props
  const router = useRouter();
  const params = useSearchParams();
  const user_id: any = params?.get("id");

  const educationDetails = Object.keys(dataedu[0]);

  const getOneUser = useSelector((store: any) => store.OneUserState);
  const userProfile = getOneUser.response;
  //console.log(`getOneUserData`, userProfile);

  useEffect(() => {
    dispatch(oneUserInfo(user_id));
  }, [user_id]);

  return (
    <div className="flex flex-col my-[5rem] m-[3rem] gap-y-6">
      <div className="flex ml-[-20px] justify-between font-medium text-lg tracking-wider flex items-center my-auto">
        <BreadCrumb />
        <CustomButton
          classes={` flex self-end`}
          startIcon={
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
          }
          buttonName={`Edit profile`}
          customStyle={{
            width: "133px",
            height: "36px",
            padding: "0.5rem 1rem",
            borderRadius: "30px",
          }}
          handleOnClick={() => {
            router.push(`/staff-management/edit?id=${user_id}`);
          }}
        />
      </div>
      <PersonalDetailCard profile={userProfile} />
      <div className="idDocuments my-2">
        <HeaderText text={`Job Role`} />
        <div className="bg-[#F4F8FF] px-3 py-3 mt-[1rem] flex justify-between w-full rounded-[10px]">
          <div className="flex flex-col m-3 p-3 gap-4">
            <LabelText labelName={`Job Title`} />
            <p>{`Regional manager`}</p>
          </div>
          <div className="flex flex-col m-3 p-3 gap-4">
            <LabelText labelName={`Reporting Manager`} />
            <p>{`Kamaraj`}</p>
          </div>
          <div className="flex flex-col m-3 p-3 gap-4">
            <LabelText labelName={`Assigned State`} />
            <p>{`Kamaraj`}</p>
          </div>

          <div className="children m-3 p-3 gap-4">
            <LabelText labelName={`District`} />
            <p>{`Charkhi Dadri`}</p>
          </div>
        </div>
      </div>
      <div className="my-2">
        <HeaderText text={`Education details`} />
        {userProfile?.educationName ? (
          <table className="w-[60%] my-4">
            <tbody className="flex flex-col gap-y-4">
              <div className="flex bg-[#F4F8FF] py-4 px-6 rounded-[8px] gap-x-8">
                <span className="w-[3rem]">{1}</span>
                <tr className="w-full flex justify-between">
                  <td className="text-start py-1 pr-5 ">
                    <div className="  ">
                      <div
                        className="text-base leading-[24px] font-normal tracking-wider"
                        style={{
                          color: "#3D7FFA",
                          textDecoration: "underline",
                        }}
                      >
                        {userProfile?.educationName}
                      </div>
                    </div>
                  </td>
                  <td className="text-start py-1 pr-5 ">
                    <div className="  ">
                      <div
                        className="text-base leading-[24px] font-normal tracking-wider"
                        style={{
                          color: "#3D7FFA",
                          textDecoration: "underline",
                        }}
                      >
                        {userProfile?.educationCertificate}
                      </div>
                    </div>
                  </td>
                </tr>
              </div>
            </tbody>
          </table>
        ) : (
          <p className="py-[1rem] my-[2rem] w-[60%] bg-[#F4F8FF] text-[18px] rounded-[10px] text-center">
            No data found
          </p>
        )}
      </div>
      <div className="flex justify-start gap-x-24">
        <div className="addressDeatails my-2">
          <HeaderText text={`Address details`} />
          <div
            style={{ ...addressStyle, width: "480px" }}
            className="px-8 py-4 mt-[1rem] rounded-[10px] text-text max-w-[500px]"
          >
            {`${userProfile.address ? userProfile.address + `, ` : ``}`}
            <br />
            {`${
              userProfile?.villageId?.name
                ? userProfile?.villageId?.name + `, `
                : ``
            }`}
            <br />
            {userProfile?.districtId?.name
              ? userProfile?.districtId?.name + `, `
              : ``}
            <br />
            {userProfile?.stateId?.name
              ? userProfile?.stateId?.name + ` - `
              : ``}
            {userProfile?.pincode ?? ``}
          </div>
        </div>
        <div className="idDocuments my-2">
          <HeaderText text={`Government ID proof`} />
          <div
            style={addressStyle}
            className="px-8 py-8 mt-[1rem]  rounded-[10px]"
          >
            <LabelText labelName={`Aadhar No`} />
            <p>{userProfile?.aadharNo}</p>
            <Link
              href={`${userProfile?.aadharImage}`}
              target="_blank"
              download
              style={{
                textTransform: "none",
                color: "#3D7FFA",
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "21px",
                letterSpacing: "0.05em",
                textAlign: "left",
                textDecoration: "underline",
              }}
            >{`${userProfile.name}.pdf`}</Link>
          </div>
        </div>
      </div>
      <div className="idDocuments my-2">
        <HeaderText text={`Family info`} />
        <div className="bg-[#F4F8FF] px-3 py-3 mt-[1rem] flex justify-between w-[70%] rounded-[10px]">
          <div className="flex flex-col m-3 p-3 gap-4">
            <LabelText labelName={`Marital Status`} />
            <p>{userProfile?.maritalStatus}</p>
          </div>
          <div className="flex flex-col m-3 p-3 gap-4">
            <LabelText labelName={`Spouse name`} />
            <p>{userProfile?.spouseName}</p>
          </div>
          <div className="children m-3 p-3 gap-4">
            <LabelText labelName={`Children`} />
            <p className="flex gap-x-4 my-4">
              <span>{`Male - ${userProfile?.childrenMale}`}</span>
              <span>{`Female - ${userProfile?.childrenFemale}`}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const addressStyle = {
  height: "130px",
  background: "#F4F8FF",
  padding: "2rem",
};

const PersonalDetailCard = (props: any) => {
  const Separater = styled.div`
    ::after {
      content: "";
      width: 1.25px;
      height: 9rem;
      background-color: #dbdbdb;
      display: block;
    }
  `;

  const { profile } = props;

  return (
    <div className="">
      <HeaderText text={`Personal details`} />
      <div className="flex justify-around bg-[#F4F8FF] p-[1rem] gap-x-4 mt-4">
        <img
          src={
            "https://image.winudf.com/v2/image1/bmV0LndsbHBwci5ib3lzX3Byb2ZpbGVfcGljdHVyZXNfc2NyZWVuXzBfMTY2NzUzNzYxN18wOTk/screen-0.webp?fakeurl=1&type=.webp"
          }
          alt={"profile"}
          className="rounded-[50%] w-[100px] h-[100px]"
        />
        <div className="w-full flex justify-around p-[1rem] mx-[1rem]">
          <div className=" flex flex-col gap-y-6 mr-[3rem]">
            <DatakeyValue label={`Name`} value={profile?.name} />
            <DatakeyValue label={`Phone number`} value={profile?.phoneNo} />
            <DatakeyValue label={`Gender`} value={profile?.gender} />
            <DatakeyValue label={`Education`} value={profile?.educationName} />
          </div>
          <Separater />
          <div className="flex flex-col gap-y-6">
            <DatakeyValue label={`Employee ID`} value={profile?.employeeId} />
            <DatakeyValue label={`Date of birth`} value={profile?.dob} />
            <DatakeyValue label={`Personal mail ID`} value={profile?.emailId} />
            <DatakeyValue
              label={`Company mail ID`}
              value={profile?.companyEmailId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
