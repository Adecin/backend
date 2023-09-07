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
import TextInput from "@/components/inputComponents/textInput";
import { Chip } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { listTechnicianSurveyDetails } from "@/redux/reducer/survey/technicianSurveyDetails";
import { listTechnicianSurvey } from "@/redux/reducer/survey/getTechSurvey";
import * as Yup from "yup";
import { useFormik } from "formik";
import { getCrop } from "@/redux/reducer/crop/get-all-crop";
import { getCropById } from "@/redux/reducer/crop/getCropById";
import { getAllVillageMang } from "@/redux/reducer/villageMang/getAllVillageMang";
import MultiSelectMenu from "@/components/inputComponents/multiSelect";
import { assignTechVillage } from "@/redux/reducer/fieldOfficer/assignVillage";
import { listAssignedVillages } from "@/redux/reducer/fieldOfficer/listAssignedVillages";
import { Dialog } from "@mui/material";


const DynamicTable = lazy(() => import("@/components/table/dynamicTable"));

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
  const villageMangList = useSelector(
    (state: any) => state.getAllVillageMangData
  );
  const SurveyDetails = useSelector((state: any) => state.TechSurveyDetails);
  const AssignVillageResponse = useSelector(
    (state: any) => state.AssignTechVillage
  );

  useEffect(() => {
    const query = `?technicianId=${fieldOfficer_id}`;
    dispatch(oneFieldOfficer(fieldOfficer_id));
    dispatch(listFarmers(query));
    dispatch(listTechnicianSurvey(query));
    dispatch(listAssignedVillages(query));
  }, [fieldOfficer_id, AssignVillageResponse]);

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
  const villageDropDown = villageMangList.response?.data?.data?.map(
    (e: any, index: number) => {
      return { id: e.id, name: e.villageId.name };
    }
  );

  const farmerDropDown = ListFarmer.response?.data?.map(
    (e: any, index: number) => {
      return { id: e.farmer_farmerId, name: e.farmer_name };
    }
  );

  const surveyDropdown = SurveyDetails.response?.data?.map(
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
    dispatch(getAllVillageMang());
  }, []);

  console.log(``);

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
            {`${getOneFieldData?.village?.name
              ? getOneFieldData?.village?.name + `, `
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
            className="px-8 py-8 mt-[1rem] rounded-[10px] flex flex-col gap-y-2"
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
      <AssignedVillageTable
        //values={taskFilter}
        farmerDrop={farmerDropDown}
        districtDrop={districtDropDown}
        villageDrop={villageDropDown}
      //handleChange={handleTaskFilter}
      //setPaginate={setPaginate}
      />
      <SurveyComponent
        villageDropDown={villageDropDown}
        //survey={setSurveyId}
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

const AssignedVillageTable = (props: any) => {
  const {
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

  const AssignedVillages = useSelector(
    (state: any) => state.ListAssignedVillage
  );

  console.log(`AssignedVillages`, AssignedVillages);

  const FilterDataList = AssignedVillages.response.data?.map(
    (e: any, index: number) => {
      console.log(e, `e list item`);
      return {
        No: index + 1,
        Assigned_Date: e?.activeDate.split("T")[0] ?? "",
        Village_Id: e?.id ?? "",
        Village: e?.name ?? "",
        Tap_Number: e?.tapNumber ?? "",
      };
    }
  );

  console.log(`FilterDataList`, FilterDataList);

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
          data={FilterDataList}
          count={FilterDataList?.length}
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
  const [surveyFilter, setSurveyFilter] = useState({
    surveyId: '',
    farmerId: '',
    villageId: ''
  })

  const TechSurveyList = useSelector(
    (state: any) => state.ListTechSurvey.response
  );

  const surveyDropDown = TechSurveyList?.map((e: any, index: number) => {
    return { id: e.id, name: e.name };
  });

  const LabelText = styled.p`
    width: 100px;
    ::after {
      content: " : ";
      padding: 0 0.25rem;
    }
  `;

  useEffect(() => {
    const query = `?technicianId=${techId}&surveyId=${surveyFilter.surveyId}&farmerId=${surveyFilter.farmerId}&villageId=${surveyFilter.villageId}`;
    dispatch(listTechnicianSurveyDetails(query));
    console.log(query);
  }, [surveyFilter])

  const SurveyDetails = useSelector((state: any) => state.TechSurveyDetails);
  console.log(`fgnfh`, SurveyDetails.response.farmerList);

  const filterData = SurveyDetails.response.farmerList?.map(
    (e: any, index: number) => {
      console.log(`fgnfh`, e);
      return {
        No: `${index + 1} .`,
        regional_Manager: "",
        farmer_ID: e.farmerId?.farmerId,
        village: e.farmerId.villageManagementId?.villageId?.name ?? "",
        survey: e.surveyId?.name,
        survey_status: (
          <div
            className={`p-[10px]  rounded-[10px] ${e.surveyStatus == "Pending"
              ? "bg-[#FFE8E8]"
              : e.surveyStatus == "Completed"
                ? "bg-[#EFF5E6]"
                : "bg-[#FFF4E4]"
              }`}
          >
            <span
              className={`${e.surveyStatus == "Pending"
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
        "": (
          <Link
            style={{
              color: "#3D7FFA",
              textDecoration: "underline",
              fontSize: "16px",
              paddingRight: "2rem",
            }}
            href={
              `/survey-details/` +
              e.farmerId.id +
              `?techId=${techId}&surveyId=${e.surveyId?.id}`
            }
          >{`View`}</Link>
        ),
      };
    }
  );

  const surveyQuery = `?technicianId=${techId}&surveyId=${surveyId}`;
  useEffect(() => {
    dispatch(listTechnicianSurveyDetails(surveyQuery));
  }, []);

  console.log(`SurveyDetails`, SurveyDetails);

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
              name={"surveyId"}
              data={surveyDropDown ?? []}
              handleChange={(e: any) => {
                setSurveyFilter({
                  ...surveyFilter,
                  surveyId: e.target.value
                });
              }}
              value={surveyFilter}
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
              name={"villageId"}
              data={villageDropDown ?? []}
              handleChange={(e: any) => {
                setSurveyFilter({
                  ...surveyFilter,
                  villageId: e.target.value
                });
              }}
              value={surveyFilter}
              placeHolderText={"Village"}
            />
          </div>
        </div>
      </div>
      <div className="Surveytable">
        <DynamicTable data={filterData} count={filterData?.length} />
      </div>
    </div>
  );
};

const AssignVillage = (props: any) => {
  const { techId } = props;
  const dispatch = useDispatch();
  const [cropId, setCropId] = useState<number | string>("");
  const [noEdit, setNoEdit] = useState<boolean>(false);
  const [assignOpen, setAssignOpen] = useState(false);

  const router = useRouter();

  const AssignVillageSchema = Yup.object().shape({
    surveyId: Yup.string().required("Survey is required"),
    cropId: Yup.string().required("Crop Type is required"),
    tapNumber: Yup.string().required("Tap Number is required"),
    villageIds: Yup.array().required("Village is required"),
  });

  // formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      surveyId: "",
      cropId: "",
      tapNumber: "",
      technicianId: props.techId,
      villageIds: [],
    },
    validationSchema: AssignVillageSchema,
    onSubmit: (values: any) => {
      console.log(`values in`, values);
      dispatch(assignTechVillage(values));
      resetForm();
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
    dispatch(getCropById(cropId));
    dispatch(getAllVillageMang(`?tapNumber=${values.tapNumber}`));
  }, [cropId, values.tapNumber]);

  const TechSurveyList = useSelector(
    (state: any) => state.ListTechSurvey.response
  );
  const CropData = useSelector((state: any) => state.ListCropById);

  const AssignVillageResponse = useSelector(
    (state: any) => state.AssignTechVillage
  );

  const villageMangList = useSelector(
    (state: any) => state.getAllVillageMangData
  );

  const surveyDropDown = TechSurveyList?.map((e: any, index: number) => {
    return { id: e.id, name: e.name };
  });

  const cropDropdown = TechSurveyList.filter((item: any) => {
    if (item.id === values.surveyId) {
      return item;
    }
  }).map((e: any, index: number) => {
    return { id: e.cropId?.id, name: e.cropId?.name };
  });

  const villageDropDown = villageMangList.response?.data?.data?.map(
    (e: any, index: number) => {
      return { id: e.id, name: e.villageId.name };
    }
  );

  const tapDropDown =
    CropData.response?.data?.tapCode?.map((e: any, index: number) => {
      return { id: e, name: e };
    }) ?? [];

  useEffect(() => {
    if (AssignVillageResponse.isSuccess) {
      setNoEdit(true);
    }
  }, [AssignVillageResponse]);

  return (
    <div>
      <div className="w-full">
        <HeaderText text={`Assign Village`} />
        <div className="bg-[#F4F8FF] mt-[1rem] p-[2rem]"
          onClick={() =>
            surveyDropDown.length != 0 ? '' : setAssignOpen(true)
          }
        >
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
              //readOnly={noEdit}
              error={errors}
            />
            <SelectMenu
              labelname={"Crop type"}
              name={"cropId"}
              data={cropDropdown ?? []}
              handleChange={(e: any) => {
                setFieldValue(`cropId`, e.target.value);
                setCropId(e.target.value);
              }}
              onblur={handleBlur}
              touched={touched}
              value={values}
              placeHolderText={"Select"}
              required={true}
            //readOnly={noEdit}
            />
            <SelectMenu
              labelname={"Tap Number"}
              name={"tapNumber"}
              data={tapDropDown ?? []}
              handleChange={(e: any) => {
                setFieldValue(`tapNumber`, e.target.value);
              }}
              onblur={handleBlur}
              touched={touched}
              value={values}
              placeHolderText={"Select"}
              required={true}
            //readOnly={noEdit}
            />
            {/* <TextInput
              value={values}
              label={"TAP number"}
              name="tapNumber"
              placeholder="Enter in numbers"
              onblur={handleBlur}
              handleChange={handleChange}
              touched={touched}
              error={errors}
            /> */}
            <MultiSelectMenu
              name="villageIds"
              labelname="Village"
              placeHolderText="Select village"
              fieldStyle={{
                fontSize: "16px",
                color: "#000",
              }}
              data={villageDropDown ?? []}
              value={values.villageIds}
              handleChange={(e: any) => {
                setFieldValue(`villageIds`, e.target.value);
              }}
              onblur={handleBlur}
              touched={touched}
              required={true}
              //readOnly={noEdit}
              error={errors}
            />
          </div>
          {
            //!noEdit && (
            <div className="bg-[#F4F8FF] w-full p-[1rem]">
              <CustomButton
                buttonName={`Save`}
                customStyle={{
                  padding: "0.75rem 2rem",
                  // background: "#3D7FFA",
                  // color: "#fff",
                }}
                handleOnClick={() => {
                  handleSubmit();
                }}
              />
            </div>
          }
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
      <Dialog
        open={assignOpen}
        sx={{
          outline: "none",
          padding: "20px",
          "& .MuiDialog-root ": {
            borderRadius: "10px",
          },
          "& .MuiPaper-root ": {
            background: "#F9FAFB",
          },
          "& .MuiDialog-container": { outline: "none" },
        }}
      >
        <div className="ml-auto bg-[#F9FAFB] mt-3 mr-2">
          <svg
            onClick={() => {
              setAssignOpen(false);
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
        <div className="px-7 pb-7 h-[100px] bg-[#F9FAFB]">
          <div style={{ fontSize: "18px" }}>
            {" "}
            Assign a survey using the manage option before assigning a village
          </div>
          <div
            className="text-center text-[#3D7FFA] underline cursor-pointer"
            onClick={() => router.push('/field-officer')}
          >
            Go Back
          </div>
        </div>
      </Dialog>
    </div>
  );
};
