"use client";

import BreadCrumb from "@/components/table/bread-crumb";

import styled from "@emotion/styled";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Chip } from "@mui/material";
const DTE2022 = () => {
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

  const cropTypes = [
    { name: "WRU" },
    { name: "Mysure-Burley" },
    { name: "Type-3" },
  ];

  return (
    <>
      <div className="p-5">
        <div className="px-4">
          <div className="flex justify-between">
            <BreadCrumb classes={` font-bold text-[#43424D]`} />
            <div>
              <NotificationsNoneIcon
                fontSize="small"
                className="mr-5 cursor-pointer"
              />
              <LogoutIcon
                fontSize="small"
                className="cursor-pointer"
                color="primary"
              />
            </div>
          </div>
          <div className="ml-5">
            <div
              className="mb-5 flex text-[#43424D]"
              style={{ fontWeight: "bold", fontSize: "14px" }}
            >
              <p>Created Date&nbsp;: &nbsp;</p>
              <p>20/05/2023</p>
            </div>
            <div
              className="mb-5 flex text-[#43424D] "
              style={{ fontSize: "14px" }}
            >
              <div style={{ whiteSpace: "nowrap" }}>
                <p style={{ fontWeight: "bold" }}>
                  Survey Description&nbsp;:&nbsp;
                </p>
              </div>
              <p>
                Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
                Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos.
              </p>
            </div>
            <div
              className="mb-5 flex text-[#43424D]"
              style={{ whiteSpace: "nowrap", fontSize: "14px" }}
            >
              <p style={{ fontWeight: "bold" }}>Start Date&nbsp;: &nbsp;</p>
              <p className="mr-5">20/05/2023</p>

              <p style={{ fontWeight: "bold" }}>End Date&nbsp;: &nbsp;</p>
              <p>20/05/2023</p>
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
              {cropTypes.map((item: any, index: any) => {
                return (
                  <Chip
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
              })}
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
              {cropTypes.map((item: any, index: any) => {
                return (
                  <Chip
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
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DTE2022;
