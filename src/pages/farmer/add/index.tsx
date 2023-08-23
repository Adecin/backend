"use client";
import * as Yup from "yup";
import { Formik, useFormik } from "formik";
import PhoneNumber from "@/components/inputComponents/phoneNumber";
import SelectMenu from "@/components/inputComponents/selectMenu";
import TextInput from "@/components/inputComponents/textInput";
import BreadCrumb from "@/components/table/bread-crumb";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getState } from "@/redux/reducer/dropdown/get-state";
import { getVillage } from "@/redux/reducer/dropdown/get-village";
import { getDistrict } from "@/redux/reducer/dropdown/get-district";
import { listFarm } from "@/redux/reducer/farmer/list-farm";
import { getCrop } from "@/redux/reducer/crop/get-all-crop";
import { addFarmer } from "@/redux/reducer/farmer/add-farmer";
import { addFarm } from "@/redux/reducer/farmer/add-farm";
import { listOneFarmer } from "@/redux/reducer/farmer/list-one-farmer";
import { editFarmer } from "@/redux/reducer/farmer/edit-farmer";
import { editFarm } from "@/redux/reducer/farmer/edit-farm";
import HeaderText from "@/components/textComponents/headerText";

const AddFarmer = () => {
  // other data
  const searchQuery = useSearchParams();
  const farmer_id = searchQuery?.get("id");
  const dispatch = useDispatch();
  const [addFormDetail, setFormDetail] = useState<any>(false);
  const [previewImage, setPreviewImage] = useState<any>(null);
  const openProfile: any = useRef(null);
  const aadhar: any = useRef(null);
  // api data
  const GetState = useSelector((state: any) => state.ListState);
  const GetDistrict = useSelector((state: any) => state.ListDistrict);
  const GetSVillage = useSelector((state: any) => state.ListVillage);
  const farmData = useSelector((state: any) => state.listFarm);
  const addFarmerData = useSelector((state: any) => state.AddFarmer);
  const editFarmerData = useSelector((state: any) => state.EditFarmer);
  const AddFarm = useSelector((state: any) => state.AddFarm);
  const farmerOneData = useSelector((state: any) => state.listOneFarmer);

  // useEffects
  useEffect(() => {
    dispatch(getState());
    dispatch(getVillage());
    dispatch(getDistrict());
    dispatch(getCrop());
    if (farmer_id) {
      dispatch(listOneFarmer(farmer_id));
    }
  }, [farmer_id]);

  useEffect(() => {
    if (addFarmerData.response.id || farmer_id) {
      dispatch(listFarm(addFarmerData.response.id ?? farmer_id));
      setFormDetail(false);
    }
  }, [addFarmerData, AddFarm, farmer_id]);

  // dropdowns
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
  const marriedDropDown = [
    {
      id: "Single",
      name: "Single",
    },
    {
      id: "Married",
      name: "Married",
    },
    {
      id: "Divorced",
      name: "Divorced",
    },
  ];

  //<==================== validations ================================>

  const ProfileSchemas = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    TBGRId: Yup.string()
      .matches(/^[0-9]+$/, "Invalid TBGR Id")
      .min(8, "Invalid TBGR Id")
      .max(8, "Invalid TBGR Id")
      .required("TBGR Id  is required"),
    phoneNo: Yup.string()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(10, 'Must be exactly 10 digits')
      .max(10, 'Must be exactly 10 digits')
      .required('Contact number is required'),
    age: Yup.string()
      .matches(/^[0-9]+$/, "Invalid age")
      .required("Age is required"),
    gender: Yup.string().required("Gender is required"),
    farmerId: Yup.string()
      .matches(/^[A-Z]{4}\d{7}/, "Invalid farmer id")
      .max(11, "Invalid farmer id")
      .required("Farmer id is required"),
    // address
    address: Yup.string().required("House No or Street Area is required"),
    stateId: Yup.string().required("State is required"),
    districtId: Yup.string().required("District is required"),
    villageId: Yup.string().required("Village is required"),
    pincode: Yup.number()
      .typeError("Invalid pincode")
      .required("Pincode is required"),
    // family info
    martialStatus: Yup.string().required("Marital status is required"),

    // government id proof
    adharNumber: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digis")
      .min(12, "Invalid aadhar number")
      .max(12, "Invalid aadhar number")
      .required("Aadhar card number is required"),

    // images
    profileImage: farmerOneData.response?.id
      ? Yup.string().notRequired()
      : Yup.mixed()

        .test(
          "profile image required",
          "profile image required",
          (value: any) => {
            if (value.type) {
              return true;
            } else {
              return false;
            }
          }
        )
        .required("Profile image  is required"),

    adharImage: farmerOneData.response?.id
      ? Yup.string().notRequired()
      : Yup.mixed()
        .test(
          "aadhar card is required",
          "aadhar card is required",
          (value: any) => {
            if (value.type) {
              return true;
            } else {
              return false;
            }
          }
        )
        .required("Aadhar card is required"),
  });

  // <================ field values ===================>
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      profileImage: farmer_id
        ? farmerOneData.response?.profileImage ?? null
        : null,
      name: farmer_id ? farmerOneData.response?.name ?? "" : "",
      farmerId: farmer_id ? farmerOneData.response?.farmerId ?? "" : "",
      TBGRId: !farmer_id ? "" : farmerOneData.response?.TBGRId ?? "",
      countryCode: farmer_id
        ? farmerOneData.response?.countryCode ?? "+91"
        : "+91",
      phoneNo: !farmer_id ? "" : farmerOneData.response?.phoneNo ?? "",
      age: !farmer_id ? "" : farmerOneData.response?.age ?? "",
      gender: !farmer_id ? "" : farmerOneData.response?.gender ?? "",
      education: !farmer_id ? "" : farmerOneData.response?.education ?? "",
      address: !farmer_id ? "" : farmerOneData.response?.address ?? "",
      stateId: !farmer_id ? "" : farmerOneData.response?.stateId?.id ?? "",
      districtId: !farmer_id
        ? ""
        : farmerOneData.response?.districtId?.id ?? "",
      villageId: !farmer_id ? "" : farmerOneData.response?.villageId?.id ?? "",
      pincode: !farmer_id ? "" : farmerOneData.response?.pincode ?? "",
      martialStatus: !farmer_id
        ? ""
        : farmerOneData.response?.martialStatus ?? "",
      spouseName: !farmer_id ? "" : farmerOneData.response?.spouseName ?? "",
      childrenMale: !farmer_id
        ? ""
        : farmerOneData.response?.childrenMale ?? "",
      childrenFemale: !farmer_id
        ? ""
        : farmerOneData.response?.childrenFemale ?? "",
      adharNumber: !farmer_id ? "" : farmerOneData.response?.adharNumber ?? "",
      adharImage: !farmer_id ? "" : farmerOneData.response?.adharImage ?? "",
    },
    validationSchema: ProfileSchemas,
    onSubmit: (values: any) => {
      submit(values);
    },
  });

  // submit farm
  const submit = (data: any) => {
    const apiFormData = new FormData();

    for (let key in data) {
      apiFormData.append(key, data[key]);
    }
    if (farmer_id) {
      apiFormData.append("id", farmer_id);
      dispatch(editFarmer(apiFormData));
    } else {
      apiFormData.append("status", "Approved");
      dispatch(addFarmer(apiFormData));
    }
  };

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    setFieldTouched,
    setFieldValue,
    resetForm,
    setErrors,
    errors,
    setFieldError,
  }: any = formik;

  return (
    <div className="flex mx-auto">
      <div className="p-5 mx-auto">
        <div className="">
          <BreadCrumb lastName={farmer_id ? "Edit Farmer" : ""} />
        </div>
        <div className="px-5">
          {/* add persional details */}
          <div className="">
            {/* title */}
            <div className="my-4">
              <HeaderText text={`Personal info`} />
            </div>
            <div className="max-w-[1200px] bg-lblue  rounded-[10px] flex p-[2rem]">
              {/* profile */}
              <div className="p-5 relative w-[180px] max-w-[150px] h-[180px]">
                <div className="text-grey text-[16px] my-2">
                  Profile Photo <span className="text-error">*</span>
                </div>
                <img
                  src={
                    previewImage ??
                    values.profileImage ??
                    `/sampleProfileAvatar.svg`
                  }
                  alt="profile"
                  className="rounded-[50%] w-[100px] h-[100px]"
                />
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  ref={openProfile}
                  name={"profileImage"}
                  onChange={(e: any) => {
                    setFieldValue(`profileImage`, e.target.files[0]);
                    setPreviewImage(URL.createObjectURL(e.target.files[0]));
                    setFieldTouched(`profileImage`, true, false);
                  }}
                />
                <div
                  onClick={() => {
                    openProfile.current.click();
                  }}
                  className="bg-primary cursor-pointer p-2 w-[30px] rounded-[50%] absolute right-6 bottom-5"
                >
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
                </div>
                <div className="py-3 text-grey text-center w-[100px] text-[10px] underline-none">
                  &nbsp;Supported file format <br /> jpg,png,jpeg.
                </div>
                <div className="py-5 px-0 text-[10px] text-error">
                  {touched?.profileImage && errors?.profileImage
                    ? errors?.profileImage ?? ""
                    : ""}
                </div>
              </div>
              {/* form */}
              <div className="grid grid-cols-2 w-full lg:grid-cols-3">
                <div className="w-[100%]">
                  <TextInput
                    label="Name"
                    name="name"
                    required={true}
                    value={values}
                    handleChange={handleChange}
                    onblur={handleBlur}
                    touched={touched}
                    error={errors}
                    placeholder="Enter Name"
                  />
                </div>
                <div>
                  <TextInput
                    label="Farmer ID"
                    placeholder="Enter Farmer id"
                    name="farmerId"
                    value={values}
                    required={true}
                    handleChange={(e: any) => {
                      setFieldValue("farmerId", e.target.value.toUpperCase());
                    }}
                    onblur={handleBlur}
                    touched={touched}
                    error={errors}
                  />
                </div>
                <div>
                  <TextInput
                    label="TBGR ID"
                    placeholder="Enter tbgr id"
                    name="TBGRId"
                    value={values}
                    required={true}
                    handleChange={handleChange}
                    onblur={handleBlur}
                    touched={touched}
                    error={errors}
                  />
                </div>
                <div>
                  <PhoneNumber
                    label="Phone Number"
                    placeholder="Enter number"
                    name="phoneNo"
                    countryCodeName="countryCode"
                    changeCountryCode={handleChange}
                    value={values}
                    required={true}
                    handleChange={handleChange}
                    onblur={handleBlur}
                    touched={touched}
                    error={errors}
                  />
                </div>
                <div>
                  <TextInput
                    label="Age"
                    placeholder="Enter age"
                    name="age"
                    value={values}
                    handleChange={handleChange}
                    onblur={handleBlur}
                    required={true}
                    touched={touched}
                    error={errors}
                  />
                </div>
                <div className="pt-5">
                  <SelectMenu
                    name="gender"
                    labelname="Gender"
                    placeHolderText="Select Gender"
                    data={[
                      {
                        name: "Male",
                        id: "MALE",
                      },
                      {
                        name: "Female",
                        id: "FEMALE",
                      },
                    ]}
                    value={values}
                    handleChange={handleChange}
                    onblur={handleBlur}
                    touched={touched}
                    required={true}
                    error={errors}
                  />
                </div>

                <div>
                  <TextInput
                    label="Education"
                    placeholder="Enter Education"
                    name="education"
                    value={values}
                    handleChange={handleChange}
                    onblur={handleBlur}
                    touched={touched}
                    error={errors}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Address */}
          <div className="">
            {/* title */}
            <div className="my-4">
              <HeaderText text={`Address`} required={true} />
            </div>
            <div className="max-w-[1200px] rounded-[10px] bg-lblue flex">
              <div className="grid grid-cols-2 w-full lg:grid-cols-3">
                <div>
                  <TextInput
                    label="House No,Street,area"
                    placeholder="Type here"
                    name="address"
                    value={values}
                    required={true}
                    handleChange={handleChange}
                    onblur={handleBlur}
                    touched={touched}
                    error={errors}
                  />
                </div>{" "}
                <div className="pt-5">
                  <SelectMenu
                    name="stateId"
                    labelname="State"
                    placeHolderText="Select state"
                    required={true}
                    data={stateDropDown ?? []}
                    value={values}
                    handleChange={(e: any) => {
                      dispatch(getDistrict("?stateId=" + e.target.value));
                      setFieldValue("stateId", e.target.value);
                    }}
                    onblur={handleBlur}
                    touched={touched}
                    error={errors}
                  />
                </div>
                <div className="pt-5">
                  <SelectMenu
                    name="districtId"
                    labelname="District"
                    required={true}
                    placeHolderText="Select district"
                    data={districtDropDown ?? []}
                    value={values}
                    handleChange={(e: any) => {
                      dispatch(getDistrict("?districtId=" + e.target.value));
                      setFieldValue("districtId", e.target.value);
                    }}
                    onblur={handleBlur}
                    touched={touched}
                    error={errors}
                  />
                </div>
                <div className="pt-5">
                  <SelectMenu
                    name="villageId"
                    labelname="Village"
                    required={true}
                    placeHolderText="Select village"
                    data={villageDropDown ?? []}
                    value={values}
                    handleChange={handleChange}
                    onblur={handleBlur}
                    touched={touched}
                    error={errors}
                  />
                </div>
                <div className="w-[100%]">
                  <TextInput
                    label="Pin Code"
                    name="pincode"
                    placeholder="Type Pin Code"
                    required={true}
                    value={values}
                    handleChange={handleChange}
                    onblur={handleBlur}
                    touched={touched}
                    error={errors}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="lg:flex">
            {/* Family info */}
            <div className="">
              {/* title */}
              <div className="my-4">
                <HeaderText text={`Family Info`} />
              </div>
              <div className="lg:w-[700px] bg-lblue rounded-[10px] flex">
                <div className=" w-full ">
                  <div className="flex w-full">
                    <div className="pt-5 w-full">
                      <SelectMenu
                        name="martialStatus"
                        labelname="Marital Status"
                        placeHolderText="Select status"
                        data={marriedDropDown}
                        value={values}
                        required={true}
                        handleChange={handleChange}
                        onblur={handleBlur}
                        touched={touched}
                        error={errors}
                      />
                    </div>
                    <div className="w-full">
                      <TextInput
                        label="Spouse Name"
                        placeholder="Type name here"
                        name="spouseName"
                        value={values}
                        handleChange={handleChange}
                        onblur={handleBlur}
                        touched={touched}
                        error={errors}
                      />
                    </div>
                  </div>
                  <div className="px-3 text-text font-medium mx-1">
                    Children
                  </div>
                  <div className="flex">
                    <div className="pt-2 w-full">
                      <SelectMenu
                        name="childrenMale"
                        labelname="Male"
                        placeHolderText="Select number of children"
                        data={[
                          {
                            name: "1",
                            id: "1",
                          },
                          {
                            name: "2",
                            id: "2",
                          },
                          {
                            name: "3",
                            id: "3",
                          },
                          {
                            name: "4",
                            id: "4",
                          },
                        ]}
                        value={values}
                        handleChange={handleChange}
                        onblur={handleBlur}
                        touched={touched}
                        error={errors}
                      />
                    </div>
                    <div className="pt-2 w-full">
                      <SelectMenu
                        name="childrenFemale"
                        labelname="Female"
                        placeHolderText="Select number of children"
                        data={[
                          {
                            name: "1",
                            id: "1",
                          },
                          {
                            name: "2",
                            id: "2",
                          },
                          {
                            name: "3",
                            id: "3",
                          },
                          {
                            name: "4",
                            id: "4",
                          },
                        ]}
                        value={values}
                        handleChange={handleChange}
                        onblur={handleBlur}
                        touched={touched}
                        error={errors}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Government Id proof */}
            <div className="lg:ml-10">
              {/* title */}
              <div>
                <div className="my-4">
                  <HeaderText text={`Government ID Proof`} />
                </div>
              </div>
              <div className="max-w-[400px] rounded-[10px] bg-lblue ">
                <div className="w-full">
                  <TextInput
                    label="Aadhar No"
                    placeholder="Type name here"
                    name="adharNumber"
                    required={true}
                    value={values}
                    handleChange={handleChange}
                    onblur={handleBlur}
                    touched={touched}
                    error={errors}
                  />
                </div>

                <div className=" p-5 pt-0 flex items-center ">
                  <input
                    ref={aadhar}
                    type="file"
                    hidden
                    name={"adharImage"}
                    accept="image/*, .doc, .pdf, .docx"
                    onChange={(e: any) => {
                      setFieldValue(`adharImage`, e.target.files[0]);
                      setFieldTouched(`adharImage`, true, false);
                    }}
                  />

                  <div
                    onClick={() => {
                      aadhar.current.click();
                    }}
                    className="text-primary underline cursor-pointer"
                  >

                    <span>{`Upload Aadhar`}</span>
                    <span style={{ color: "red" }}>{` * `}</span>
                  </div>
                  <span className="text-grey  underline-none">
                    &nbsp;(file format pdf,word,image)
                  </span>
                </div>
                <div className="p-5 pt-0 text-[10px] text-error">
                  {touched?.adharImage && errors?.adharImage
                    ? errors?.adharImage ?? ""
                    : ""}
                </div>
                <div className="p-5 pt-0 text-text">
                  {values.adharImage?.name ?? ""}
                </div>
              </div>
            </div>
          </div>
          {/* save profile */}
          {addFarmerData.response.id && !farmer_id ? (
            ""
          ) : (
            <div className="p-5 mt-5 flex justify-center">
              <div
                onClick={() => {
                  handleSubmit();
                }}
                className="bg-primary cursor-pointer text-white px-5 py-2 rounded-[5px]"
              >
                {addFarmerData.isLoading || editFarmerData.isLoading
                  ? "Loading..."
                  : farmer_id
                    ? "Update Profile"
                    : "Create Profile"}
              </div>
            </div>
          )}

          {/* form details */}
          {!addFarmerData.response.id && !farmer_id ? (
            ""
          ) : (
            <>
              <div>
                <div className="my-4">
                  <HeaderText text={`Family Info`} />
                </div>
                {farmData.response.data?.map((e: any, index: number) => {
                  return (
                    <>
                      <div key={index} className="my-3">
                        <FormDetails
                          formerId={addFarmerData.response.id ?? farmer_id}
                          is_edit={farmer_id ? true : false}
                          data={e}
                          index={index}
                        />
                      </div>
                    </>
                  );
                })}
              </div>
              {/* add form details */}
              {addFormDetail ? (
                <FormDetails
                  formerId={addFarmerData.response.id ?? farmer_id}
                  index={farmData.response.data?.length ?? 0}
                  closeFarm={() => {
                    setFormDetail(false);
                  }}
                />
              ) : (
                ""
              )}
              {/* add new farm details */}
              <div
                onClick={() => {
                  setFormDetail(true);
                }}
                className="max-w-[1200px] mt-5 p-5 items-center bg-lblue rounded-[10px] cursor-pointer flex"
              >
                <svg
                  width="18"
                  height="18"
                  className="mx-2"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 0C7.35774 0.0318782 4.83268 1.09568 2.96418 2.96418C1.09568 4.83268 0.0318782 7.35774 0 10C0.0318782 12.6423 1.09568 15.1673 2.96418 17.0358C4.83268 18.9043 7.35774 19.9681 10 20C12.6423 19.9681 15.1673 18.9043 17.0358 17.0358C18.9043 15.1673 19.9681 12.6423 20 10C19.9681 7.35774 18.9043 4.83268 17.0358 2.96418C15.1673 1.09568 12.6423 0.0318782 10 0ZM15.7143 10.7143H10.7143V15.7143H9.28571V10.7143H4.28571V9.28571H9.28571V4.28571H10.7143V9.28571H15.7143V10.7143Z"
                    fill="#3D7FFA"
                  />
                </svg>
                <div className="text-primary ">Add another farm details</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default AddFarmer;

const FormDetails = ({ data, index, formerId, closeFarm, is_edit }: any) => {
  const dispatch = useDispatch();

  const GetState = useSelector((state: any) => state.ListState);
  const GetDistrict = useSelector((state: any) => state.ListDistrict);
  const GetSVillage = useSelector((state: any) => state.ListVillage);
  const CropList = useSelector((state: any) => state.ListCrop);
  const AddFarm = useSelector((state: any) => state.AddFarm);
  const EditFarm = useSelector((state: any) => state.EditFarm);

  // dropdowns
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
  const cropDropDown = CropList.response?.data?.map((e: any, index: number) => {
    return { id: e.id, name: e.name };
  });

  const ownerDropDown = [
    {
      id: "Own",
      name: "Own",
    },
    {
      id: "Leased",
      name: "Leased",
    },
    {
      id: "Both",
      name: "Both",
    },
  ];

  const farmSchemas = Yup.object().shape({
    state: Yup.string().required("state is required"),
    district: Yup.string().required("district is required"),
    village: Yup.string().required("village  is required"),
    cropTypeId: Yup.number().required("crop type is required"),
    acres: Yup.string().required("acres is required"),
    soilType: Yup.string().required("soilType is required"),
    ownership: Yup.string().required("ownership is required"),
    farmId: Yup.string().required("farmId is required"),
    registrationNumber: Yup.string().required(
      "registration number is required"
    ),
    irrigationType: Yup.string().required("irrigation type is required"),
  });

  // <================ field values ===================>
  const formik = useFormik({
    initialValues: {
      farmerId: formerId ?? "",
      state: data?.state?.id ?? "",
      district: data?.district?.id ?? "",
      village: data?.village?.id ?? "",
      cropTypeId: data?.cropTypeId?.id ?? "",
      acres: data?.acres ?? "",
      soilType: data?.soilType ?? "",
      ownership: data?.ownership ?? "",
      irrigationType: data?.irrigationType ?? "",
      farmId: data?.farmId ?? "",
      registrationNumber: data?.registrationNumber ?? "",
      geoLocation: data?.geoLocation ?? "",
      plotMap: data?.plotMap ?? "",
    },
    validationSchema: farmSchemas,
    onSubmit: (values: any) => {
      if (!is_edit) {
        dispatch(addFarm(values));
      } else {
        values.id = data?.id;
        dispatch(editFarm(values));
      }
    },
  });
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    setFieldTouched,
    setFieldValue,
    resetForm,
    setErrors,
    errors,
    setFieldError,
  }: any = formik;

  return (
    <>
      <div className="">
        <div className="max-w-[1200px] bg-lblue rounded-[10px] p-3">
          <div className="mx-4 text-primary">Farm {index + 1}</div>
          <div className="grid grid-cols-2 w-full lg:grid-cols-3">
            <div className="pt-5">
              <SelectMenu
                name="state"
                labelname="State Name"
                placeHolderText="Select district"
                data={stateDropDown ?? []}
                value={values}
                handleChange={(e: any) => {
                  dispatch(getDistrict("?stateId=" + e.target.value));
                  setFieldValue("state", e.target.value);
                }}
                required={true}
                onblur={handleBlur}
                touched={touched}
                error={errors}
              />
            </div>
            <div className="pt-5">
              <SelectMenu
                name="district"
                labelname="District Name"
                placeHolderText="Select district"
                data={districtDropDown ?? []}
                value={values}
                handleChange={(e: any) => {
                  dispatch(getDistrict("?districtId=" + e.target.value));
                  setFieldValue("district", e.target.value);
                }}
                required={true}
                onblur={handleBlur}
                touched={touched}
                error={errors}
              />
            </div>
            <div className="pt-5">
              <SelectMenu
                name="village"
                labelname="Village"
                placeHolderText="Select village"
                data={villageDropDown ?? []}
                value={values}
                handleChange={handleChange}
                required={true}
                onblur={handleBlur}
                touched={touched}
                error={errors}
              />
            </div>
            <div className="pt-5">
              <SelectMenu
                name="cropTypeId"
                labelname="Crop Type"
                placeHolderText="Select crop type"
                data={cropDropDown ?? []}
                value={values}
                handleChange={handleChange}
                required={true}
                onblur={handleBlur}
                touched={touched}
                error={errors}
              />
            </div>
            <div className="w-[100%]">
              <TextInput
                label="Acreage"
                name="acres"
                placeholder="Type in numbers"
                value={values}
                handleChange={handleChange}
                onblur={handleBlur}
                touched={touched}
                error={errors}
                required={true}
              />
            </div>
            <div className="w-[100%]">
              <TextInput
                label="Soil Type"
                name="soilType"
                placeholder="Type here"
                value={values}
                handleChange={handleChange}
                onblur={handleBlur}
                touched={touched}
                error={errors}
                required={true}
              />
            </div>
            <div className="w-[100%]">
              <TextInput
                label="Irrigation Type"
                name="irrigationType"
                placeholder="Type here"
                value={values}
                handleChange={handleChange}
                onblur={handleBlur}
                required={true}
                touched={touched}
                error={errors}
              />
            </div>
            <div className="pt-5">
              <SelectMenu
                name="ownership"
                labelname="Ownership"
                placeHolderText="Select ownership type"
                data={ownerDropDown ?? []}
                value={values}
                handleChange={handleChange}
                required={true}
                onblur={handleBlur}
                touched={touched}
                error={errors}
              />
            </div>

            <div className="w-[100%]">
              <TextInput
                label="Farm ID"
                name="farmId"
                placeholder="Type farm id"
                value={values}
                handleChange={handleChange}
                onblur={handleBlur}
                required={true}
                touched={touched}
                error={errors}
              />
            </div>
            <div className="w-[100%]">
              <TextInput
                label="Registration Number"
                name="registrationNumber"
                placeholder="Type registration no"
                value={values}
                handleChange={handleChange}
                onblur={handleBlur}
                touched={touched}
                error={errors}
                required={true}
              />
            </div>
            <div className="w-[100%]">
              <TextInput
                label="Geo Location"
                name="geoLocation"
                placeholder="Type geo location"
                value={values}
                handleChange={handleChange}
                onblur={handleBlur}
                touched={touched}
                error={errors}
              />
            </div>
            <div className="w-[100%]">
              <TextInput
                label="Plot Map"
                name="plotMap"
                placeholder="type plot map"
                value={values}
                handleChange={handleChange}
                onblur={handleBlur}
                touched={touched}
                error={errors}
              />
            </div>
          </div>
          {data?.id && !is_edit ? (
            ""
          ) : (
            <div className="w-[100%] flex justify-end p-3 items-centner">
              {is_edit ? (
                ""
              ) : (
                <div
                  onClick={() => {
                    closeFarm();
                    resetForm();
                  }}
                  className="px-8 cursor-pointer py-3 rounded-[5px] bg-grey mx-2 text-white"
                >
                  Delete
                </div>
              )}
              <div
                onClick={() => {
                  handleSubmit();
                }}
                className="px-8 cursor-pointer py-3 rounded-[5px] bg-primary text-white"
              >
                {AddFarm.isLoading || EditFarm.isLoading
                  ? "Loading..."
                  : is_edit
                    ? "Update"
                    : "Save"}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
