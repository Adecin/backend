"use client";

import SelectMenu from "@/components/inputComponents/selectMenu";
import BreadCrumb from "@/components/table/bread-crumb";
import DynamicTable from "@/components/table/dynamicTable";
import Tabs from "@/components/tabs/farm-details";
import HeaderText from "@/components/textComponents/headerText";
import { listFarm } from "@/redux/reducer/farmer/list-farm";
import { listOneFarmer } from "@/redux/reducer/farmer/list-one-farmer";
import { listFarmerSurvey } from "@/redux/reducer/survey/getFarmerSurvey";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  RadioGroup,
} from "@mui/material";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listTechnicianSurvey } from "@/redux/reducer/survey/getTechSurvey";
import { listFarmerFilter } from "@/redux/reducer/farmer/farmer-survey-filter";

const FarmerList = () => {
  const dispatch = useDispatch();
  const params = useSearchParams();
  const farmer_id: any = params?.get("id");
  const router = useRouter();
  //  farmer data
  const farmerData = useSelector((state: any) => state.listOneFarmer);
  const farmData = useSelector((state: any) => state.listFarm);
  const FarmerSurveyData = useSelector(
    (state: any) => state.ListFarmerSurvey.response
  );

  const FarmerFilterData = useSelector(
    (state: any) => state.ListFarmerFilterData
  );

  console.log('azr', farmerData);
  console.log('azar1', FarmerFilterData)

  const [surveyFilter, setSurveyFilter] = useState({
    surveyId: 'all',
    technicianId: 'all',
    surveyStatus: ''
  })

  // console.log(`FarmerSurveyData`, FarmerSurveyData);

  // useEffect
  useEffect(() => {
    dispatch(listOneFarmer(farmer_id));
    dispatch(listFarm(farmer_id));
    dispatch(listFarmerSurvey(`?farmerId=${farmer_id}`));
  }, [farmer_id]);

  useEffect(() => {
    let query = `?villageManagementId=${farmerData?.response?.villageManagementId?.id}`;
    dispatch(listFarmerFilter(query));
  }, [farmerData])

  const surveyDropDown = FarmerFilterData?.response?.survey?.map((e: any, index: number) => {
    return { id: e.id, name: e.name };
  });

  const techDropDown = FarmerFilterData?.response?.technician?.map((e: any, index: number) => {
    return { id: e.id, name: e.name };
  });

  console.log(surveyDropDown, techDropDown)

  useEffect(() => {
    let query = `?farmerId=${farmer_id}`;
    if (surveyFilter.surveyId !== 'all') {
      query += `&surveyId=${surveyFilter.surveyId}`
    }
    if (surveyFilter.surveyStatus !== '') {
      query += `&surveyStatus=${surveyFilter.surveyStatus}`
    }
    if (surveyFilter.technicianId !== 'all') {
      query += `&technicianId=${surveyFilter.technicianId}`
    }
    dispatch(listFarmerSurvey(query));
    console.log(query);
  }, [surveyFilter])

  const filterData = FarmerSurveyData.farmerList?.map(
    (e: any, index: number) => {
      // console.log(`fgnfh`, e);
      return {
        No: `${index + 1} .`,
        Field_Officer: (
          <div className="flex flex-col">
            {e?.technician?.map((tech: any, index: any) => {
              return <span key={index}>{tech.name}</span>;
            })}
          </div>
        ),
        farmer_ID: e.fid_farmerId,
        location: e.villageId_name,
        survey: e.surveyId_name,
        survey_status: (
          <div
            className={`p-[10px]  rounded-[10px] ${e.afs_surveyStatus == "Pending"
              ? "bg-[#FFE8E8]"
              : e.afs_surveyStatus == "Completed"
                ? "bg-[#EFF5E6]"
                : "bg-[#FFF4E4]"
              }`}
          >
            <span
              className={`${e.afs_surveyStatus == "Pending"
                ? "text-[#F75656]"
                : e.afs_surveyStatus == "Completed"
                  ? "text-[#70B10E]"
                  : "text-[#F8B34C]"
                }`}
            >
              {e.afs_surveyStatus}
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
            href={``}
          >{`View`}</Link>
        ),
      };
    }
  );

  return (
    <>
      <div className="p-5 mb-[100px]">
        {/* bread crumbs */}
        <div className="flex items-center justify-between">
          <BreadCrumb lastName={farmer_id} />
          <div
            onClick={() => {
              router.push("/farmer/add?id=" + farmer_id);
            }}
            className="bg-primary flex cursor-pointer justify-center px-4 items-center py-1 button-box-shadow rounded-[30px] text-white text-[14px]"
          >
            <svg
              className="mr-2"
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
            Edit Profile
          </div>
        </div>
        {/* personal details */}
        <div className="px-4 max-w-[900px]">
          {/* title */}
          <div className="my-4">
            <HeaderText text={`Personal details`} />
          </div>{" "}
          {/* content */}
          <div className="bg-lblue my-2 p-5 rounded-[10px] flex items-center">
            <div>
              <img
                src={
                  farmerData.response.profileImage ??
                  "https://media.istockphoto.com/id/1092520698/photo/indian-farmer-at-onion-field.webp?b=1&s=170667a&w=0&k=20&c=pGCpSylCt1jR82BrJxM-9aEwklSsVzK2MvXNfCic1EA="
                }
                alt="profile"
                className="rounded-[50%] w-[160px] h-[160px]"
              />
            </div>
            {/* details */}
            <div className="px-5 border-r border-[#DBDBDB]">
              <div className="my-4">
                <span className="text-text font-[400]">
                  Name &nbsp; - &nbsp;
                </span>
                <span className="font-semibold">
                  {farmerData.response.name ?? ""}
                </span>
              </div>
              <div className="my-4">
                <span className="text-text font-[400]">
                  Phone Number &nbsp; - &nbsp;
                </span>
                <span className="font-semibold">
                  {(farmerData.response.countryCode ?? "") +
                    ` ` +
                    (farmerData.response.phoneNo ?? "")}
                </span>
              </div>
              <div className="my-4">
                <span className="text-text font-[400]">
                  Gender &nbsp; - &nbsp;
                </span>
                <span className="font-semibold">
                  {farmerData.response.gender ?? ""}
                </span>
              </div>
              <div className="my-4">
                <span className="text-text font-[400]">
                  Education &nbsp; - &nbsp;
                </span>
                <span className="font-semibold">
                  {farmerData.response.education ?? ""}
                </span>
              </div>
            </div>
            {/* second line */}
            <div className="pl-5 ">
              <div className="my-4">
                <span className="text-text font-[400]">
                  Farmer ID &nbsp; - &nbsp;
                </span>
                <span className="font-semibold">
                  {farmerData.response.farmerId ?? ""}
                </span>
              </div>
              <div className="my-4">
                <span className="text-text font-[400]">
                  TBGR ID &nbsp; - &nbsp;
                </span>
                <span className="font-semibold">
                  {farmerData.response.TBGRId ?? ""}
                </span>
              </div>
              {/* <div className="my-4">
                <span className="text-text font-[400]">
                  Date Of Birth &nbsp; - &nbsp;
                </span>
                24/08/1994
              </div> */}
              <div className="my-4">
                <span className="text-text font-[400]">
                  Age &nbsp; - &nbsp;
                </span>
                <span className="font-semibold">
                  {farmerData.response.age ?? ""}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* address details */}
        <div className="px-4 grid grid-cols-1 xl:flex">
          <div className="max-w-[500px]">
            {/* title */}
            <div className="my-4">
              <HeaderText text={`Address details`} />
            </div>
            {/* content */}
            <div className="bg-lblue  w-auto my-2 p-5 rounded-[10px] flex items-center">
              <div className="px-5 ">
                <div className="my-4 text-text ">
                  {farmerData.response.address ?? ""},
                  <br />
                  {farmerData.response?.villageManagementId?.villageId?.name ??
                    ""}
                  ,<br />
                  {farmerData.response.districtId?.name ?? ""},<br />
                  {farmerData.response.stateId?.name ?? ""}-
                  {farmerData.response.pincode ?? ""}
                </div>
              </div>
            </div>
          </div>
          {/* Government id proof */}
          <div className="w-[400px] xl:ml-[100px]">
            {/* title */}
            <div className="my-4">
              <HeaderText text={`Government ID Proof`} />
            </div>
            {/* content */}
            <div className="bg-lblue w-auto my-2 p-5 rounded-[10px] flex items-center">
              <div className="px-5 ">
                <div className="my-4 text-[#858585] text-[16px]">Aadhar No</div>
                <div className="my-4 text-text text-[14px]">
                  {farmerData.response.adharNumber ?? ""}
                </div>
                <a
                  href={farmerData.response.adharImage ?? "#"}
                  className="my-4 text-primary underline text-[14px] "
                >
                  view adhar card
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* family */}
        <div className="">
          {/* title */}
          <div className="my-4">
            <HeaderText text={`Family Info`} />
          </div>{" "}
          {/* content */}
          <div className="bg-lblue  w-[650px] justify-between my-2 p-5 rounded-[10px] flex ">
            <div className="px-5 ">
              <div className="my-4 text-[#858585] text-[16px]">
                Marital Status
              </div>
              <div className="my-4 text-text text-[14px]">
                {farmerData.response.martialStatus ?? ""}
              </div>
            </div>{" "}
            <div className="px-5 ">
              <div className="my-4 text-[#858585] text-[16px]">Spouse Name</div>
              <div className="my-4 text-text text-[14px]">
                {farmerData.response.spouseName ?? ""}
              </div>
            </div>{" "}
            <div className="px-5 ">
              <div className="my-4 text-[#858585] text-[16px]">Children</div>
              <div className="flex gap-x-8">
                <div className="my-4 text-text text-[14px]">
                  {`Male - ${farmerData.response.childrenMale ?? 0} `}
                </div>
                <div className="my-4 text-text text-[14px]">
                  {`Female - ${farmerData.response.childrenFemale ?? 0} `}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* farmer details */}
        {farmData?.response?.data?.length != 0 && (
          <div>
            <div className="my-4">
              <HeaderText text={`Farm Details`} />
            </div>
            {/* tabs */}
            <Tabs data={farmData} />
          </div>
        )}
        {/* second phase */}
        {/* survey details */}
        <div>
          <div className="text-text my-4 text-[16px]">Survey Details</div>
          <div className="flex items-center">
            <div className="text-text w-[70px] mb-8 pb-3">Filter By : </div>
            <div>
              <div className="flex">
                <div className="w-[300px] ">
                  <SelectMenu
                    name="surveyId"
                    labelname="Survey"
                    handleChange={(e: any) => {
                      setSurveyFilter({
                        ...surveyFilter,
                        surveyId: e.target.value,
                      });
                    }}
                    value={surveyFilter}
                    placeHolderText="Select Survey"
                    background="blue"
                    data={surveyDropDown ?? []}
                  />
                </div>
                <div className="w-[300px] ml-2">
                  <SelectMenu
                    name="technicianId"
                    labelname="Field Officer"
                    handleChange={(e: any) => {
                      setSurveyFilter({
                        ...surveyFilter,
                        technicianId: e.target.value,
                      });
                    }}
                    value={surveyFilter}
                    placeHolderText="Select Field Officer"
                    background="blue"
                    data={techDropDown ?? []}
                  />
                </div>
              </div>
              <div className="ml-2 flex">
                <div className="flex items-center">
                  <div className="mx-4 text-text">Survey Status &nbsp;:</div>
                  <div className="flex items-center">
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel
                          value="Pending"
                          className="text-text "
                          control={<Checkbox />}
                          label="Pending"
                          checked={surveyFilter.surveyStatus === 'Pending' ? true : false}
                          onChange={(e: any) => {
                            if (surveyFilter.surveyStatus === 'Pending') {
                              setSurveyFilter({
                                ...surveyFilter,
                                surveyStatus: '',
                              });
                            } else {
                              setSurveyFilter({
                                ...surveyFilter,
                                surveyStatus: 'Pending',
                              });
                            }
                          }}
                        />
                        <FormControlLabel
                          className="text-text"
                          value="Complete"
                          control={<Checkbox />}
                          label="Completed"
                          checked={surveyFilter.surveyStatus === 'Completed' ? true : false}
                          onChange={(e: any) => {
                            if (surveyFilter.surveyStatus === 'Completed') {
                              setSurveyFilter({
                                ...surveyFilter,
                                surveyStatus: '',
                              });
                            } else {
                              setSurveyFilter({
                                ...surveyFilter,
                                surveyStatus: 'Completed',
                              });
                            }
                          }}
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* table */}
        <div className="max-w-[1100px] my-9">
          <DynamicTable
            backgroundColor="lblue"
            data={filterData}
            count={filterData?.length}
          />
        </div>
      </div>
    </>
  );
};

export default FarmerList;
