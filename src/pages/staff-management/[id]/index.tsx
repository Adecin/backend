"use client";
import Image from "next/image";
import styled from "@emotion/styled";
import SelectMenu from "@/components/inputComponents/selectMenu";
import CustomButton from "@/components/customButton";
import HeaderText from "@/components/textComponents/headerText";
import DatakeyValue from "@/components/textComponents/keyValueText";
import SurveyTable from "@/components/surveyTable";
import { useRouter } from "next/navigation";
import BreadCrumb from "@/components/table/bread-crumb";
import LabelText from "@/components/labelText";
import Link from "next/link";

const dataTable = [
  {
    assigned_date: "04/08/2023",
    farmer_id: "KK001",
    Name: "Ranga Ramasamy",
    location: "Dakshina Kannada,Karapakam, 600 061",
    status: "completed",
  },
];

const surveyData = [
  {
    survey: "DTE 2023",
    field_officer: "KK001",
    location: "Dakshina Kannada,Karapakam, 600 061",
    farmer_id: "KK001",
  },
  {
    survey: "DTE 2023",
    field_officer: "KK001",
    location: "Dakshina Kannada,Karapakam, 600 061",
    farmer_id: "KK001",
  },
  {
    survey: "DTE 2023",
    field_officer: "KK001",
    location: "Dakshina Kannada,Karapakam, 600 061",
    farmer_id: "KK001",
  },
  {
    survey: "DTE 2023",
    field_officer: "KK001",
    location: "Dakshina Kannada,Karapakam, 600 061",
    farmer_id: "KK001",
  },
];

const dataedu = [
  { degree: "12th", certificate: "Certificate" },
  { degree: "B.com", certificate: "Certificate" },
];
export default function OfficerProfile(props: any) {
  //const { data } = props
  const router = useRouter();

  const educationDetails = Object.keys(dataedu[0]);

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
            router.push(`/field-officer/edit`);
          }}
        />
      </div>
      <PersonalDetailCard />
      <div className="idDocuments my-2">
        <HeaderText text={`Job Role`} />
        <div
          className="bg-[#F4F8FF] px-3 py-3 mt-[1rem] flex justify-between w-full rounded-[10px]"
        >
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
        <table className="w-[60%] my-4">
          <tbody className="flex flex-col gap-y-4">
            {dataedu.map((item: any, index: number) => (
              <div
                className="flex bg-[#F4F8FF] py-4 px-6 rounded-[8px] gap-x-8"
                key={index}
              >
                <span className="w-[3rem]">{index + 1}</span>
                <tr className="w-full flex justify-between">
                  {educationDetails.map((key) => {
                    console.log(`key`, key);
                    return (
                      <td className="text-start py-1 pr-5 " key={key}>
                        <div className="  ">
                          <div
                            className="text-base leading-[24px] font-normal tracking-wider"
                            style={
                              key == "certificate"
                                ? {
                                  color: "#3D7FFA",
                                  textDecoration: "underline",
                                }
                                : {}
                            }
                          >
                            {item[key]}
                          </div>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              </div>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-start gap-x-24">
        <div className="addressDeatails my-2">
          <HeaderText text={`Address details`} />
          <div
            style={addressStyle}
            className="px-8 py-8 mt-[1rem] rounded-[10px]">
            <p
              style={{ maxWidth: "340px" }}
            >{`G8,248/250, Ln Complex, G8,248/250, lncplx, oldtaragupetB53, Lal Build, Old Taragupet, Bangalore - 560053`}</p>
          </div>
        </div>
        <div className="idDocuments my-2">
          <HeaderText text={`Government ID proof`} />
          <div
            style={addressStyle}
            className="px-8 py-8 mt-[1rem] w-[228px] rounded-[10px]"
          >
            <LabelText labelName={`Aadhar No`} />
            <p>{`1235 5287 4589`}</p>
            <Link
              href={""}
              style={{
                textTransform: "none",
                color: "#3D7FFA",
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "21px",
                letterSpacing: "0.05em",
                textAlign: "left",
              }}
            >{`ranga rao aadhar.pdf`}</Link>
          </div>
        </div>
      </div>
      <div className="idDocuments my-2">
        <HeaderText text={`Family info`} />
        <div
          className="bg-[#F4F8FF] px-3 py-3 mt-[1rem] flex justify-between w-[70%] rounded-[10px]"
        >
          <div className="flex flex-col m-3 p-3 gap-4">
            <LabelText labelName={`Marital Status`} />
            <p>{`Married`}</p>
          </div>
          <div className="flex flex-col m-3 p-3 gap-4">
            <LabelText labelName={`Spouse name`} />
            <p>{`Mari`}</p>
          </div>
          <div className="children m-3 p-3 gap-4">
            <LabelText labelName={`Children`} />
            <p className="flex gap-x-4 my-4">
            <span>{`Male - 02`}</span>
            <span>{`Female - 01`}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const addressStyle = {
  height: "130px",
  background: "#F4F8FF",
  padding: "2rem",
};

const PersonalDetailCard = () => {
  const Separater = styled.div`
    ::after {
      content: "";
      width: 1.25px;
      height: 9rem;
      background-color: #dbdbdb;
      display: block;
    }
  `;

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
            <DatakeyValue label={`Name`} value={`Mohammed`} />
            <DatakeyValue label={`Phone number`} value={`+91 985746328`} />
            <DatakeyValue label={`Gender`} value={`Female`} />
            <DatakeyValue label={`Education`} value={`BBA`} />
          </div>
          <Separater />
          <div className="flex flex-col gap-y-6">
            <DatakeyValue label={`Employee ID`} value={`DTE001`} />
            <DatakeyValue label={`Date of birth`} value={`23/56/1994`} />
            <DatakeyValue label={`Personal mail ID`} value={`mohammed@gmail.com`} />
            <DatakeyValue label={`Company mail ID`} value={`mohammed@dte.com`} />
          </div>
        </div>
      </div>
    </div>
  );
};
