"use client";

import React, { lazy, Suspense, useEffect, useState } from "react";
import Head from "next/head";
import { Metadata } from "next";
import BreadCrumb from "@/components/table/bread-crumb";
import Filter from "@/components/table/filter";
import SelectMenu from "@/components/inputComponents/selectMenu";
import { useRouter } from "next/navigation";
//import { BiBell } from "react-icons/bi";
import { listFieldOfficer } from "@/redux/reducer/fieldOfficer/getList";
import { useDispatch, useSelector } from "react-redux";

const DynamicTable = lazy(() => import("@/components/table/dynamicTable"));

const ListFieldOfficer = () => {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const dispatch = useDispatch();
  const ListFieldOfficer = useSelector((store: any) => store.ListFieldOfficerData);
  // const ListOfficerData = ListFieldOfficer.response.data
  // console.log(ListOfficerData)

  useEffect(() => {
    dispatch(listFieldOfficer(""))
  }, [])


  const filterData = ListFieldOfficer.response.data?.map((e: any, index: number) => {
    console.log(e.profileImage)
    return {
      photo: (
        <img
          onClick={() => {
            router.push("/field-officer/" + e.id);
          }}
          className="w-[68px] cursor-pointer h-[56px] rounded-[5px] "
          alt="photo"
          src={
            e.profileImage ??
            "https://media.istockphoto.com/id/1092520698/photo/indian-farmer-at-onion-field.webp?b=1&s=170667a&w=0&k=20&c=pGCpSylCt1jR82BrJxM-9aEwklSsVzK2MvXNfCic1EA="
          }
        />
      ),
      employee_id: e.employeeId,
      Name: e.name,
      phone_number: e.phoneNo,
      task_status: "8/157",
    }
  });

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
        <DynamicTable data={filterData ?? []} />
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
