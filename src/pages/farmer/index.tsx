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
import { useDispatch, useSelector } from "react-redux";
import { listFarmers } from "@/redux/reducer/farmer/list-former";
import { listFieldOfficer } from "@/redux/reducer/fieldOfficer/getList";
import { styled, Tab, Box, Tabs } from "@mui/material";
import { approveFarmer } from "@/redux/reducer/farmer/approve-farmer";
import { updateAssignFarmer } from "@/redux/reducer/fieldOfficer/updateAssignFarmer";
import { getDistrict } from "@/redux/reducer/dropdown/get-district";
import { getVillage } from "@/redux/reducer/dropdown/get-village";

const DynamicTable = lazy(() => import("@/components/table/dynamicTable"));

const ListFieldOfficer = () => {
  const [searchValue, setSearchValue] = useState("");
  const [allSelect, setSelect] = useState(false);
  const [manageOpen, setManageOpen] = useState(false);
  const [checkedData, setCheckData] = useState<any>([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const ListFarmer = useSelector((store: any) => store.ListFormer);
  const ApproveResponse = useSelector((store: any) => store.ApproveFarmerData);

  // console.log("datasss", ListFarmer);

  // const [farmerFilter, setFarmerFilter] = useState({
  //   status: "Pending",
  //   districtId: 0,
  //   villageId: 0,
  //   technicianId: 0,
  // });
  // const query = `?status=${farmerFilter.status}&districtId=${farmerFilter.districtId}&villageId=${farmerFilter.villageId}&technicianId=${farmerFilter.technicianId}`;
  useEffect(() => {
    dispatch(listFarmers(""));
    setCheckData([]);
  }, [ApproveResponse]);

  // useEffect

  useEffect(() => {
    dispatch(listFarmers(""));
  }, []);

  const filterData = ListFarmer.response.data?.map((e: any, index: number) => {
    return {
      checkBox: (
        <Checkbox
          checked={allSelect ? true : checkedData.includes(e.farmer_id)}
          onChange={() => {
            console.log(checkedData);
            if (checkedData.includes(e.farmer_id)) {
              const findIndex = checkedData.indexOf(e.farmer_id);
              const cloneData = [...checkedData];
              cloneData.splice(findIndex, 1);
              setCheckData(cloneData);
            } else {
              setCheckData([...checkedData, e.farmer_id]);
            }
          }}
        />
      ),
      photo: (
        <img
          onClick={() => {
            router.push("/farmer/" + e.farmer_id);
          }}
          className="w-[68px] cursor-pointer h-[56px] rounded-[5px] hover:shadow-lg shadow-cyan-500/50"
          alt="photo"
          src={
            e.farmer_profileImage ??
            "https://media.istockphoto.com/id/1092520698/photo/indian-farmer-at-onion-field.webp?b=1&s=170667a&w=0&k=20&c=pGCpSylCt1jR82BrJxM-9aEwklSsVzK2MvXNfCic1EA="
          }
        />
      ),
      farmer_ID: e.farmer_farmerId,
      Name: e.farmer_name,
      regulation: (
        <div className="flex flex-col gap-y-2">
          {e.regulation?.map((item: any, index: any) => {
            let statusColor =
              item.status === "Pending"
                ? `#F75656`
                : item.status === `Completed`
                ? `#70B10E`
                : `#F8B34C`;
            console.log(`statusColor`, statusColor);
            return (
              <div key={index} className="flex my-[10px] items-center">
                <div
                  style={{
                    background: statusColor,
                  }}
                  className={`w-[15px] mr-3 h-[15px] bg-[${statusColor}]`}
                />
                {item.name}
              </div>
            );
          })}
        </div>
      ),
      approved_status: (
        <div>
          <div
            className={
              e.farmer_status == "Rejected" || e.farmer_status == "Pending"
                ? "text-error"
                : "text-[#70B10E]"
            }
          >
            {e.farmer_status}
          </div>
        </div>
      ),
    };
  });

  return (
    <>
      <div className="p-5">
        {/* dialog */}
        <Dialog
          open={manageOpen}
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
                setManageOpen(false);
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
          <div className="px-7 pb-7  bg-[#F9FAFB]">
            <div className="mb-5 text-[20px] font-semibold">Manage</div>
            <Dialogs
              closePopUp={() => {
                setManageOpen(false);
              }}
              farmersList={checkedData}
            />
          </div>
        </Dialog>

        <div className="px-4">
          {/* bread crumb and filters */}
          <div
            style={{
              zIndex: 3,
            }}
            className="absolute top-0 sticky bg-white flex justify-between"
          >
            <BreadCrumb classes={` font-bold text-[#43424D]`} />
            <Filter
              value={searchValue}
              applyFilter={() => {}}
              onSearch={(e: string) => {
                setSearchValue(e);
              }}
              filter={
                <div>
                  <FieldOfficerFilter />
                </div>
              }
              addUrl={"/farmer/add"}
            />
          </div>
          {/* mange */}
          <div className="flex justify-between ">
            <div
              onClick={() => {
                setManageOpen(true);
              }}
              className="mx-4 text-[18px] underline cursor-pointer text-grey font-semibold"
            >
              Manage
            </div>
            <div className="mx-4 text-[18px] underline text-[#107C41] cursor-pointer flex items-center">
              <div>
                <svg
                  className=" underline border-b-3 border-[#107C41]"
                  width="18"
                  height="16"
                  viewBox="0 0 18 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.3019 7.59999L4.18616 6.39999V15.2671C4.18624 15.3634 4.20615 15.4588 4.24473 15.5477C4.28332 15.6367 4.33984 15.7175 4.41105 15.7856C4.48227 15.8536 4.56679 15.9076 4.65979 15.9444C4.75279 15.9812 4.85245 16.0001 4.95308 16H17.2316C17.3324 16.0002 17.4322 15.9815 17.5253 15.9447C17.6185 15.908 17.7031 15.8541 17.7745 15.786C17.8458 15.7179 17.9025 15.6371 17.9411 15.548C17.9798 15.459 17.9998 15.3635 17.9998 15.2671V12L11.3019 7.59999Z"
                    fill="#185C37"
                  />
                  <path
                    d="M11.3019 2.58371e-07H4.95308C4.85245 -8.0589e-05 4.75279 0.0188129 4.65979 0.055602C4.56679 0.0923911 4.48227 0.146355 4.41105 0.214414C4.33984 0.282472 4.28332 0.363291 4.24473 0.452257C4.20615 0.541223 4.18624 0.636594 4.18616 0.732923V4L11.3019 8L15.0697 9.2L17.9998 8V4L11.3019 2.58371e-07Z"
                    fill="#21A366"
                  />
                  <path d="M4.18616 4H11.3019V8H4.18616V4Z" fill="#107C41" />
                  <path
                    opacity="0.1"
                    d="M9.27886 3.20001H4.18616V13.2H9.27886C9.48179 13.199 9.67615 13.1216 9.81982 12.9844C9.9635 12.8472 10.0449 12.6613 10.0464 12.4671V3.93294C10.0449 3.73868 9.9635 3.55283 9.81982 3.41564C9.67615 3.27845 9.48179 3.20098 9.27886 3.20001Z"
                    fill="black"
                  />
                  <path
                    opacity="0.2"
                    d="M8.86036 3.60001H4.18616V13.6H8.86036C9.06329 13.599 9.25765 13.5216 9.40132 13.3844C9.545 13.2472 9.62641 13.0613 9.62793 12.8671V4.33293C9.62641 4.13868 9.545 3.95282 9.40132 3.81563C9.25765 3.67844 9.06329 3.60097 8.86036 3.60001Z"
                    fill="black"
                  />
                  <path
                    opacity="0.2"
                    d="M8.86036 3.60001H4.18616V12.8H8.86036C9.06329 12.799 9.25765 12.7216 9.40132 12.5844C9.545 12.4472 9.62641 12.2613 9.62793 12.0671V4.33293C9.62641 4.13868 9.545 3.95282 9.40132 3.81563C9.25765 3.67844 9.06329 3.60097 8.86036 3.60001Z"
                    fill="black"
                  />
                  <path
                    opacity="0.2"
                    d="M8.44186 3.60001H4.18616V12.8H8.44186C8.64479 12.799 8.83915 12.7216 8.98282 12.5844C9.1265 12.4472 9.20791 12.2613 9.20943 12.0671V4.33293C9.20791 4.13868 9.1265 3.95282 8.98282 3.81563C8.83915 3.67844 8.64479 3.60097 8.44186 3.60001Z"
                    fill="black"
                  />
                  <path
                    d="M0.76757 3.60001H8.44198C8.64528 3.59984 8.84032 3.67695 8.98425 3.81438C9.12817 3.95181 9.20921 4.13833 9.20955 4.33293V11.6671C9.20921 11.8617 9.12817 12.0482 8.98425 12.1856C8.84032 12.3231 8.64528 12.4002 8.44198 12.4H0.76757C0.666886 12.4002 0.567156 12.3813 0.474079 12.3446C0.381003 12.3078 0.296405 12.2539 0.225121 12.1858C0.153837 12.1177 0.0972648 12.0369 0.0586373 11.9479C0.0200097 11.8589 8.43247e-05 11.7635 0 11.6671V4.33293C8.43247e-05 4.23655 0.0200097 4.14113 0.0586373 4.05212C0.0972648 3.96312 0.153837 3.88227 0.225121 3.8142C0.296405 3.74614 0.381003 3.69218 0.474079 3.65543C0.567156 3.61868 0.666886 3.59985 0.76757 3.60001Z"
                    fill="url(#paint0_linear_291_2234)"
                  />
                  <path
                    d="M2.37866 10.3834L3.99287 7.99322L2.5143 5.61661H3.70166L4.50844 7.13845C4.58301 7.28245 4.63702 7.38953 4.66144 7.46092H4.67237C4.72509 7.34522 4.78101 7.23384 4.83951 7.12492L5.70223 5.61907H6.79508L5.27859 7.98215L6.83365 10.3852H5.67073L4.73859 8.71692C4.69531 8.64519 4.65853 8.57004 4.62866 8.4923H4.61323C4.58605 8.56804 4.54981 8.64053 4.50523 8.7083L3.54545 10.3834H2.37866Z"
                    fill="white"
                  />
                  <path
                    d="M17.2323 1.03305e-06H11.302V4H17.9999V0.732924C17.9998 0.636543 17.9799 0.541122 17.9413 0.452116C17.9027 0.363109 17.8461 0.282263 17.7748 0.214196C17.7035 0.14613 17.6189 0.0921788 17.5258 0.0554259C17.4328 0.0186731 17.333 -0.000160715 17.2323 1.03305e-06Z"
                    fill="#33C481"
                  />
                  <path d="M11.302 8H17.9999V12H11.302V8Z" fill="#107C41" />
                  <defs>
                    <linearGradient
                      id="paint0_linear_291_2234"
                      x1="1.60328"
                      y1="3.02401"
                      x2="7.22168"
                      y2="13.1886"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#18884F" />
                      <stop offset="0.5" stop-color="#117E43" />
                      <stop offset="1" stop-color="#0B6631" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              import farmer details
            </div>
          </div>
          <DynamicTable
            onClick={(e: boolean) => {
              setSelect(e);
            }}
            data={filterData ?? []}
          />
        </div>
      </div>
    </>
  );
};
export default ListFieldOfficer;

const StyledTab = styled((props: any) => <Tab {...props} />)(({ theme }) => ({
  fontWeight: 500,
  fontSize: "16px",
  lineHeight: "21px",
  margin: "0 1rem",
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

const Dialogs = ({ closePopUp, farmersList }: any) => {
  const [is_approve, setApprove] = useState("true");
  const [reason, setReason] = useState("");

  const [selectedTechnicain, setSelectedTechnicain] = useState({
    tech: "",
  });

  const [value, setValue] = React.useState(0);
  const ListFieldOfficer = useSelector(
    (store: any) => store.ListFieldOfficerData
  );
  const dispatch = useDispatch();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  console.log(farmersList);

  console.log(ListFieldOfficer);

  useEffect(() => {
    dispatch(listFieldOfficer(""));
  }, []);

  const handleApprove = () => {
    closePopUp();
    console.log(is_approve);
    const data =
      is_approve == "true"
        ? {
            is_approve: is_approve,
            id: farmersList,
          }
        : {
            id: farmersList,
            reason: reason,
          };
    console.log(data);
    dispatch(approveFarmer(data));
  };

  return (
    <>
      <Tabs
        className=""
        sx={{
          ".css-heg063-MuiTabs-flexContainer": {
            borderBottom: "2px solid #D9D9D9",
            padding: "0 1rem",
          },
        }}
        value={value}
        onChange={handleChange}
        aria-label=""
      >
        <StyledTab label={`Approval`} className="" />
        <StyledTab label={`Assign field officer`} className="" />
        <StyledTab label={`Assign survey`} className="" />
      </Tabs>
      <CustomTabPanel index={0} value={value}>
        <div className="w-[400px] px-3 mb-5 flex items-center">
          <FormControl>
            <RadioGroup
              value={is_approve}
              onChange={(e: any) => {
                setApprove(e.target.value);
              }}
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value={"true"}
                className="text-primary"
                control={
                  <Radio
                    sx={{
                      color: "var(--primary) !important",
                    }}
                  />
                }
                label="Approve"
              />
              <FormControlLabel
                className="text-error"
                value={"false"}
                control={
                  <Radio
                    sx={{
                      color: "var(--error) !important",
                    }}
                  />
                }
                label="Reject"
              />
            </RadioGroup>
          </FormControl>
        </div>
        {is_approve === "true" ? (
          <> </>
        ) : (
          <>
            <div>
              <TextArea
                label={"Reason"}
                name="reason"
                value={reason}
                placeholder="Enter Reason"
                handleChange={(e: any) => {
                  setReason(e.target.value);
                }}
              />
            </div>
          </>
        )}
        <div className="flex justify-center mr-5">
          <div
            onClick={() => {
              closePopUp();
            }}
            className="bg-[#BEBEBE] cursor-pointer px-8 mx-2 rounded-[5px] text-white py-2 font-medium"
          >
            Cancel
          </div>
          <div
            onClick={handleApprove}
            className="bg-primary cursor-pointer px-8 mx-2 rounded-[5px] text-white py-2 font-medium"
          >
            Save
          </div>
        </div>
      </CustomTabPanel>
      <CustomTabPanel index={1} value={value}>
        <div className="w-[400px] ">
          <p
            className="text-grey ml-5 my-4"
            style={{
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "24px",
              letterSpacing: "0.05em",
            }}
          >
            Select
          </p>
        </div>
        <div className="w-[400px] ">
          <SelectMenu
            name="tech"
            handleChange={(e: any) => {
              setSelectedTechnicain({
                ...selectedTechnicain,
                tech: e.target.value,
              });
            }}
            value={selectedTechnicain}
            placeHolderText="Name of Field Officer"
            data={ListFieldOfficer?.response?.data}
          />
        </div>
        <div className="flex justify-center mr-5">
          <div
            onClick={() => {
              closePopUp();
            }}
            className="bg-[#BEBEBE] cursor-pointer px-8 mx-2 rounded-[5px] text-white py-2 font-medium"
          >
            Cancel
          </div>
          <div
            onClick={() => {
              const data = {
                technicianId: selectedTechnicain.tech,
                farmerId: farmersList,
              };
              dispatch(updateAssignFarmer(data));
              closePopUp();
            }}
            className="bg-primary cursor-pointer px-8 mx-2 rounded-[5px] text-white py-2 font-medium"
          >
            Save
          </div>
        </div>
      </CustomTabPanel>
      <CustomTabPanel index={2} value={value}>
        <p
          className="text-grey ml-5 my-4"
          style={{
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: "24px",
            letterSpacing: "0.05em",
          }}
        >
          Select
        </p>
        <div className="w-[400px] ">
          <SelectMenu
            name="manager"
            handleChange={() => {}}
            placeHolderText="Select survey name"
            data={[
              {
                name: "vijay",
                id: "09",
              },
              {
                name: "vijay",
                id: "09",
              },
            ]}
          />
        </div>
        <div className="flex justify-center mr-5">
          <div
            onClick={() => {
              closePopUp();
            }}
            className="bg-[#BEBEBE] cursor-pointer px-8 mx-2 rounded-[5px] text-white py-2 font-medium"
          >
            Cancel
          </div>
          <div
            onClick={() => {
              closePopUp();
            }}
            className="bg-primary cursor-pointer px-8 mx-2 rounded-[5px] text-white py-2 font-medium"
          >
            Save
          </div>
        </div>
      </CustomTabPanel>
    </>
  );
};

// filter values

const FieldOfficerFilter = () => {
  const [filterState, setFilterState] = useState({
    status: "",
    // "regulation":{
    //      "status":"Pending"
    //  },
    technicianId: 1,
    districtId: 1,
    villageId: 1,
  });

  const GetDistrict = useSelector((state: any) => state.ListDistrict);
  const GetSVillage = useSelector((state: any) => state.ListVillage);
  const ListFieldOfficer = useSelector(
    (store: any) => store.ListFieldOfficerData
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listFieldOfficer(""));
    dispatch(getVillage());
    dispatch(getDistrict());
  }, []);

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
  const technicianDropDown = ListFieldOfficer.response?.data?.map(
    (e: any, index: number) => {
      return { id: e.id, name: e.name };
    }
  );

  return (
    <>
      <div className="grid grid-cols-2 mb-6 mt-6">
        <div className="w-[350px] px-3">
          <SelectMenu
            name="survey"
            handleChange={() => {}}
            placeHolderText="Survey"
            data={[
              {
                name: "vijay",
                id: "09",
              },
              {
                name: "vijay",
                id: "09",
              },
            ]}
          />
        </div>
        <div className="w-[350px] px-3">
          <SelectMenu
            name="manager"
            placeHolderText="Select district"
            data={districtDropDown ?? []}
            value={``}
            handleChange={(e: any) => {
              console.log(`e.target.value`, e.target.value);
            }}
          />
        </div>
        <div className="w-[350px] px-3 mt-4">
          <SelectMenu
            name="village"
            placeHolderText="Select Village"
            data={villageDropDown ?? []}
            value={``}
            handleChange={(e: any) => {
              console.log(`e.target.value`, e.target.value);
            }}
          />
        </div>
        <div className="w-[350px] px-3 mt-4">
          <SelectMenu
            name="officer"
            placeHolderText="Select Field Officer"
            value={``}
            handleChange={(e: any) => {
              console.log(`e.target.value`, e.target.value);
            }}
            data={technicianDropDown ?? []}
          />
        </div>
        <div className="w-[350px] px-7 mt-8">
          <FormControl>
            <label className="font-semibold">STP Status</label>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="pending"
                control={<Radio />}
                label="Pending"
              />
              <FormControlLabel
                value="complete"
                control={<Radio />}
                label="Completed"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="w-[350px] px-8 mt-8">
          <FormControl>
            <label className="font-semibold">CM Status</label>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="pending"
                control={<Radio />}
                label="Pending"
              />
              <FormControlLabel
                value="complete"
                control={<Radio />}
                label="Completed"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="w-[350px] px-7 mt-5">
          <div className="">
            <label className="font-semibold"> Approved Status</label>
            <Checkbox />
          </div>
        </div>
      </div>
    </>
  );
};
