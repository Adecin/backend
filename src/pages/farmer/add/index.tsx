"use client";

import PhoneNumber from "@/components/inputComponents/phoneNumber";
import SelectMenu from "@/components/inputComponents/selectMenu";
import TextInput from "@/components/inputComponents/textInput";
import BreadCrumb from "@/components/table/bread-crumb";
import { useSearchParams, useRouter } from "next/navigation";
import { useRef, useState } from "react";

const AddFarmer = () => {
  const searchQuery = useSearchParams();
  const farmer_id = searchQuery?.get("id");

  const [formDetailData, setFormDetailData] = useState(["1"]);
  const openProfile: any = useRef(null);
  const aadhar: any = useRef(null);
  return (
    <>
      <div className="p-5">
        <div className="">
          <BreadCrumb lastName={farmer_id ? "Edit" : ""} />
        </div>
        <div className="px-5">
          {/* add persional details */}
          <div className="">
            {/* title */}
            <div>
              <div className="text-text my-4 text-[16px]">Personal Info</div>
            </div>
            <div className="max-w-[1200px] bg-lblue  rounded-[10px] flex">
              {/* profile */}
              <div className="p-5 relative w-[180px] max-w-[150px] h-[180px]">
                <div className="text-grey text-[16px] my-2">Profile Photo</div>
                <img
                  src="https://media.istockphoto.com/id/1092520698/photo/indian-farmer-at-onion-field.webp?b=1&s=170667a&w=0&k=20&c=pGCpSylCt1jR82BrJxM-9aEwklSsVzK2MvXNfCic1EA="
                  alt="profile"
                  className="rounded-[50%] w-[100px] h-[100px]"
                />
                <input type="file" hidden ref={openProfile} />
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
              </div>
              {/* form */}
              <div className="grid grid-cols-2 w-full lg:grid-cols-3">
                <div className="w-[100%]">
                  <TextInput
                    label="Name"
                    name="name"
                    placeholder="Enter Name"
                    handleChange={() => {}}
                  />
                </div>
                <div>
                  <TextInput
                    label="Farmer ID"
                    placeholder="Enter Farmer id"
                    name="farmer_id"
                    handleChange={() => {}}
                  />
                </div>
                <div>
                  <TextInput
                    label="TBGR ID"
                    placeholder="Enter tbgr id"
                    name="farmer_id"
                    handleChange={() => {}}
                  />
                </div>
                <div>
                  <PhoneNumber
                    label="Phone Number"
                    placeholder="Enter number"
                    name="age"
                    handleChange={() => {}}
                  />
                </div>
                <div>
                  <TextInput
                    label="Age"
                    placeholder="Enter age"
                    name="age"
                    handleChange={() => {}}
                  />
                </div>
                <div className="pt-5">
                  <SelectMenu
                    name="manager"
                    labelname="Gender"
                    handleChange={() => {}}
                    placeHolderText="Select Manager"
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
                <div>
                  <TextInput
                    label="Education"
                    placeholder="Enter Education"
                    name="farmer_id"
                    handleChange={() => {}}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Address */}
          <div className="">
            {/* title */}
            <div>
              <div className="text-text my-4 text-[16px]">Address</div>
            </div>
            <div className="max-w-[1200px] rounded-[10px] bg-lblue flex">
              <div className="grid grid-cols-2 w-full lg:grid-cols-3">
                <div className="w-[100%]">
                  <TextInput
                    label="Pin Code"
                    name="name"
                    placeholder="Type Pin Code"
                    handleChange={() => {}}
                  />
                </div>
                <div>
                  <TextInput
                    label="House No,Street,area"
                    placeholder="Type here"
                    name="farmer_id"
                    handleChange={() => {}}
                  />
                </div>

                <div className="pt-5">
                  <SelectMenu
                    name="Village"
                    labelname="Village"
                    handleChange={() => {}}
                    placeHolderText="Select village"
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
                <div className="pt-5">
                  <SelectMenu
                    name="Village"
                    labelname="District"
                    handleChange={() => {}}
                    placeHolderText="Select district"
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
                <div className="pt-5">
                  <SelectMenu
                    name="Village"
                    labelname="State"
                    handleChange={() => {}}
                    placeHolderText="Select state"
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
            </div>
          </div>
          <div className="lg:flex">
            {/* Family info */}
            <div className="">
              {/* title */}
              <div>
                <div className="text-text my-4 text-[16px]">Family Info</div>
              </div>
              <div className="lg:w-[700px] bg-lblue rounded-[10px] flex">
                <div className=" w-full ">
                  <div className="flex w-full">
                    <div className="pt-5 w-full">
                      <SelectMenu
                        name="Village"
                        labelname="Marital Status"
                        handleChange={() => {}}
                        placeHolderText="Select status"
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
                    <div className="w-full">
                      <TextInput
                        label="Spouse Name"
                        placeholder="Type name here"
                        name="farmer_id"
                        handleChange={() => {}}
                      />
                    </div>
                  </div>
                  <div className="px-3 text-grey">children</div>
                  <div className="flex">
                    <div className="pt-2 w-full">
                      <SelectMenu
                        name="Village"
                        labelname="Male"
                        handleChange={() => {}}
                        placeHolderText="Select village"
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
                    <div className="pt-2 w-full">
                      <SelectMenu
                        name="Village"
                        labelname="Female"
                        handleChange={() => {}}
                        placeHolderText="Select district"
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
                </div>
              </div>
            </div>
            {/* Government Id proof */}
            <div className="lg:ml-10">
              {/* title */}
              <div>
                <div className="text-text my-4 text-[16px]">
                  Government ID Proof
                </div>
              </div>
              <div className="max-w-[400px] rounded-[10px] bg-lblue ">
                <div className="w-full">
                  <TextInput
                    label="Aadhar No"
                    placeholder="Type name here"
                    name="farmer_id"
                    handleChange={() => {}}
                  />
                </div>
                <div className=" p-5 pt-0 flex items-center ">
                  <input ref={aadhar} type="file" hidden />
                  <div
                    onClick={() => {
                      aadhar.current.click();
                    }}
                    className="text-primary underline cursor-pointer"
                  >
                    Upload Aadhar*{" "}
                  </div>
                  <span className="text-grey underline-none">
                    &nbsp;(file format pdf,word,image)*
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* form details */}
          <div>
            <div className="text-text my-4 text-[16px]">Farmer Details</div>
            {formDetailData.map((e, index) => {
              return (
                <>
                  <div key={index} className="my-3">
                    <FormDetails index={index} />
                  </div>
                </>
              );
            })}
          </div>
          {/* add new farm details */}
          <div
            onClick={() => {
              setFormDetailData([...formDetailData, "1"]);
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
        </div>
      </div>
    </>
  );
};
export default AddFarmer;

const FormDetails = ({ index }: any) => {
  return (
    <>
      <div className="">
        <div className="max-w-[1200px] bg-lblue rounded-[10px] p-3">
          <div className="mx-4 text-primary">Form {index + 1}</div>
          <div className="grid grid-cols-2 w-full lg:grid-cols-3">
            <div className="pt-5">
              <SelectMenu
                name="Village"
                labelname="District Name"
                handleChange={() => {}}
                placeHolderText="Select district"
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
            <div className="pt-5">
              <SelectMenu
                name="Village"
                labelname="Village"
                handleChange={() => {}}
                placeHolderText="Select village"
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
            <div className="pt-5">
              <SelectMenu
                name="Village"
                labelname="Crop Type"
                handleChange={() => {}}
                placeHolderText="Select crop type"
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
            <div className="w-[100%]">
              <TextInput
                label="Acreage"
                name="name"
                placeholder="Type in numbers"
                handleChange={() => {}}
              />
            </div>
            <div className="w-[100%]">
              <TextInput
                label="Soil Type"
                name="name"
                placeholder="Type her"
                handleChange={() => {}}
              />
            </div>
            <div className="w-[100%]">
              <TextInput
                label="Irrigation Type"
                name="name"
                placeholder="Type her"
                handleChange={() => {}}
              />
            </div>
            <div className="w-[100%]">
              <TextInput
                label="Ownership"
                name="name"
                placeholder="Type her"
                handleChange={() => {}}
              />
            </div>
            <div className="w-[100%]">
              <TextInput
                label="Field ID"
                name="name"
                placeholder="Type field id"
                handleChange={() => {}}
              />
            </div>
            <div className="w-[100%]">
              <TextInput
                label="Registration Number"
                name="name"
                placeholder="Type registration no"
                handleChange={() => {}}
              />
            </div>
            <div className="w-[100%]">
              <TextInput
                label="Gio Location"
                name="name"
                placeholder="Type gio location"
                handleChange={() => {}}
              />
            </div>
            <div className="w-[100%]">
              <TextInput
                label="Plot Map"
                name="name"
                placeholder="type plot map"
                handleChange={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
