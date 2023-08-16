"use client";

import React, { lazy, Suspense, useState } from "react";
import Head from "next/head";
import { Metadata } from "next";
import BreadCrumb from "@/components/table/bread-crumb";
import Filter from "@/components/table/filter";
import SelectMenu from "@/components/inputComponents/selectMenu";
import { useRouter } from "next/navigation";
//import { BiBell } from "react-icons/bi";

const DynamicTable = lazy(() => import("@/components/table/dynamicTable"));

const ListFieldOfficer = () => {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  // table data
  const data = [
    {
      photo: (
        <img
          onClick={() => {
            router.push(`/field-officer/profile`);
          }}
          className="w-[68px] h-[56px] rounded-[5px] cursor-pointer "
          alt="photo"
          src="https://moodoffdp.com/wp-content/uploads/2023/04/Instagram-Girl-DP.jpg"
        />
      ),
      employee_id: "EMP001",
      Name: "John Doe",
      phone_number: "9234439878",
      task_status: "8/157",
    },
    {
      photo: (
        <img
          onClick={() => {
            router.push(`/field-officer/profile`);
          }}
          className="w-[68px] h-[56px] rounded-[5px] cursor-pointer "
          alt="photo"
          src="https://moodoffdp.com/wp-content/uploads/2023/04/Instagram-Girl-DP.jpg"
        />
      ),
      employee_id: "EMP001",
      Name: "Jane Smith",
      phone_number: "9234439878",
      task_status: "8/157",
    },
    {
      photo: (
        <img
          onClick={() => {
            router.push(`/field-officer/profile`);
          }}
          className="w-[68px] h-[56px] rounded-[5px] cursor-pointer "
          alt="photo"
          src="https://moodoffdp.com/wp-content/uploads/2023/04/Instagram-Girl-DP.jpg"
        />
      ),
      employee_id: "EMP001",
      Name: "John Doe",
      phone_number: "9234439878",
      task_status: "8/157",
    },
    {
      photo: (
        <img
          onClick={() => {
            router.push(`/field-officer/profile`);
          }}
          className="w-[68px] h-[56px] rounded-[5px] cursor-pointer "
          alt="photo"
          src="https://moodoffdp.com/wp-content/uploads/2023/04/Instagram-Girl-DP.jpg"
        />
      ),
      employee_id: "EMP001",
      Name: "John Doe",
      phone_number: "9234439878",
      task_status: "8/157",
    },
    {
      photo: (
        <img
          onClick={() => {
            router.push(`/field-officer/profile`);
          }}
          className="w-[68px] h-[56px] rounded-[5px] cursor-pointer "
          alt="photo"
          src="https://moodoffdp.com/wp-content/uploads/2023/04/Instagram-Girl-DP.jpg"
        />
      ),
      employee_id: "EMP001",
      Name: "John Doe",
      phone_number: "9234439878",
      task_status: "8/157",
    },
    {
      photo: (
        <img
          onClick={() => {
            router.push(`/field-officer/profile`);
          }}
          className="w-[68px] h-[56px] rounded-[5px] cursor-pointer "
          alt="photo"
          src="https://moodoffdp.com/wp-content/uploads/2023/04/Instagram-Girl-DP.jpg"
        />
      ),
      employee_id: "EMP001",
      Name: "John Doe",
      phone_number: "9234439878",
      task_status: "8/157",
    },
    {
      photo: (
        <img
          onClick={() => {
            router.push(`/field-officer/profile`);
          }}
          className="w-[68px] h-[56px] rounded-[5px] cursor-pointer "
          alt="photo"
          src="https://moodoffdp.com/wp-content/uploads/2023/04/Instagram-Girl-DP.jpg"
        />
      ),
      employee_id: "EMP001",
      Name: "John Doe",
      phone_number: "9234439878",
      task_status: "8/157",
    },
    {
      photo: (
        <img
          onClick={() => {
            router.push(`/field-officer/profile`);
          }}
          className="w-[68px] h-[56px] rounded-[5px] cursor-pointer "
          alt="photo"
          src="https://moodoffdp.com/wp-content/uploads/2023/04/Instagram-Girl-DP.jpg"
        />
      ),
      employee_id: "EMP001",
      Name: "John Doe",
      phone_number: "9234439878",
      task_status: "8/157",
    },
    {
      photo: (
        <img
          onClick={() => {
            router.push(`/field-officer/profile`);
          }}
          className="w-[68px] h-[56px] rounded-[5px] cursor-pointer "
          alt="photo"
          src="https://moodoffdp.com/wp-content/uploads/2023/04/Instagram-Girl-DP.jpg"
        />
      ),
      employee_id: "EMP001",
      Name: "John Doe",
      phone_number: "9234439878",
      task_status: "8/157",
    },
    {
      photo: (
        <img
          onClick={() => {
            router.push(`/field-officer/profile`);
          }}
          className="w-[68px] h-[56px] rounded-[5px] cursor-pointer "
          alt="photo"
          src="https://moodoffdp.com/wp-content/uploads/2023/04/Instagram-Girl-DP.jpg"
        />
      ),
      employee_id: "EMP001",
      Name: "John Doe",
      phone_number: "9234439878",
      task_status: "8/157",
    },
    {
      photo: (
        <img
          onClick={() => {
            router.push(`/field-officer/profile`);
          }}
          className="w-[68px] h-[56px] rounded-[5px] cursor-pointer "
          alt="photo"
          src="https://moodoffdp.com/wp-content/uploads/2023/04/Instagram-Girl-DP.jpg"
        />
      ),
      employee_id: "EMP001",
      Name: "John Doe",
      phone_number: "9234439878",
      task_status: "8/157",
    },
    {
      photo: (
        <img
          onClick={() => {
            router.push(`/field-officer/profile`);
          }}
          className="w-[68px] h-[56px] rounded-[5px] cursor-pointer "
          alt="photo"
          src="https://moodoffdp.com/wp-content/uploads/2023/04/Instagram-Girl-DP.jpg"
        />
      ),
      employee_id: "EMP001",
      Name: "John Doe",
      phone_number: "9234439878",
      task_status: "8/157",
    },
    {
      photo: (
        <img
          onClick={() => {
            router.push(`/field-officer/profile`);
          }}
          className="w-[68px] h-[56px] rounded-[5px] cursor-pointer "
          alt="photo"
          src="https://moodoffdp.com/wp-content/uploads/2023/04/Instagram-Girl-DP.jpg"
        />
      ),
      employee_id: "EMP001",
      Name: "John Doe",
      phone_number: "9234439878",
      task_status: "8/157",
    },
  ];

  return (
    <>
      <div className="p-5">
        {/* bread crumb and filters */}
        <div>
        </div>
        <div className="flex justify-between">
          <div className="">
            <BreadCrumb classes={` font-bold text-[#43424D]`} />
          </div>

          <Filter
            value={searchValue}
            applyFilter={() => { }}
            onSearch={(e: string) => {
              setSearchValue(e);
            }}
            filter={
              <div>
                <FieldOfficerFilter />
              </div>
            }
            addUrl={"/field-officer/add"}
          />
        </div>
        <DynamicTable data={data} />
      </div>
      {/* <DynamicTable data={data} /> */}
    </>
  );
};
export default ListFieldOfficer;

const FieldOfficerFilter = () => {
  return (
    <>
      <div className="grid grid-cols-2 ">
        <div className="w-[350px] px-3">
          <SelectMenu
            name="manager"
            handleChange={() => { }}
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
        <div className="w-[350px] px-3">
          <SelectMenu
            name="manager"
            handleChange={() => { }}
            placeHolderText="Select District"
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
            handleChange={() => { }}
            placeHolderText="Select Village"
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
            handleChange={() => { }}
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
      </div>
    </>
  );
};
