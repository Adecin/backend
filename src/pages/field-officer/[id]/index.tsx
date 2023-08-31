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

const DynamicTable = lazy(() => import("@/components/table/dynamicTable"));

const surveyData = [
  {
    survey: "DTE 2023",
    field_officer: "KK001",
    location: "Dakshina Kannada,Karapakam, 600 061",
    farmer_ID: "KK001",
  },
  {
    survey: "DTE 2023",
    field_officer: "KK001",
    location: "Dakshina Kannada,Karapakam, 600 061",
    farmer_ID: "KK001",
  },
  {
    survey: "DTE 2023",
    field_officer: "KK001",
    location: "Dakshina Kannada,Karapakam, 600 061",
    farmer_ID: "KK001",
  },
  {
    survey: "DTE 2023",
    field_officer: "KK001",
    location: "Dakshina Kannada,Karapakam, 600 061",
    farmer_ID: "KK002",
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
        values={taskFilter}
        data={FilterDataList}
        farmerDrop={farmerDropDown}
        districtDrop={districtDropDown}
        villageDrop={villageDropDown}
        handleChange={handleTaskFilter}
        setPaginate={setPaginate}
      />
      <SurveyComponent data={surveyData} />
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
      <HeaderText text={`Assigned Task`} />
      <div className="filters flex items-center mt-[1rem]">
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
      </div>
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
  const { data } = props;

  const LabelText = styled.p`
    width: 100px;
    ::after {
      content: " : ";
      padding: 0 0.25rem;
    }
  `;

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
              name={""}
              data={[]}
              handleChange={undefined}
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
              data={[]}
              handleChange={undefined}
              value={undefined}
              placeHolderText={"Location"}
            />
          </div>
        </div>
      </div>
      <div className="Surveytable">
        <SurveyTable data={data} />
      </div>
    </div>
  );
};
