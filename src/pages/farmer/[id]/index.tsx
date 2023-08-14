"use client";

import SelectMenu from "@/components/inputComponents/selectMenu";
import BreadCrumb from "@/components/table/bread-crumb";
import DynamicTable from "@/components/table/dynamicTable";
import Tabs from "@/components/tabs/tabe";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  RadioGroup,
} from "@mui/material";

const FarmerList = () => {
  // table data
  const tableData = [
    {
      Survey_name: "DTE 202344",
      field_officer: "Vijay",
      Location: (
        <>
          <div>Dakshina</div>
          <div>Kanada</div>
          <div>Karapakkam</div>
          <div>600 61</div>
        </>
      ),

      downloads: (
        <svg
          className="cursor-pointer"
          width="22"
          height="22"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 27H27H1Z" fill="#3D7FFA" />
          <path
            d="M1 27H27"
            stroke="#3D7FFA"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M14 1H17.8519V9.66667H22.6667L14 22.6667M14 1H10.1482V9.66667H5.33337L14 22.6667"
            fill="#3D7FFA"
          />
          <path
            d="M14 1H17.8519V9.66667H22.6667L14 22.6667L5.33337 9.66667H10.1482V1H14Z"
            stroke="#3D7FFA"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
    },
  ];
  const data = tableData.map((e, index) => {
    return { No: index + 1, ...e };
  });
  return (
    <>
      <div className="p-5 mb-[100px]">
        {/* bread crumbs */}
        <div className="flex items-center justify-between">
          <BreadCrumb lastName="View Profile" />
          <div className="bg-primary flex cursor-pointer justify-center px-4 items-center py-1 button-box-shadow rounded-[30px] text-white text-[14px]">
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
          <div className="text-text my-4 text-[16px]">Personal detail</div>
          {/* content */}
          <div className="bg-lblue my-2 p-5 rounded-[10px] flex items-center">
            <div>
              <img
                src="https://media.istockphoto.com/id/1092520698/photo/indian-farmer-at-onion-field.webp?b=1&s=170667a&w=0&k=20&c=pGCpSylCt1jR82BrJxM-9aEwklSsVzK2MvXNfCic1EA="
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
                Vijay Prasath
              </div>
              <div className="my-4">
                <span className="text-text font-[400]">
                  Phone Number &nbsp; - &nbsp;
                </span>
                91 9876873454
              </div>
              <div className="my-4">
                <span className="text-text font-[400]">
                  Gender &nbsp; - &nbsp;
                </span>
                Male
              </div>
              <div className="my-4">
                <span className="text-text font-[400]">
                  Education &nbsp; - &nbsp;
                </span>
                12th Passed Out
              </div>
            </div>
            {/* second line */}
            <div className="pl-5 ">
              <div className="my-4">
                <span className="text-text font-[400]">
                  Farmer ID &nbsp; - &nbsp;
                </span>
                DTE001
              </div>
              <div className="my-4">
                <span className="text-text font-[400]">
                  TBGR ID &nbsp; - &nbsp;
                </span>
                873454
              </div>
              <div className="my-4">
                <span className="text-text font-[400]">
                  Date Of Birth &nbsp; - &nbsp;
                </span>
                24/08/1994
              </div>
              <div className="my-4">
                <span className="text-text font-[400]">
                  Age &nbsp; - &nbsp;
                </span>
                101
              </div>
            </div>
          </div>
        </div>
        {/* address details */}
        <div className="px-4 grid grid-cols-1 xl:flex">
          <div className="max-w-[500px]">
            {/* title */}
            <div className="text-text my-4 text-[16px]">Address Details</div>
            {/* content */}
            <div className="bg-lblue w-auto my-2 p-5 rounded-[10px] flex items-center">
              <div className="px-5 ">
                <div className="my-4 text-text">
                  G8,248/250, Ln Complex, G8,248/250, lncplx, oldtaragupetB53,
                  Lal Build, Old Taragupet, Bangalore - 560053
                </div>
              </div>
            </div>
          </div>
          {/* Government id proof */}
          <div className="w-[400px] xl:ml-[100px]">
            {/* title */}
            <div className="text-text my-4 text-[16px]">
              Government ID Proof
            </div>
            {/* content */}
            <div className="bg-lblue w-auto my-2 p-5 rounded-[10px] flex items-center">
              <div className="px-5 ">
                <div className="my-4 text-[#858585] text-[16px]">Aadhar No</div>
                <div className="my-4 text-text text-[14px]">1235 5287 4589</div>
                <a className="my-4 text-primary underline text-[14px] ">
                  vijay aadhar.pdf
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* family */}
        <div className="">
          {/* title */}
          <div className="text-text my-4 text-[16px]">Family Info Details</div>
          {/* content */}
          <div className="bg-lblue  w-[650px] justify-between my-2 p-5 rounded-[10px] flex ">
            <div className="px-5 ">
              <div className="my-4 text-[#858585] text-[16px]">
                Marital Status
              </div>
              <div className="my-4 text-text text-[14px]">Married</div>
            </div>{" "}
            <div className="px-5 ">
              <div className="my-4 text-[#858585] text-[16px]">
                Spouse Name No
              </div>
              <div className="my-4 text-text text-[14px]">Vijay</div>
            </div>{" "}
            <div className="px-5 ">
              <div className="my-4 text-[#858585] text-[16px]">Children</div>
              <div className="my-4 text-text text-[14px]">Male-2</div>
              <div className="my-4 text-text text-[14px]">Female-2</div>
            </div>
          </div>
        </div>
        {/* farmer details */}
        <div className="text-text my-4 text-[16px]">Farmer Details</div>
        {/* tabs */}
        <Tabs />
        {/* survey details */}
        <div>
          <div className="text-text my-4 text-[16px]">Survey Details</div>
          <div className="flex items-center">
            <div className="text-text w-[70px]">Filter By : </div>
            <div>
              <div className="flex">
                <div className="w-[300px] ">
                  <SelectMenu
                    name="manager"
                    labelname=" Survey"
                    handleChange={() => {}}
                    placeHolderText="Select Manager"
                    background="blue"
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
                <div className="w-[300px] ml-2">
                  <SelectMenu
                    name="manager"
                    labelname=" Field Officer"
                    handleChange={() => {}}
                    placeHolderText="Select Manager"
                    background="blue"
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
              </div>
              <div className="ml-2 flex">
                <div className="flex items-center">
                  <div className="mx-4 text-text">STP &nbsp;:</div>
                  <div className="flex items-center">
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel
                          value="pending"
                          className="text-text "
                          control={<Checkbox />}
                          label="Pending"
                        />
                        <FormControlLabel
                          className="text-text"
                          value="complete"
                          control={<Checkbox />}
                          label="Completed"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="mx-4 text-text">CM &nbsp;:</div>
                  <div className="flex items-center">
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel
                          value="pending"
                          className="text-text "
                          control={<Checkbox />}
                          label="Pending"
                        />
                        <FormControlLabel
                          className="text-text"
                          value="complete"
                          control={<Checkbox />}
                          label="Completed"
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
          <DynamicTable backgroundColor="lblue" data={data} />
        </div>
      </div>
    </>
  );
};

export default FarmerList;
