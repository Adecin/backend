"use client";

import React, { lazy, Suspense, useState } from "react";
import Head from "next/head";
import { Metadata } from "next";
import BreadCrumb from "@/components/table/bread-crumb";
import Filter from "@/components/table/filter";
import SelectMenu from "@/components/inputComponents/selectMenu";
import { useRouter } from "next/navigation";
import StaffDataTab from "@/components/staffManagement/staffManagementTab";
import LabelText from "@/components/labelText";
import { FormControlLabel, Checkbox } from "@mui/material";
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
                        addUrl={"/staff-management/add"}
                    />
                </div>
                <div>
                    <StaffDataTab />
                </div>
                {/* <DynamicTable data={data} /> */}
            </div>
        </>
    );
};
export default ListFieldOfficer;

const FieldOfficerFilter = () => {


    const Userfilter = (props: any) => {
        const { label,classes } = props;
        const accessList = [
            { name: "view", label: "View" },
            { name: "edit", label: "Edit" },
            { name: "delete", label: "Delete" },
            { name: "print", label: "Print" }
        ];
        const [checked, setChecked] = useState(false);
        return (
            <div>
                <LabelText labelName={label} customStyle={{maxWidth:"140px"}} />
                <div className={`flex flex-col mx-3` + classes}>
                    {accessList.map((item: any, index: any) => {
                        return (
                            <FormControlLabel key={index}
                                control={
                                    <Checkbox checked={checked} onChange={() => { setChecked(!checked) }} name={item.name} />
                                }
                                label={item.label}
                            />
                        )
                    })}
                </div>
            </div>
        )
    }
    return (
        <>
            <div className="flex flex-col ">
                <div className="w-[50%] px-3">
                    <SelectMenu
                        name="job_title"
                        handleChange={() => { }}
                        placeHolderText="Job title"
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
                <div className="flex gap-x-3 m-3 ">
                    <Userfilter label={`Farmer master`} classes={` mt-6`}/>
                    <Userfilter label={`Farmer profile`} classes={` mt-6`}/>
                    <Userfilter label={`Field officer master`} />
                    <Userfilter label={`Field officer profile`} />
                    <Userfilter label={`STP Survey Data`} classes={` mt-6`}/>
                    <Userfilter label={`Crop Monitoring Survey data`} />
                </div>
            </div>
        </>
    );
};
