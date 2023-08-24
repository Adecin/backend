"use client";

import React, { lazy, Suspense, useEffect, useState } from "react";
import Head from "next/head";
import { Metadata } from "next";
import BreadCrumb from "@/components/table/bread-crumb";
import Filter from "@/components/table/filter";
import SelectMenu from "@/components/inputComponents/selectMenu";
import { useRouter } from "next/navigation";
import Badge from "@mui/material/Badge";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
//import { BiBell } from "react-icons/bi";
import { listFieldOfficer } from "@/redux/reducer/fieldOfficer/getList";
import { useDispatch, useSelector } from "react-redux";
import { getVillage } from "@/redux/reducer/dropdown/get-village";
import { getDistrict } from "@/redux/reducer/dropdown/get-district";

const DynamicTable = lazy(() => import("@/components/table/dynamicTable"));

const ListFieldOfficer = () => {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const [technicianFilter, setTechnicianFilter] = useState<any>({
    districtId: 1,
    villageId: "",
  });

  const initialValues = {
    districtId: "",
    villageId: "",
  };

  const handleSelectFilter = (name: any, value: any) => {
    technicianFilter[`${name}`] = value;
    setTechnicianFilter({ ...technicianFilter });
  };

  const query = `?districtId=${technicianFilter.districtId}&villageId=${technicianFilter.villageId}`;

  const applyFetchFilter = () => {
    dispatch(listFieldOfficer(query));
    setTechnicianFilter(initialValues);
  };

  const dispatch = useDispatch();
  const ListFieldOfficer = useSelector(
    (store: any) => store.ListFieldOfficerData
  );
  // const ListOfficerData = ListFieldOfficer.response.data

  useEffect(() => {
    dispatch(listFieldOfficer(""));
  }, []);

  const filterData = ListFieldOfficer.response.data?.map(
    (e: any, index: number) => {
      console.log(e.farmerCount);
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
        employee_ID: e.employeeId,
        Name: e.name,
        phone_number: e.phoneNo,
        task_status: (
          <>
            <span className="text-[#70B10E]">{`${e.completedCount}`}</span>
            <span className="text-[#858585]">{`/${e.farmerCount}`}</span>
          </>
        ),
      };
    }
  );
  return (
    <>
      <div className="p-5">
        {/* bread crumb and filters */}
        <div className="flex justify-end px-8 m-3">
          <Badge badgeContent={2} color="error">
            <NotificationsNoneIcon className="text-primary text-[28px]" />
          </Badge>
        </div>
        <div
          style={{
            zIndex: 3,
          }}
          className="absolute top-0 sticky bg-white flex justify-between"
        >
          <div className="">
            <BreadCrumb classes={` font-bold text-[#43424D]`} />
          </div>

          <Filter
            value={searchValue}
            applyFilter={() => {
              applyFetchFilter();
            }}
            onSearch={(e: string) => {
              setSearchValue(e);
            }}
            filter={
              <div>
                <FieldOfficerFilter selectFilter={handleSelectFilter} />
              </div>
            }
            addUrl={"/field-officer/add"}
          />
        </div>
        <DynamicTable
          data={filterData ?? []}
          count={ListFieldOfficer.response.count}
        />
      </div>
      {/* <DynamicTable data={data} /> */}
    </>
  );
};
export default ListFieldOfficer;

const FieldOfficerFilter = (props: any) => {
  const { selectFilter } = props;

  const dispatch = useDispatch();
  const GetDistrict = useSelector((state: any) => state.ListDistrict);
  const GetSVillage = useSelector((state: any) => state.ListVillage);

  useEffect(() => {
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

  return (
    <>
      <div className="grid grid-cols-2 mt-6">
        <div className="w-[350px] px-3">
          <SelectMenu
            name="manager"
            placeHolderText="Select Manager"
            data={[]}
            handleChange={(e: any) => {
              console.log(`e.target.value`, e.target.value);
            }}
          />
        </div>
        <div className="w-[350px] px-3">
          <SelectMenu
            name="manager"
            placeHolderText="Select District"
            data={districtDropDown ?? []}
            handleChange={(e: any) => {
              console.log(`e.target.value`, e.target.value);
              selectFilter(`districtId`, e.target.value);
            }}
          />
        </div>
        <div className="w-[350px] px-3">
          <SelectMenu
            name="manager"
            placeHolderText="Select Village"
            data={villageDropDown ?? []}
            handleChange={(e: any) => {
              console.log(`e.target.value`, e.target.value);
              selectFilter(`villageId`, e.target.value);
            }}
          />
        </div>
        <div className="w-[350px] px-3">
          <SelectMenu
            name="manager"
            handleChange={(e: any) => {
              console.log(`e.target.value`, e.target.value);
            }}
            placeHolderText="Survey"
            data={[]}
          />
        </div>
      </div>
    </>
  );
};
