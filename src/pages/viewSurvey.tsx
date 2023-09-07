"use client";

import CustomButton from "@/components/customButton";
import Header from "@/components/header";
import BreadCrumb from "@/components/table/bread-crumb";

import styled from "@emotion/styled";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Chip } from "@mui/material";
import { useEffect, useState } from "react";
import { listOneSurvey } from "@/redux/reducer/survey/get-survey";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";

const dateFormat = (date: string) => {
  const inputDate = new Date("2023-09-05T04:08:42.416Z");
  const day = String(inputDate.getDate()).padStart(2, "0");
  const month = String(inputDate.getMonth() + 1).padStart(2, "0");
  const year = inputDate.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};

const ViewSurvey = () => {
  const [edit, setEdit] = useState(false);
  const cropTypes = [
    { name: "WRU" },
    { name: "Mysure-Burley" },
    { name: "Type-3" },
  ];

  const dispatch = useDispatch();
  const params = useSearchParams();
  const survey_id: any = params?.get("id");
  const router = useRouter();

  const getOneSurvey = useSelector((state: any) => state.ListOneSurveyData);
  const getOneSurveyData = getOneSurvey.response;
  console.log(getOneSurvey);

  useEffect(() => {
    dispatch(listOneSurvey(`${survey_id}`));
    console.log(survey_id);
  }, [survey_id]);

  return (
    <>
      <div className="p-5">
        <Header />
        <div className="px-[1.5rem] mx-4">
          <div className="flex justify-end">
            {/* <BreadCrumb classes={` font-bold text-[#43424D]`} /> */}
          </div>
          <div className="my-5 pr-6 flex justify-between text-[#43424D]">
            <p style={{ fontWeight: "bold", fontSize: "18px" }}>View Survey</p>
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
              buttonName={`Edit Survey`}
              customStyle={{
                width: "133px",
                height: "36px",
                padding: "0.5rem 1rem",
                borderRadius: "30px",
              }}
              handleOnClick={() => {}}
            />
          </div>
          <div className="ml-5">
            <div
              className="mb-5 flex text-[#43424D]"
              style={{ fontWeight: "bold", fontSize: "16px" }}
            >
              <p>Created Date&nbsp;: &nbsp;</p>
              <p>{dateFormat(getOneSurveyData.createdDate)}</p>
            </div>
            <div
              className="mb-5 my-4 flex text-[#43424D] "
              style={{ fontSize: "16px" }}
            >
              <div style={{ whiteSpace: "nowrap" }}>
                <p style={{ fontWeight: "bold" }}>
                  Survey Description&nbsp;:&nbsp;
                </p>
              </div>
              {<p>{getOneSurveyData.description}</p>}
            </div>
            <div
              className="mb-5 my-4 flex text-[#43424D]"
              style={{ whiteSpace: "nowrap", fontSize: "16px" }}
            >
              <p style={{ fontWeight: "bold" }}>Start Date&nbsp;: &nbsp;</p>
              <p className="mr-5">{dateFormat(getOneSurveyData.startDate)}</p>

              <p style={{ fontWeight: "bold" }}>End Date&nbsp;: &nbsp;</p>
              <p>{dateFormat(getOneSurveyData.endDate)}</p>
            </div>
          </div>

          <SeperaterText className="text-primary my-12">
            {`Regulations`}
          </SeperaterText>
          <div
            style={{
              borderBottom: "2px solid #D9D9D9",
            }}
            className="flex justify-start items-center gap-x-16 "
          >
            <div className="mb-5 ml-5">
              {getOneSurveyData.regulationIdsNo?.map(
                (item: any, index: number) => {
                  return (
                    <Chip
                      key={index}
                      style={{
                        margin: "5px",
                        background: "#fff",
                        padding: "1rem",
                        border: "1px solid #43424D",
                        borderRadius: "10px",
                        color: "#43424D",
                      }}
                      label={item.name}
                    />
                  );
                }
              )}
            </div>
          </div>
          <SeperaterText className="text-primary my-12">
            {`Crop types`}
          </SeperaterText>
          <div
            className="mb-5"
            style={{ fontSize: "14px", textAlign: "center" }}
          >
            <p className="bold">FCV</p>
          </div>
          <div
            style={{
              borderBottom: "2px solid #D9D9D9",
            }}
          >
            <div className="mb-5 ml-5">
              {/* {cropTypes.map((item: any, index: any) => {
                return ( */}
              <Chip
                style={{
                  margin: "5px",
                  background: "#fff",
                  padding: "1rem",
                  border: "1px solid #43424D",
                  borderRadius: "10px",
                  color: "#43424D",
                }}
                label={getOneSurveyData?.cropId?.name}
              />
              {/* );
              })} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ViewSurvey;

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
    height: 2px;
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
