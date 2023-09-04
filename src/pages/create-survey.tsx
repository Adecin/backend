"use client";

import React, { lazy, Suspense, useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import { Metadata } from "next";
import BreadCrumb from "@/components/table/bread-crumb";
import Filter from "@/components/table/filter";
import SelectMenu from "@/components/inputComponents/selectMenu";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useRouter } from "next/navigation";
import TextInput from "@/components/inputComponents/textInput";
import TextArea from "@/components/inputComponents/texArea";
import { useFormik } from "formik";
import * as Yup from "yup";
import HeaderText from "@/components/textComponents/headerText";
import LabelText from "@/components/labelText";
import styled from "@emotion/styled";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CustomButton from "@/components/customButton";
import { getCrop } from "@/redux/reducer/crop/get-all-crop";
import { useDispatch, useSelector } from "react-redux";
import { listAllRegulation } from "@/redux/reducer/regulation/listAllRegulation";
import MultiSelectMenu from "@/components/inputComponents/multiSelect";
import { Chip, SelectChangeEvent } from "@mui/material";
import { addNewSurvey } from "@/redux/reducer/survey/add-survey";

const CreateSurvey = () => {
  const [allSelect, setSelect] = useState(false);
  const [showRegulations, setShowRegulations] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const CropResponse = useSelector((state: any) => state.ListCrop.response);
  const CropList = CropResponse.data;

  console.log(`CropList`, CropList);

  const RegulationData = useSelector(
    (state: any) => state.ListAllRegulation.response
  );

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
  const [selectedType, setSelectedType] = useState("FCV");

  const SignInSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[aA-zZ]+$/, "Must be only alphabets")
      .required("Survey name is required"),
    description: Yup.string().required("Survey description is required"),
    //.matches(/^[aA-zZ0-9\s]+$/, "Please enter a valid description"),
    startDate: Yup.string().required("StartDate is required"),
    endDate: Yup.string().required("EndDate is required"),
    cropId: Yup.string().required(),
    regulationIdsNo: Yup.array().required(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      cropId: "",
      regulationIdsNo: [],
    },
    validationSchema: SignInSchema,
    onSubmit: (values: any) => {
      console.log(values);
      dispatch(addNewSurvey(values));
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

  console.log(`vallues`, values);

  useEffect(() => {
    dispatch(getCrop());
    dispatch(listAllRegulation());
  }, []);

  const filterCropType = (type: any) => {
    const filtereData = CropList?.filter((item: any) => {
      if (item.cropType == type) {
        return item;
      }
    });
    return filtereData;
  };

  useEffect(() => {
    filterCropType(selectedType);
  }, [selectedType]);

  const [selectedItems, setSelectedItems] = useState<any>([]);

  const handleSelectItems = () => {
    setSelectedItems({ id: "", name: "" });
  };

  const handleAddRegulation = (id: any) => {
    console.log(`id`, id);
    setFieldValue(`regulationIdsNo`, id);
  };

  return (
    <>
      <div className="p-5">
        <div className="px-4">
          <div className="flex justify-between">
            <BreadCrumb classes={` font-bold text-[#43424D]`} />
          </div>
          <div className="flex justify-between ">
            <div className="w-full">
              <TextInput
                classes={` py-0 pt-2`}
                required
                label={"Survey name"}
                name="name"
                value={values}
                onblur={handleBlur}
                touched={touched}
                handleChange={handleChange}
                error={errors}
                placeholder="Type survey name here"
                customStyle={{
                  background: "#F7F7F7",
                }}
              />
              <p className="px-4 py-2">
                <span>{`Created date :`}</span>
                <span>{` 20/05/2023`}</span>
              </p>
            </div>
            <div className="w-full">
              <TextArea
                classes={` py-0 pt-2`}
                customStyle={{
                  background: "#F7F7F7",
                }}
                required
                label={"Survey description"}
                name="description"
                value={values}
                onblur={handleBlur}
                touched={touched}
                handleChange={handleChange}
                error={errors}
                placeholder="Type survey description here"
              />
            </div>
          </div>
          <div className="w-[65%] m-auto">
            <div className="w-fill flex justify-start">
              <LabelText classes={`w-full`} labelName={`Start date`} />
              <LabelText classes={`w-full`} labelName={`End date`} />
            </div>
            <div className="bg-lGrey w-full flex mt-[1rem] px-[2rem] py-[1rem]">
              <div className="w-full">
                <TextInput
                  label={""}
                  name="startDate"
                  type="date"
                  value={values}
                  onblur={handleBlur}
                  handleChange={handleChange}
                  touched={touched}
                  error={errors}
                />
              </div>
              <div className="w-full">
                <TextInput
                  label={""}
                  name="endDate"
                  type="date"
                  value={values}
                  onblur={handleBlur}
                  handleChange={handleChange}
                  touched={touched}
                  error={errors}
                />
              </div>
            </div>
          </div>
          <SeperaterText className="text-primary my-12">{`Regulations`}</SeperaterText>
          <div
            style={{
              borderBottom: "2px solid #D9D9D9",
            }}
            className="flex justify-start items-center gap-x-16 "
          >
            {showRegulations ? (
              <div className="flex flex-col mx-[1rem] my-[2rem]">
                <LabelText
                  classes={`w-full`}
                  labelName={`Regulations`}
                  required={true}
                />
                <div className="flex gap-x-6 my-4">
                  <div>
                    {values.regulationIdsNo.map((item: any) => {
                      return (
                        <>
                          <Chip
                            style={{
                              margin: "5px",
                              background: "#fff",
                              padding: "1.5rem",
                              border: "1px solid #3D7FFA",
                              borderRadius: "10px",
                              color: "#3D7FFA",
                            }}
                            sx={{
                              "MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiChip-deleteIcon MuiChip-deleteIconMedium MuiChip-deleteIconColorDefault MuiChip-deleteIconFilledColorDefault css-i4bv87-MuiSvgIcon-root":
                                {
                                  padding: "1rem",
                                  color: "#3D7FFA",
                                },
                            }}
                            label={item}
                            onDelete={() => {}}
                          />
                        </>
                      );
                    })}
                  </div>
                  <CustomButton
                    classes={`text-primary`}
                    buttonName={``}
                    startIcon={<AddCircleIcon className="text-primary" />}
                    customStyle={{
                      background: "none",
                      height: "3rem",
                      padding: "1rem",
                      color: "#3D7FFA",
                    }}
                    handleOnClick={() => {
                      setShowRegulations(false);
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-x-6">
                <div className="p-[1rem]">
                  <MultiSelectMenu
                    labelStyle={{ color: "#3D7FFA" }}
                    fieldStyle={{
                      fontSize: "16px",
                      marginTop: "0.5rem",
                      width: "336px",
                      color: "#3D7FFA",
                      background: "#F7F7F7",
                      boxShadow: "2px 2px 5px #0000003d",
                    }}
                    name={`regulationIdsNo`}
                    data={RegulationData ?? []}
                    handleChange={(e: any) => {
                      console.log(`e.target.value`, e.target.value);
                      handleAddRegulation(e.target.value);
                    }}
                    value={values.regulationIdsNo}
                    placeHolderText={"Select Regulations"}
                  />
                </div>
                <CustomButton
                  classes={`text-primary`}
                  buttonName={`Save`}
                  customStyle={{
                    background: "#3D7FFA",
                    border: "1px solid #3D7FFA",
                    height: "3rem",
                    padding: "1rem 2rem",
                    color: "#fff",
                    fontSize: "16px",
                  }}
                  handleOnClick={() => {
                    setShowRegulations(true);
                  }}
                />
              </div>
            )}
          </div>
          <SeperaterText className="text-primary my-12">{`Crop type`}</SeperaterText>
          <div
            style={{
              borderBottom: "2px solid #D9D9D9",
            }}
          >
            <div className="flex justify-start items-center gap-x-16 my-[2rem]">
              <div className="p-[1rem]" style={{}}>
                <FormControl>
                  <RadioGroup
                    value={selectedType}
                    onChange={(e: any) => {
                      console.log(`value`, e.target.value);
                      setSelectedType(e.target.value);
                    }}
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value={"FCV"}
                      control={
                        <Radio
                          sx={{
                            color: "var(--primary) !important",
                          }}
                        />
                      }
                      label="FCV"
                    />
                    <FormControlLabel
                      value={"NONFCV"}
                      control={
                        <Radio
                          sx={{
                            color: "var(--primary) !important",
                          }}
                        />
                      }
                      label="Non-FCV"
                    />
                  </RadioGroup>
                </FormControl>
                <SelectMenu
                  fieldStyle={{
                    marginTop: "0.5rem",
                    width: "336px",
                    color: "#3D7FFA",
                    background: "#F7F7F7",
                    boxShadow: "2px 2px 5px #0000003d",
                  }}
                  name={"cropId"}
                  data={filterCropType(selectedType) ?? []}
                  handleChange={handleChange}
                  value={values}
                  placeHolderText={"Select Crop"}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center my-4">
          <CustomButton
            buttonName={`Create Survey`}
            customStyle={{
              padding: "1rem 3rem",
            }}
            handleOnClick={() => {
              handleSubmit();
            }}
          />
        </div>
      </div>
    </>
  );
};
export default CreateSurvey;
