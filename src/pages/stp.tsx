"use client";

import CustomButton from "@/components/customButton";
import LabelText from "@/components/labelText";
import BreadCrumb from "@/components/table/bread-crumb";
import { Tabs, Tab, styled, Box } from "@mui/material";
import React from "react";
import QuestionaireComp from "@/components/questionaireTab";
import TabPanel from "@mui/lab/TabPanel/TabPanel";

const StyledTab = styled((props: any) => <Tab {...props} />)(({ theme }) => ({
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '24px',
    margin: '0 5rem',
    textTransform: 'none',
    color:"#858585",
    '&.Mui-selected': {
      fontWeight: 700,
      color: '#3D7FFA',
    },
  }));

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  

  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }

export default function StpQuestionaire() {

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const questionaireHeaders = [
        { name: "Nursery", id: "" },
        { name: "Mainfield", id: "" },
        { name: "Nutrient management", id: "" },
        { name: "Soil", id: "" },
        { name: "Bio diversity", id: "" },
        { name: "CPA Safety", id: "" },
        { name: "Curing", id: "" },
        { name: "NTRM Bale search", id: "" },
    ]


    return (
        <div className="flex flex-col my-[5rem] mx-[3rem] gap-y-6">
            <div className="flex ml-[-20px] justify-between font-medium text-lg tracking-wider flex items-center">
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
                    }}
                />
            </div>
            <div className="flex gap-x-8 rounded-[10px]">
                <LabelText labelName={`Description`} />
                <p className="px-4 py-6 bg-lGrey text-text" style={{
                    fontWeight: 400,
                    lineHeight: "20px",
                    letterSpacing: "0.05em",
                    fontSize: "14px",
                    maxWidth: "710px"
                }}>{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`}</p>
            </div>
            {/* <div className="stpContainer">
                <Tabs className=""
                    sx={{
                        ".MuiTabs-scrollButtons.Mui-disabled": {
                            opacity: 0.3,
                            color: "#fff",
                            background: "#E1DFDF",
                            fontSize: "28px",
                            height: "30px",
                            width: "30px",
                            borderRadius: "100%"
                        }
                    }}
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                    aria-label="scrollable force tabs example">
                        {questionaireHeaders.map((tabItem: any) => {
                            return (

                                <StyledTab key={tabItem.id} label={tabItem.name} className="mx-5 px-5" />
                            )
                        })}
                </Tabs>
                <CustomTabPanel value={value} index={0}>
                    <QuestionaireComp />
                </CustomTabPanel>
            </div> */}
        </div>
    )
};