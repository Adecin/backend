"use client";
import Image from "next/image";
import styled from "@emotion/styled";
import SelectMenu from "@/components/inputComponents/selectMenu";
import CustomButton from "@/components/customButton";
import HeaderText from "@/components/textComponents/headerText";
import DatakeyValue from "@/components/textComponents/keyValueText";
import SurveyTable from "@/components/surveyTable";
import { useRouter, useSearchParams } from "next/navigation";
import BreadCrumb from "@/components/table/bread-crumb";
import LabelText from "@/components/labelText";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { oneFieldOfficer } from "@/redux/reducer/fieldOfficer/getOne";
import { useEffect, useState, lazy } from "react";
import { listFarmers } from "@/redux/reducer/farmer/list-former";
import { getDistrict } from "@/redux/reducer/dropdown/get-district";
import { getVillage } from "@/redux/reducer/dropdown/get-village";
import DownloadIcon from "@mui/icons-material/Download";
import TextInput from "@/components/inputComponents/textInput";
import { Chip } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { listTechnicianSurveyDetails } from "@/redux/reducer/survey/technicianSurveyDetails";
import { listTechnicianSurvey } from "@/redux/reducer/survey/getTechSurvey";
import * as Yup from "yup";
import { useFormik } from "formik";

const DynamicTable = lazy(() => import("@/components/table/dynamicTable"));

const assignedVillage = [
  {
    id: "KK001",
    name: "Vallkottai",
  },
  {
    id: "KK002",
    name: "Mathur",
  },
];

const villageData = [
  {
    No: "1",
    assigned_Date: "04/08/2023",
    village_ID: "KK001",
    village: " xxy village",
    tap_number: "KK00186",
    status: <p style={{ color: "#70B10E" }}>{"Completed"}</p>,
  },
  {
    No: "1",
    assigned_Date: "04/08/2023",
    village_ID: "KK001",
    village: " xxy village",
    tap_number: "KK00186",
    status: <p style={{ color: "#70B10E" }}>{"Completed"}</p>,
  },
];

export default function OfficerProfile(props: any) {
  //const { data } = props
  const router = useRouter();
  const params = useSearchParams();
  const fieldOfficer_id: any = params?.get("id");

  const [taskFilter, setTaskFilter] = useState<any>({
    farmer: "",
    districtId: "",
    villageId: "",
  });

  const [paginateData, setData] = useState<any>({
    page: 0,
    limit: 10,
  });

  const handleTaskFilter = (name: any, value: any) => {
    taskFilter[`${name}`] = value;
    setTaskFilter({ ...taskFilter });
  };

  const dispatch = useDispatch();
  const getOneField = useSelector((store: any) => store.OneFieldOfficerData);
  const getOneFieldData = getOneField.response;

  const ListFarmer = useSelector((store: any) => store.ListFormer);

  const GetState = useSelector((state: any) => state.ListState);
  const GetDistrict = useSelector((state: any) => state.ListDistrict);
  const GetSVillage = useSelector((state: any) => state.ListVillage);

  useEffect(() => {
    const query = `?technicianId=${fieldOfficer_id}`;
    dispatch(oneFieldOfficer(fieldOfficer_id));
    dispatch(listFarmers(query));
    dispatch(listTechnicianSurvey(query));
  }, [fieldOfficer_id]);

  const assignTaskQuery = `?limit=${paginateData.limit}&page=${paginateData.page}&technicianId=${fieldOfficer_id}&farmer=${taskFilter.farmer}&districtId=${taskFilter.districtId}&villageId=${taskFilter.villageId}`;

  const setPaginate = (item: any) => {
    setData({
      page: item.page,
      limit: item.rowsPerPage,
    });
  };

  useEffect(() => {
    dispatch(listFarmers(assignTaskQuery));
  }, [assignTaskQuery, paginateData]);

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
  const farmerDropDown = ListFarmer.response?.data?.map(
    (e: any, index: number) => {
      return { id: e.farmer_farmerId, name: e.farmer_name };
    }
  );

  const [filterData, setFilterData] = useState({
    districtFilter: "",
    villageFillter: "",
  });

  useEffect(() => {
    dispatch(getVillage());
    dispatch(getDistrict());
  }, []);

  const FilterDataList = ListFarmer.response.data?.map(
    (e: any, index: number) => {
      const hasPendingRegulation = e.regulation.some(
        (e: any) => e.status === "Pending"
      );

      return {
        No: index + 1,
        Assigned_Date: e?.assign_farmer?.[0]?.createdDate.split("T")[0],
        Farmer_Id: e?.farmer_farmerId,
        Name: e?.farmer_name,
        Location: (
          <p className="w-full">
            {e.farmer_address},<br />
            {e.village_name},<br />
            {e.state_name}
            <br />
            {e.farmer_pincode}
          </p>
        ),
        Status: (
          <p style={{ color: hasPendingRegulation ? "#F75656" : "#70B10E" }}>
            {hasPendingRegulation ? "Pending" : "Completed"}
          </p>
        ),
        Download: <DownloadIcon sx={{ color: "#3D7FFA", fontSize: 35 }} />,
      };
    }
  );

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
            router.push(`/field-officer/edit?id=${fieldOfficer_id}`);
          }}
        />
      </div>
      <PersonalDetailCard data={getOneFieldData} />
      <div className="my-2">
        <HeaderText text={`Education details`} />
        <table className="w-[60%] my-4">
          <tbody className="flex flex-col gap-y-4">
            <div className="flex bg-[#F4F8FF] py-4 px-6 rounded-[8px] gap-x-8">
              <span className="w-[3rem]">1</span>
              <tr className="w-full flex justify-between">
                <td className="text-start py-1 pr-5 ">
                  <div className="  ">
                    <div className="text-base leading-[24px] font-normal tracking-wider">
                      {getOneFieldData.educationName}
                    </div>
                  </div>
                </td>
                <td className="text-start py-1 pr-5 ">
                  <div className="  ">
                    <Link
                      href={`${getOneFieldData.educationCertificate}`}
                      target="_blank"
                      download
                      rel="noopener noreferrer"
                      style={{
                        color: "#3D7FFA",
                        textDecoration: "underline",
                      }}
                    >
                      {"Certificate"}
                    </Link>
                  </div>
                </td>
              </tr>
            </div>
          </tbody>
        </table>
      </div>
      {/* <AddressComponent /> */}
      <div className="flex justify-start gap-x-12">
        <div className="addressDeatails my-2 ">
          <HeaderText text={`Address details`} />
          <div
            style={{ ...addressStyle, width: "480px" }}
            className="px-8 py-4 mt-[1rem] rounded-[10px] text-text max-w-[500px]"
          >
            {`${getOneFieldData.address ? getOneFieldData.address + `, ` : ``}`}
            <br />
            {`${
              getOneFieldData?.villageId?.name
                ? getOneFieldData?.villageId?.name + `, `
                : ``
            }`}
            <br />
            {getOneFieldData?.districtId?.name
              ? getOneFieldData?.districtId?.name + `, `
              : ``}
            <br />
            {getOneFieldData?.stateId?.name
              ? getOneFieldData?.stateId?.name + ` - `
              : ``}
            {getOneFieldData?.pincode ?? ``}
          </div>
        </div>
        <div className="idDocuments my-2">
          <HeaderText text={`Government ID proof`} />
          <div
            style={addressStyle}
            className="px-8 py-8 mt-[1rem] w-[228px] rounded-[10px] flex flex-col gap-y-2"
          >
            <LabelText labelName={`Aadhar No`} />
            <p>
              {getOneFieldData.aadharNo ?? (
                <span className="text-center font-normal ml-6">{`--`}</span>
              )}
            </p>
            <Link
              href={`${getOneFieldData.aadharImage}`}
              target="_blank"
              download
              style={{
                textTransform: "none",
                color: "#3D7FFA",
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "21px",
                letterSpacing: "0.05em",
                textAlign: "left",
                textDecoration: "underline",
              }}
            >{`${getOneFieldData.name}.pdf`}</Link>
          </div>
        </div>
      </div>
      <AssignedTask
        //values={taskFilter}
        data={villageData}
        farmerDrop={farmerDropDown}
        districtDrop={districtDropDown}
        villageDrop={villageDropDown}
        //handleChange={handleTaskFilter}
        //setPaginate={setPaginate}
      />
      <SurveyComponent
        villageDropDown={villageDropDown}
        //Survey={setSurveyId}
        techId={fieldOfficer_id}
      />
      {/* <div className="w-full">
        <HeaderText text={`Assign Village`} />
        <div className="bg-[#F4F8FF] mt-[1rem] p-[2rem]">
          <div className="grid grid-cols-3">
            <SelectMenu
              name="districtIds"
              labelname="Survey name"
              placeHolderText="Select district"
              data={[]}
              value={``}
              handleChange={() => {}}
              onblur={() => {}}
              required={true}
            />
            <SelectMenu
              labelname={"Crop type"}
              name={""}
              data={[]}
              handleChange={undefined}
              value={undefined}
              placeHolderText={"Select"}
              required={true}
            />
            <TextInput
              value={``}
              label={"TAP number"}
              name=""
              placeholder="Enter in numbers"
              onblur={() => {}}
              handleChange={() => {}}
            />

            <SelectMenu
              name="villageFillter"
              labelname="Village"
              placeHolderText="Select village"
              data={villageDropDown ?? []}
              value={filterData}
              handleChange={(e: any) => {
                setFilterData({
                  ...filterData,
                  villageFillter: e.target.value,
                });
              }}
              onblur={() => {}}
              required={true}
            />
          </div>
          <div className="px-[1rem]">
            <LabelText labelName={``} />
            <div className="gap-x-6 pt-3">
              {assignedVillage?.length ? (
                assignedVillage?.map((item: any, index: number) => {
                  return (
                    <>
                      <Chip
                        style={{
                          margin: "5px",
                          background: "#fff",
                          padding: "1.25rem 1rem",
                          borderRadius: "10px",
                          color: "#3D7FFA",
                          border: "1px solid #3D7FFA",
                        }}
                        label={item.name}
                        onDelete={() => {}}
                      />
                    </>
                  );
                })
              ) : (
                <p>No Assigned Data</p>
              )}
              <AddCircleIcon className={`text-primary ml-[3rem]`} />
            </div>
          </div>
        </div>
      </div> */}
      <AssignVillage techId={fieldOfficer_id} />
    </div>
  );
}

const AssignedTask = (props: any) => {
  const {
    data,
    farmerDrop,
    districtDrop,
    villageDrop,
    handleChange,
    values,
    setPaginate,
  } = props;

  const LabelText = styled.p`
    width: 100px;
    ::after {
      content: " : ";
      padding: 0 0.25rem;
    }
  `;

  return (
    <div className="my-2">
      <HeaderText text={`Assigned Village`} />
      {/* <div className="filters flex items-center mt-[1rem]">
        <LabelText className="">{`Filter by`}</LabelText>
        <div className="flex w-[100%] justify-around">
          <div className="w-full">
            <SelectMenu
              fieldStyle={{ background: "#F4F8FF" }}
              //labelname={"Farmer ID"}
              name={"farmer"}
              data={farmerDrop ?? []}
              handleChange={(e: any) => {
                console.log(`e.target.value`, e.target.value);
                handleChange(`farmer`, e.target.value);
              }}
              value={values}
              placeHolderText={"Farmer ID"}
            />
          </div>
          <div className="w-full">
            <SelectMenu
              fieldStyle={{ background: "#F4F8FF" }}
              //labelname={"Survey"}
              name={"districtId"}
              data={districtDrop ?? []}
              handleChange={(e: any) => {
                console.log(`e.target.value`, e.target.value);
                handleChange(`districtId`, e.target.value);
              }}
              value={values}
              placeHolderText={"District"}
            />
          </div>
          <div className="w-full">
            <SelectMenu
              fieldStyle={{ background: "#F4F8FF" }}
              //labelname={"Location"}
              name={"villageId"}
              data={villageDrop ?? []}
              handleChange={(e: any) => {
                console.log(`e.target.value`, e.target.value);
                handleChange(`villageId`, e.target.value);
              }}
              value={values}
              placeHolderText={"Village"}
            />
          </div>
        </div>
      </div> */}
      <div className="assignListtable">
        <DynamicTable
          data={data}
          count={data?.length}
          paginateData={(e: any) => {
            setPaginate(e);
          }}
        />
      </div>
    </div>
  );
};

const addressStyle = {
  height: "130px",
  background: "#F4F8FF",
  padding: "1rem 2rem",
};

const PersonalDetailCard = ({ data }: any) => {
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
            data.profileImage ??
            "https://image.winudf.com/v2/image1/bmV0LndsbHBwci5ib3lzX3Byb2ZpbGVfcGljdHVyZXNfc2NyZWVuXzBfMTY2NzUzNzYxN18wOTk/screen-0.webp?fakeurl=1&type=.webp"
          }
          alt={"profile"}
          className="rounded-[50%] w-[100px] h-[100px]"
        />
        <div className="w-full flex justify-around p-[1rem] mx-[1rem]">
          <div className=" flex flex-col gap-y-6 mr-[3rem]">
            <DatakeyValue label={`Name`} value={data.name} />
            <DatakeyValue
              label={`Phone number`}
              value={`+91 ${data.phoneNo}`}
            />
            <DatakeyValue label={`Personal mail ID`} value={data.emailId} />
            <DatakeyValue
              label={`Company mail ID`}
              value={data.companyEmailId}
            />
          </div>
          <Separater />
          <div className="flex flex-col gap-y-6">
            <DatakeyValue label={`Employee ID`} value={data.employeeId} />
            <DatakeyValue label={`Date of birth`} value={data.dob} />
          </div>
        </div>
      </div>
    </div>
  );
};

const SurveyComponent = (props: any) => {
  const { villageDropDown, setSurvey, techId } = props;
  const [surveyId, setSurveyId] = useState("");
  const dispatch = useDispatch();

  const LabelText = styled.p`
    width: 100px;
    ::after {
      content: " : ";
      padding: 0 0.25rem;
    }
  `;
  const SurveyDetails = useSelector((state: any) => state.TechSurveyDetails);

  console.log(`SurveyDetails`, SurveyDetails);

  const filterData = SurveyDetails.response?.map((e: any, index: number) => {
    return {
      No: index + 1,
      regional_Manager: "",
      farmer_ID: e.farmerId.farmerId,
      village: "",
      survey: e.surveyId.name,
      survey_status: (
        <div
          className={`p-[10px]  rounded-[10px] ${
            e.surveyStatus == "Pending"
              ? "bg-[#FFE8E8]"
              : e.surveyStatus == "Completed"
              ? "bg-[#EFF5E6]"
              : "bg-[#FFF4E4]"
          }`}
        >
          <span
            className={`${
              e.surveyStatus == "Pending"
                ? "text-[#F75656]"
                : e.surveyStatus == "Completed"
                ? "text-[#70B10E]"
                : "text-[#F8B34C]"
            }`}
          >
            {e.surveyStatus}
          </span>
        </div>
      ),
    };
  });

  const surveyQuery = `?technicianId=${techId}&surveyId=${surveyId}`;
  useEffect(() => {
    dispatch(listTechnicianSurveyDetails(surveyQuery));
  }, [surveyQuery]);

  return (
    <div className="my-2">
      <HeaderText text={`Survey details`} />
      <div className="filters flex items-center mt-[1rem]">
        <LabelText className="">{`Filter by`}</LabelText>
        <div className="flex w-[100%] justify-around">
          <div className="w-full">
            <SelectMenu
              fieldStyle={{ background: "#F4F8FF" }}
              //labelname={"Survey"}
              name={"setSurveyId"}
              data={[]}
              handleChange={() => {
                setSurvey(1);
              }}
              value={undefined}
              placeHolderText={"Survey"}
            />
          </div>
          <div className="w-full">
            <SelectMenu
              fieldStyle={{ background: "#F4F8FF" }}
              //labelname={"Farmer ID"}
              name={""}
              data={[]}
              handleChange={undefined}
              value={undefined}
              placeHolderText={"Farmer ID"}
            />
          </div>
          <div className="w-full">
            <SelectMenu
              fieldStyle={{ background: "#F4F8FF" }}
              //labelname={"Location"}
              name={""}
              data={villageDropDown ?? []}
              handleChange={undefined}
              value={undefined}
              placeHolderText={"Village"}
            />
          </div>
        </div>
      </div>
      <div className="Surveytable">
        <DynamicTable data={filterData} count={filterData.length} />
      </div>
    </div>
  );
};

const AssignVillage = (props: any) => {
  const { techId } = props;
  const dispatch = useDispatch();
  const [cropId, setCropId] = useState(0);

  const villageMangList = useSelector(
    (state: any) => state.getAllVillageMangData
  );
  const villageMangListData = villageMangList.response?.data;

  const AssignVillageSchema = Yup.object().shape({
    surveyId: Yup.string().required("Survey is required"),
    cropId: Yup.string().required("Crop Type is required"),
    tapNumber: Yup.string().required("Tap Number is required"),
    villageId: Yup.array().required("Village is required"),
  });

  // formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      surveyId: "",
      cropId: "",
      tapNumber: "",
      villageIds: [],
    },
    validationSchema: AssignVillageSchema,
    onSubmit: (values: any) => {
      console.log(`values`, values);
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

  useEffect(() => {
    const query = `?technicianId=${techId}`;
    dispatch(listTechnicianSurvey(query));
  }, []);

  const TechSurveyList = useSelector(
    (state: any) => state.ListTechSurvey.response
  );

  const surveyDropDown = TechSurveyList?.map((e: any, index: number) => {
    return { id: e.id, name: e.name };
  });

  const cropDropdown = TechSurveyList.filter((item: any) => {
    console.log(item);
    if (item.id === values.surveyId) {
      return item;
    }
  }).map((e: any, index: number) => {
    console.log(e, `e`);
    return { id: e.cropId?.id, name: e.cropId.name };
  });

  return (
    <div>
      <div className="w-full">
        <HeaderText text={`Assign Village`} />
        <div className="bg-[#F4F8FF] mt-[1rem] p-[2rem]">
          <div className="grid grid-cols-3">
            <SelectMenu
              name="surveyId"
              labelname="Survey name"
              placeHolderText="Select Survey"
              data={surveyDropDown ?? []}
              value={values}
              handleChange={(e: any) => {
                setFieldValue(`surveyId`, e.target.value);
              }}
              onblur={handleBlur}
              touched={touched}
              required={true}
              error={errors}
            />
            <SelectMenu
              labelname={"Crop type"}
              name={"cropId"}
              data={cropDropdown ?? []}
              handleChange={handleChange}
              onblur={handleBlur}
              touched={touched}
              value={values}
              placeHolderText={"Select"}
              required={true}
            />
            <TextInput
              value={values}
              label={"TAP number"}
              name="tapNumber"
              placeholder="Enter in numbers"
              onblur={handleBlur}
              handleChange={handleChange}
              touched={touched}
              error={errors}
            />

            <SelectMenu
              name="villageIds"
              labelname="Village"
              placeHolderText="Select village"
              data={villageMangListData ?? []}
              value={values}
              handleChange={(e: any) => {
                setFieldValue(`villageIds`, e.target.value);
              }}
              onblur={handleBlur}
              touched={touched}
              required={true}
              error={errors}
            />
          </div>
          {/* <div className="px-[1rem]">
                  <LabelText labelName={``} />
                  <div className="gap-x-4 pt-3">
                    {assignFarmerListFarmer?.response?.length ? (
                      assignFarmerListFarmer?.response?.map(
                        (item: any, index: number) => {
                          return (
                            <>
                              <Chip
                                style={{
                                  margin: "5px",
                                  background: "#3D7FFA",
                                  padding: "1.5rem",
                                  borderRadius: "10px",
                                  color: "#fff",
                                }}
                                label={item.farmerId.farmerId}
                                onDelete={() => {}}
                              />
                            </>
                          );
                        }
                      )
                    ) : (
                      <p>No Assigned Data</p>
                    )}
                  </div>
                </div> */}
        </div>
      </div>
      {/* <div className="bg-[#F4F8FF] w-full p-[1rem]">
            <CustomButton
              //disable={!profileCreated}
              startIcon={
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 0C7.35774 0.0318782 4.83268 1.09568 2.96418 2.96418C1.09568 4.83268 0.0318782 7.35774 0 10C0.0318782 12.6423 1.09568 15.1673 2.96418 17.0358C4.83268 18.9043 7.35774 19.9681 10 20C12.6423 19.9681 15.1673 18.9043 17.0358 17.0358C18.9043 15.1673 19.9681 12.6423 20 10C19.9681 7.35774 18.9043 4.83268 17.0358 2.96418C15.1673 1.09568 12.6423 0.0318782 10 0ZM15.7143 10.7143H10.7143V15.7143H9.28571V10.7143H4.28571V9.28571H9.28571V4.28571H10.7143V9.28571H15.7143V10.7143Z"
                    fill="#3D7FFA"
                  />
                </svg>
              }
              buttonName={`Assign farmer`}
              customStyle={{
                background: "none",
                color: "#3D7FFA",
              }}
              handleOnClick={() => {
                setFarmerPop(true);
              }}
            />
          </div> */}
    </div>
  );
};
