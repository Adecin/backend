"use client";

import CustomButton from "@/components/customButton";
import LabelText from "@/components/labelText";
import BreadCrumb from "@/components/table/bread-crumb";
import { Tabs, Tab, styled, Box, Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import QuestionaireComp from "@/components/regulation/questionaireTab";
import TabPanel from "@mui/lab/TabPanel/TabPanel";
import { useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { listRegulationOne } from "@/redux/reducer/regulation/list-one-regulation";
import { listAllPillar } from "@/redux/reducer/regulation/list-pillar";
import TextInput from "../inputComponents/textInput";
import TextArea from "../inputComponents/texArea";
import {
  editRegulation,
  editRegulationIsSuccess,
} from "@/redux/reducer/regulation/edit-regulation";
import AddCategory from "../addCategoryPop";

export const StyledTab = styled((props: any) => <Tab {...props} />)(
  ({ theme }) => ({
    fontWeight: 500,
    fontSize: "18px",
    lineHeight: "24px",
    margin: "0 5rem",
    textTransform: "none",
    color: "#858585",
    "&.Mui-selected": {
      fontWeight: 700,
      color: "#3D7FFA",
    },
  })
);

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other }: any = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function StpQuestionary() {
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();
  const params = useSearchParams();
  const regulationId: any = params?.get("id");
  const RegulationData = useSelector((state: any) => state.ListRegulationOne);
  const PillarData = useSelector((state: any) => state.ListAllPillar);
  const EditRegulation = useSelector((state: any) => state.EditRegulation);
  const [isEdit, setIsEdit] = useState(false);
  const [addCategory, setCategoryPop] = useState(false);
  const AddCategoryResponse = useSelector(
    (state: any) => state.AddCategoryState
  );

  // useEffect
  useEffect(() => {
    dispatch(listRegulationOne(regulationId));
    dispatch(listAllPillar("?regulationId=" + regulationId));
    if (EditRegulation.isSuccess) {
      dispatch(editRegulationIsSuccess());
      setIsEdit(false);
    }
  }, [regulationId, EditRegulation, AddCategoryResponse]);

  const handleChange1 = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // validation
  const QuestionaireSchema = Yup.object().shape({
    description: Yup.string().required("description  is required"),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      description: RegulationData.response.description ?? "",
    },
    validationSchema: QuestionaireSchema,
    onSubmit: (values: any) => {
      const object = {
        description: values.description,
        id: regulationId,
      };
      dispatch(editRegulation(object));
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

  const handlePopClose = (e: any) => {
    setCategoryPop(false);
  };

  return (
    <>
      <div className="flex flex-col my-[5rem] mx-[3rem] gap-y-6">
        <div className="flex ml-[-20px] justify-between font-medium text-lg tracking-wider flex items-center">
          <BreadCrumb lastName={RegulationData.response.name ?? ""} />
          <CustomButton
            classes={` flex self-end`}
            buttonName={isEdit ? "Save" : `Edit`}
            customStyle={{
              width: "133px",
              height: "36px",
              padding: "0.5rem 1rem",
              borderRadius: "30px",
            }}
            handleOnClick={() => {
              if (isEdit) {
                handleSubmit();
              } else {
                setIsEdit(!isEdit);
              }
            }}
          />
        </div>
        <div className="flex gap-x-8 rounded-[10px]">
          <TextArea
            classes={` py-0 pt-2`}
            customStyle={{
              marginTop: "0.5rem",
              background: "#F7F7F7",
              width: "100%",
              minWidth: "700px",
              color: "#858585",
            }}
            required={isEdit}
            resizeValue={!isEdit ? "none" : ""}
            readOnly={!isEdit}
            label={"Regulation description"}
            name="description"
            handleChange={handleChange}
            value={values}
            onblur={handleBlur}
            touched={touched}
            error={errors}
            placeholder="Type regulation description here"
          />
        </div>
        <div className="flex gap-x-12 items-center mx-4">
          <span
            style={{
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "24px",
              letterSpacing: "0.05em",
              textAlign: "left",
            }}
          >{`Sub categories`}</span>
          <CustomButton
            classes={` flex self-end px-4`}
            buttonName={`Add category`}
            customStyle={{
              width: "133px",
              height: "36px",
              padding: "0.5rem 1rem",
              borderRadius: "30px",
            }}
            handleOnClick={() => {
              setCategoryPop(true);
            }}
          />
        </div>
        <div className="stpContainer">
          <Tabs
            className=""
            sx={{
              ".css-145v6pe-MuiButtonBase-root-MuiTabScrollButton-root": {
                color: "#fff",
                background: "#3D7FFA",
                fontSize: "28px",
                height: "30px",
                width: "30px",
                borderRadius: "100%",
                margin: "1rem",
              },
              ".MuiTabs-scrollButtons.Mui-disabled": {
                opacity: 0.3,
                color: "#fff",
                background: "#BEBEBE",
                fontSize: "28px",
                height: "30px",
                width: "30px",
                borderRadius: "100%",
              },
            }}
            value={value}
            onChange={handleChange1}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            aria-label="scrollable force tabs example"
          >
            {Array.isArray(PillarData.response) &&
              PillarData.response?.map((tabItem: any) => {
                return (
                  <StyledTab
                    key={tabItem.id}
                    label={tabItem.name}
                    className="mx-5 px-5"
                  />
                );
              })}
          </Tabs>

          {Array.isArray(PillarData.response) &&
            PillarData.response?.map((item: any, index: any) => {
              return (
                <CustomTabPanel key={index} value={value} index={index}>
                  <QuestionaireComp
                    pillarId={item.id}
                    regulationId={regulationId}
                    data={item?.questData}
                  />
                </CustomTabPanel>
              );
            })}
        </div>
      </div>
      <Dialog open={addCategory} fullWidth={true} maxWidth={`sm`}>
        <div className="ml-auto bg-[#F9FAFB] mt-3 mr-2">
          <svg
            onClick={() => {
              setCategoryPop(false);
            }}
            className="cursor-pointer"
            width="31"
            height="31"
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_394_1843)">
              <circle cx="15.5" cy="11.5" r="11.5" fill="#858585" />
              <path
                d="M10.3022 6.30219C10.3978 6.20639 10.5115 6.13039 10.6365 6.07854C10.7616 6.02669 10.8956 6 11.031 6C11.1664 6 11.3004 6.02669 11.4255 6.07854C11.5506 6.13039 11.6642 6.20639 11.7598 6.30219L15.5002 10.0411L19.2405 6.30219C19.3362 6.20648 19.4498 6.13056 19.5749 6.07876C19.6999 6.02696 19.8339 6.0003 19.9693 6.0003C20.1047 6.0003 20.2387 6.02696 20.3637 6.07876C20.4888 6.13056 20.6024 6.20648 20.6981 6.30219C20.7938 6.3979 20.8697 6.51152 20.9215 6.63657C20.9733 6.76162 21 6.89565 21 7.031C21 7.16636 20.9733 7.30039 20.9215 7.42544C20.8697 7.55049 20.7938 7.66411 20.6981 7.75982L16.9592 11.5002L20.6981 15.2405C20.8914 15.4338 21 15.6959 21 15.9693C21 16.2427 20.8914 16.5048 20.6981 16.6981C20.5048 16.8914 20.2427 17 19.9693 17C19.6959 17 19.4338 16.8914 19.2405 16.6981L15.5002 12.9592L11.7598 16.6981C11.5665 16.8914 11.3044 17 11.031 17C10.7576 17 10.4955 16.8914 10.3022 16.6981C10.1089 16.5048 10.0003 16.2427 10.0003 15.9693C10.0003 15.6959 10.1089 15.4338 10.3022 15.2405L14.0411 11.5002L10.3022 7.75982C10.2064 7.66416 10.1304 7.55055 10.0785 7.42549C10.0267 7.30044 10 7.16638 10 7.031C10 6.89562 10.0267 6.76157 10.0785 6.63651C10.1304 6.51146 10.2064 6.39785 10.3022 6.30219Z"
                fill="#F9FAFB"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_394_1843"
                x="0"
                y="0"
                width="31"
                height="31"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_394_1843"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_394_1843"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </div>
        <AddCategory regulationId={regulationId} onClose={handlePopClose} />
      </Dialog>
    </>
  );
}
