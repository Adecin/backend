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
import { useDispatch, useSelector } from "react-redux";
import { addVillageMang } from "@/redux/reducer/villageMang/addVillageMang";
import { updateVillageMang } from "@/redux/reducer/villageMang/updateVillageMang";
import { getAllVillageMang } from "@/redux/reducer/villageMang/getAllVillageMang";
import { deleteVillageMang } from "@/redux/reducer/villageMang/deleteVillageMang";
import { getState } from "@/redux/reducer/dropdown/get-state";
import { getDistrict } from "@/redux/reducer/dropdown/get-district";
import { getVillage } from "@/redux/reducer/dropdown/get-village";
import SelectMenu from "@/components/inputComponents/selectMenu";

export default function VillageManagement(props: any) {
  const [value, setValue] = React.useState(0);
  const [searchValue, setSearchValue] = React.useState("");
  const [showfcv, setshowfcv] = React.useState(false);
  const [showNfcv, setshowNfcv] = React.useState(false);
  const dispatch = useDispatch();

  const villageMangList = useSelector(
    (state: any) => state.getAllVillageMangData
  );
  const villageMangListData = villageMangList.response?.data;

  useEffect(() => {
    dispatch(getAllVillageMang(""));
  }, []);

  const CropTypeValue = value == 0 ? `FCV` : `NONFCV`;

  const cancelAdd = () => {
    setshowNfcv(false);
    setshowfcv(false);
  };

  return (
    <div>
      <div className="absolute top-0 sticky bg-white flex justify-between mt-14 mb-6 mr-12">
        <div className="">
          <BreadCrumb classes={` font-bold text-[#43424D]`} />
        </div>
        <Filter
          value={searchValue}
          applyFilter={() => {}}
          onSearch={(e: string) => {
            setSearchValue(e);
          }}
          filter={<div></div>}
        />
      </div>
      <div className="px-5">
        {villageMangListData?.data?.map((filteredItem: any, index: any) => {
          console.log(filteredItem);
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
        buttonName={`Add Village`}
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
    </div>
  );
}

const AddCropComponent = (props: any) => {
  const dispatch = useDispatch();

  const GetState = useSelector((state: any) => state.ListState);
  const GetDistrict = useSelector((state: any) => state.ListDistrict);
  const GetSVillage = useSelector((state: any) => state.ListVillage);

  const stateDropDown = GetState.response?.data?.map(
    (e: any, index: number) => {
      return { id: e.id, name: e.name };
    }
  );
  const districtDropDown = GetDistrict.response?.data?.map(
    (e: any, index: number) => {
      return { id: e.id, name: e.name };
    }
  );
  const villageDropDown = GetSVillage.response?.data?.map(
    (e: any, index: number) => {
      return { id: e.id, name: e.name };
    }
  );

  useEffect(() => {
    dispatch(getState());
    dispatch(getVillage());
    dispatch(getDistrict());
  }, []);

  const SignInSchema = Yup.object().shape({
    tapNumber: Yup.string()
      .required("Please enter a Tap number")
      .matches(/^[0-9]+$/, "Must be only digits"),
    villageCode: Yup.string()
      .required("Please enter a Village Code")
      .max(3, "Should not be greater than 3 digits")
      .matches(/^[0-9]+$/, "Must be only digits"),
    stateId: Yup.string().required("State is required"),
    districtId: Yup.string().required("District is required"),
    villageId: Yup.string().required("Village is required"),
  });

  const formik = useFormik({
    initialValues: {
      tapNumber: "",
      villageCode: "",
      stateId: "",
      districtId: "",
      villageId: "",
    },
    validationSchema: SignInSchema,
    onSubmit: (values: any) => {
      dispatch(addVillageMang(values));
      console.log(values);
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
      stateDropDown={stateDropDown}
      districtDropDown={districtDropDown}
      villageDropDown={villageDropDown}
    />
  );
};

const UpdateCropComponent = (props: any) => {
  const dispatch = useDispatch();
  const [editCrop, setEditCrop] = useState(false);
  const GetState = useSelector((state: any) => state.ListState);
  const GetDistrict = useSelector((state: any) => state.ListDistrict);
  const GetSVillage = useSelector((state: any) => state.ListVillage);

  const stateDropDown = GetState.response?.data?.map(
    (e: any, index: number) => {
      return { id: e.id, name: e.name };
    }
  );
  const districtDropDown = GetDistrict.response?.data?.map(
    (e: any, index: number) => {
      return { id: e.id, name: e.name };
    }
  );
  const villageDropDown = GetSVillage.response?.data?.map(
    (e: any, index: number) => {
      return { id: e.id, name: e.name };
    }
  );

  useEffect(() => {
    dispatch(getState());
    dispatch(getVillage());
    dispatch(getDistrict());
  }, []);

  // useEffect(() => {
  //   if (UpdateState.isSuccess) {
  //     setEditCrop(false);
  //     // dispatch(clear_update_crop_success());
  //   }
  // }, [UpdateState]);

  const { dataItem } = props;
  console.log("azar", dataItem);
  const SignInSchema = Yup.object().shape({
    tapNumber: Yup.string()
      .required("Please enter a Tap number")
      .matches(/^[0-9]+$/, "Must be only digits"),
    villageCode: Yup.string()
      .required("Please enter a Village Code")
      .matches(/^[0-9]+$/, "Must be only digits"),
    stateId: Yup.string().required("State is required"),
    districtId: Yup.string().required("District is required"),
    villageId: Yup.string().required("Village is required"),
  });

  const formik = useFormik({
    initialValues: {
      id: dataItem.id ?? "",
      tapNumber: dataItem.tapNumber ?? "",
      villageCode: dataItem.villageCode ?? "",
      stateId: dataItem.stateId?.id ?? "",
      districtId: dataItem.districtId?.id ?? "",
      villageId: dataItem.villageId?.id ?? "",
    },
    validationSchema: SignInSchema,
    onSubmit: (values: any) => {
      dispatch(updateVillageMang(values));
      console.log(values);
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
      editCrop={editCrop}
      setEditCrop={setEditCrop}
      viewPage={true}
      resetForm={resetForm}
      stateDropDown={stateDropDown}
      districtDropDown={districtDropDown}
      villageDropDown={villageDropDown}
    />
  );
};

const TypeElement = (props: any) => {
  const {
    handleChange,
    handleSubmit,

    stateDropDown,
    districtDropDown,
    villageDropDown,

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
    resetForm,
  } = props;

  const handleEdit = () => {
    setEditCrop(true);
  };

  return (
    <div className="w-full flex items-center mt-5 justify-between bg-[#F7F7F7] p-5 gsp-x-12">
      <div className="grid grid-cols-2 gap-x-8 ">
        <SelectMenu
          classes={`pt-[1rem]`}
          name="stateId"
          labelname="State"
          placeHolderText="Select State"
          data={stateDropDown}
          value={values}
          handleChange={handleChange}
          touched={touched}
          error={errors}
          readOnly={viewPage && !editCrop}
        />
        <SelectMenu
          classes={`pt-[1rem]`}
          name="districtId"
          labelname="District"
          placeHolderText="Select District"
          data={districtDropDown}
          value={values}
          handleChange={handleChange}
          touched={touched}
          error={errors}
          readOnly={viewPage && !editCrop}
        />
        <SelectMenu
          name="villageId"
          labelname="Village"
          placeHolderText="Select Village"
          data={villageDropDown}
          value={values}
          handleChange={(e: any) => {
            setFieldValue("villageId", e.target.value);
          }}
          touched={touched}
          error={errors}
          readOnly={viewPage && !editCrop}
        />
        {/* <TextInput
          readOnly={viewPage && !editCrop}
          classes={` py-0 pt-4`}
          label={""}
          name="villageName"
          value={values}
          touched={touched}
          handleChange={handleChange}
          error={errors}
          placeholder="Type crop name here"
          customStyle={{
            color: "#858585",
            padding: "0.85rem",
            width: "400px",
          }}
        /> */}

        {/* crop year */}
        <TextInput
          readOnly={viewPage && !editCrop}
          classes={` py-0 pt-2`}
          label={""}
          name="tapNumber"
          value={values}
          touched={touched}
          handleChange={handleChange}
          error={errors}
          placeholder="Type Tap Number"
          customStyle={{
            padding: "0.85rem",
            // width: "400px",
          }}
        />
        <div className="2xl:w-[400px]">
          <TextInput
            readOnly={viewPage && !editCrop}
            classes={` py-0 pt-2`}
            label={""}
            name="villageCode"
            value={values}
            touched={touched}
            handleChange={handleChange}
            error={errors}
            placeholder="Type Village Code"
            customStyle={{
              padding: "0.85rem",
            }}
          />
        </div>
      </div>
      <div className="flex min-w-[300px]">
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
