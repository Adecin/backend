"use client";

import CustomButton from "@/components/customButton";
import LabelText from "@/components/labelText";
import BreadCrumb from "@/components/table/bread-crumb";
import { Tabs, Tab, styled, Box } from "@mui/material";
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

const StyledTab = styled((props: any) => <Tab {...props} />)(({ theme }) => ({
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
}));

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

  // useEffect
  useEffect(() => {
    dispatch(listRegulationOne(regulationId));
    dispatch(listAllPillar("?regulationId=" + regulationId));
    if (EditRegulation.isSuccess) {
      dispatch(editRegulationIsSuccess());
      setIsEdit(false);
    }
  }, [regulationId, EditRegulation]);

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

  return (
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
  );
}
