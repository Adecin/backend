import { Tabs, Tab, styled, Box } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import TextInput from "@/components/inputComponents/textInput";
import * as Yup from "yup";
import { Formik, useFormik } from "formik";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CustomButton from "@/components/customButton";
import BreadCrumb from "@/components/table/bread-crumb";
import Filter from "@/components/table/filter";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { getCrop } from "@/redux/reducer/crop/get-all-crop";
import { useDispatch, useSelector } from "react-redux";
import {
  addCrop,
  clear_add_crop_success,
} from "@/redux/reducer/crop/add-croptype";
import {
  clear_update_crop_success,
  updateCrop,
} from "@/redux/reducer/crop/update-crop";

const StyledTab = styled((props: any) => <Tab {...props} />)(({ theme }) => ({
  fontWeight: 500,
  fontSize: "16px",
  lineHeight: "21px",
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
  const { children, value, index, ...other } = props;
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

export default function CropManagement(props: any) {
  const [value, setValue] = React.useState(0);
  const [searchValue, setSearchValue] = React.useState("");
  const [showfcv, setshowfcv] = React.useState(false);
  const [showNfcv, setshowNfcv] = React.useState(false);
  const dispatch = useDispatch();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const AddCropState = useSelector((state: any) => state.AddCrop);
  const AddCropType = AddCropState.response;

  const UpdateState = useSelector((state: any) => state.UpdateCrop);
  const UpadteCropType = AddCropState.response;

  const CropResponse = useSelector((state: any) => state.ListCrop.response);
  const CropList = CropResponse.data;
  const CropTypeValue = value == 0 ? `FCV` : `NONFCV`;

  useEffect(() => {
    dispatch(getCrop());
    if (AddCropState.isSuccess) {
      setshowNfcv(false);
      setshowfcv(false);
      dispatch(clear_add_crop_success());
    }
  }, [AddCropState, UpdateState]);

  const cancelAdd = () => {
    setshowNfcv(false);
    setshowfcv(false);
  };

  return (
    <div>
      <div className="absolute top-0 sticky bg-white flex justify-between mt-14 mb-6 mr-12">
        <div className="">
          <BreadCrumb classes={`font-bold text-[#43424D]`} />
        </div>
        {/* <Filter
          value={searchValue}
          applyFilter={() => {}}
          onSearch={(e: string) => {
            setSearchValue(e);
          }}
          filter={<div></div>}
        /> */}
      </div>
      <Tabs
        className="mx-8"
        sx={{
          ".css-heg063-MuiTabs-flexContainer": {
            borderBottom: "2px solid #D9D9D9",
            padding: "0 1rem",
          },
        }}
        value={value}
        onChange={handleTabChange}
        aria-label="scrollable force tabs example"
      >
        <StyledTab label={`FCV type`} className="mx-6 px-6" />
        <StyledTab label={`Non FCV type`} className="mx-6 px-6" />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        <div>
          {CropList?.filter((item: any) => {
            if (item.cropType == `FCV`) {
              return item;
            }
          }).map((filteredItem: any, index: any) => {
            return <UpdateCropComponent key={index} dataItem={filteredItem} />;
          })}
          {showfcv && (
            <AddCropComponent
              cancelAdd={cancelAdd}
              cropType={CropTypeValue}
              readOnly={false}
            />
          )}
        </div>
        <CustomButton
          classes={`text-primary `}
          buttonName={`Add crop`}
          startIcon={<AddCircleIcon className="text-primary" />}
          customStyle={{
            background: "none",
            padding: "1rem 3rem",
            color: "#3D7FFA",
          }}
          handleOnClick={() => {
            setshowfcv(true);
          }}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div>
          {CropList?.filter((item: any) => {
            if (item.cropType == `NONFCV`) {
              return item;
            }
          }).map((filteredItem: any, index: any) => {
            return <UpdateCropComponent key={index} dataItem={filteredItem} />;
          })}
          {showNfcv && (
            <AddCropComponent
              cancelAdd={cancelAdd}
              cropType={CropTypeValue}
              readOnly={false}
            />
          )}
        </div>
        <CustomButton
          classes={`text-primary `}
          buttonName={`Add crop`}
          startIcon={<AddCircleIcon className="text-primary" />}
          customStyle={{
            background: "none",
            padding: "3rem 1rem",
            color: "#3D7FFA",
          }}
          handleOnClick={() => {
            setshowNfcv(true);
          }}
        />
      </CustomTabPanel>
    </div>
  );
}

const AddCropComponent = (props: any) => {
  const dispatch = useDispatch();
  const { cropType, hideField } = props;
  const SignInSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[aA-zZ\s]+$/, "Must be only alphabets")
      .required("Please enter a valid crop name"),
    cropYear: Yup.string()
      .required("Please enter a valid crop year")
      .matches(/^[0-9]+$/, "Must be only digits"),
    cropCode: Yup.string()
      .required("crop id is required")
      .max(3, "Should not be greater than 3 digits")
      .matches(/^[0-9]+$/, "Must be only digits"),
    tapCode: Yup.array().min(1, "tap number is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      cropYear: "",
      cropType: cropType,
      enterTapNumber: "",
      tapCode: [],
      cropCode: "",
    },
    validationSchema: SignInSchema,
    onSubmit: (values: any) => {
      dispatch(addCrop(values));
    },
  });

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldTouched,
    setFieldError,
    setFieldValue,
    setErrors,
    touched,
    errors,
    resetForm,
  } = formik;

  return (
    <TypeElement
      readOnly={false}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      values={values}
      errors={errors}
      touched={touched}
      setFieldValue={setFieldValue}
      setFieldError={setFieldError}
      resetForm={resetForm}
      cancelAdd={props.cancelAdd}
      setErrors={setErrors}
    />
  );
};

const UpdateCropComponent = (props: any) => {
  const dispatch = useDispatch();
  const [editCrop, setEditCrop] = useState(false);
  const UpdateState = useSelector((state: any) => state.UpdateCrop);

  useEffect(() => {
    if (UpdateState.isSuccess) {
      setEditCrop(false);
      dispatch(clear_update_crop_success());
    }
  }, [UpdateState]);

  const { dataItem } = props;
  const SignInSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[aA-zZ\s]+$/, "Must be only alphabets")
      .required("Please enter a valid crop name"),
    cropYear: Yup.string()
      .required("Please enter a valid crop year")
      .matches(/^[0-9]+$/, "Must be only digits"),
    cropCode: Yup.string()
      .required("crop id is required")
      .matches(/^[0-9]+$/, "Must be only digits"),
    tapCode: Yup.array().min(1, "tap number is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: dataItem.name ?? "",
      cropYear: dataItem.cropYear ?? "",
      cropType: dataItem.cropType ?? "",
      tapCode: dataItem.tapCode ?? [],
      enterTapNumber: "",
      cropCode: dataItem.cropCode ?? "",
      id: dataItem.id ?? "",
    },
    validationSchema: SignInSchema,
    onSubmit: (values: any) => {
      dispatch(updateCrop(values));
    },
  });

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldTouched,
    setFieldError,
    setFieldValue,
    touched,
    errors,
    resetForm,
    setErrors,
  } = formik;

  console.log("errors", errors);

  return (
    <TypeElement
      readOnly={false}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      values={values}
      errors={errors}
      touched={touched}
      setFieldValue={setFieldValue}
      setFieldError={setFieldError}
      editCrop={editCrop}
      setEditCrop={setEditCrop}
      viewPage={true}
      resetForm={resetForm}
      setErrors={setErrors}
    />
  );
};

const TypeElement = (props: any) => {
  const {
    handleChange,
    handleSubmit,
    errors,
    touched,
    vl,
    values,
    setFieldValue,
    setFieldError,
    viewPage,
    setEditCrop,
    editCrop,
    cancelAdd,
    setErrors,
    resetForm,
  } = props;

  const handleEdit = () => {
    setEditCrop(true);
  };

  return (
    <div className="w-full flex items-center mt-5 justify-between bg-[#F7F7F7] p-5 gsp-x-12">
      <div className="grid grid-cols-2 gap-x-8 ">
        <TextInput
          readOnly={viewPage && !editCrop}
          classes={` py-0 pt-2`}
          label={""}
          name="name"
          value={values}
          touched={touched}
          handleChange={handleChange}
          error={errors}
          placeholder="Type crop name here"
          customStyle={{
            color: "#858585",
            padding: "0.85rem",
            // width: "400px",
          }}
        />
        {/* tap number */}
        <div>
          <div
            className={`bg-[white] w-[300px] 2xl:w-[400px] mx-[12px] ${
              touched && touched.tapCode && errors && errors.tapCode
                ? "text-error border-2 border-error"
                : ""
            }`}
          >
            {values?.tapCode.length != 0 ? (
              <div
                className={`grid ${
                  viewPage && !editCrop ? "grid-cols-6" : "grid-cols-3"
                } p-3`}
              >
                {values?.tapCode?.map((e: any, index: number) => (
                  <div
                    key={index}
                    className={`px-2 mt-2 ${
                      viewPage && !editCrop ? "w-[40px]" : "w-[100px]"
                    }  flex items-center justify-around py-2 border border-primary rounded-[20px]`}
                  >
                    <p className="px-1">{e}</p>
                    {viewPage && !editCrop ? (
                      ""
                    ) : (
                      <div className="px-1 cursor-pointer">
                        <svg
                          onClick={() => {
                            const data = [...values.tapCode];
                            data.splice(index, 1);
                            setFieldValue("tapCode", data);
                          }}
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.2639 1.7361C9.12367 0.623064 7.59342 0 6 0C4.40658 0 2.87633 0.623064 1.73611 1.7361C0.623065 2.87633 0 4.40658 0 6C0 7.59342 0.623065 9.12367 1.73611 10.2639C2.87633 11.3769 4.40658 12 6 12C7.59342 12 9.12367 11.3769 10.2639 10.2639C11.3769 9.12367 12 7.59342 12 6C12 4.40658 11.3769 2.87633 10.2639 1.7361ZM8.13195 8.74107L6 6.60913L3.86805 8.74107L3.25892 8.13195L5.39087 6L3.25892 3.86805L3.86805 3.25892L6 5.39087L8.13195 3.25892L8.74108 3.86805L6.60913 6L8.74108 8.13195L8.13195 8.74107Z"
                            fill="#508EF1"
                          />{" "}
                          <svg
                            className="cursor-pointer"
                            width="31"
                            height="31"
                            viewBox="0 0 31 31"
                            fill="red"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z" />
                          </svg>
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
            <TextInput
              readOnly={viewPage && !editCrop}
              classes={` py-0 pt-2`}
              label={""}
              name="enterTapNumber"
              value={values}
              touched={touched}
              handleChange={(e: any) => {
                if (e.target.value.length < 3) {
                  if (values?.tapCode.length != 0) {
                    const err = { ...errors };
                    delete err.tapCode;
                    setErrors(err);
                    setFieldValue("enterTapNumber", e.target.value);
                  } else {
                    setFieldValue("enterTapNumber", e.target.value);
                  }
                }
              }}
              onKeyDown={(e: any) => {
                if (e.key == "Enter") {
                  const err = { ...errors };
                  delete err.tapCode;
                  setErrors(err);
                  setFieldValue("tapCode", [
                    ...values.tapCode,
                    values.enterTapNumber,
                  ]);
                  setFieldValue("enterTapNumber", "");
                }
              }}
              placeholder="Enter the TAP number and press 'Enter'"
              customStyle={{
                color: "#858585",
                // width: "300px",
              }}
            />
          </div>
          <span className="text-[10px] ml-3 my-1 text-error">
            {(touched && touched.tapCode && errors && errors.tapCode) ?? ""}
          </span>
        </div>

        {/* crop year */}
        <TextInput
          readOnly={viewPage && !editCrop}
          classes={` py-0 pt-2`}
          label={""}
          name="cropYear"
          value={values}
          touched={touched}
          handleChange={(e: any) => {
            if (e.target.value.length < 5) {
              setFieldValue("cropYear", e.target.value);
            }
          }}
          error={errors}
          placeholder="Type year here"
          customStyle={{
            color: "#858585",
            padding: "0.85rem",
            // width: "400px",
          }}
        />
        <TextInput
          readOnly={viewPage && !editCrop}
          classes={` py-0 pt-2`}
          label={""}
          name="cropCode"
          value={values}
          touched={touched}
          handleChange={(e: any) => {
            if (e.target.value.length < 4) {
              setFieldValue("cropCode", e.target.value);
            }
          }}
          error={errors}
          placeholder="Type crop id here"
          customStyle={{
            color: "#858585",
            padding: "0.85rem",
            // width: "400px",
          }}
        />
      </div>
      <div className="flex">
        {viewPage && !editCrop ? (
          <EditIcon
            className={`text-primary text-[28px] mx-3 cursor-pointer`}
            onClick={() => {
              handleEdit();
            }}
          />
        ) : (
          <CustomButton
            classes={` w-[107px] rounded-[30px]`}
            buttonName={`Save`}
            customStyle={{
              background: "#3D7FFA",
              borderRadius: "30px",
              padding: "0.5rem 1.5rem",
            }}
            handleOnClick={handleSubmit}
          />
        )}
        <DeleteOutlineIcon
          className={`text-grey text-[28px] mx-3 cursor-pointer`}
          onClick={() => {
            if (viewPage) {
              resetForm();
              setEditCrop(false);
            } else {
              resetForm();
              cancelAdd();
            }
          }}
        />
      </div>
    </div>
  );
};
