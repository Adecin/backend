"use client";

import DatePicker from "@/components/inputComponents/datepicker";
import TextInput from "@/components/inputComponents/textInput";
import Filter from "@/components/table/filter";
import BreadCrumb from "@/components/table/bread-crumb";
import React, { lazy, Suspense } from "react";
const DynamicTable = lazy(() => import("@/components/table/dynamicTable"));

export default function Dashboard() {
  // table data
  const data = [
    {
      photo: (
        <img
          className="w-[68px] h-[56px] rounded-[5px] "
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
          className="w-[68px] h-[56px] rounded-[5px] "
          alt="photo"
          src="https://moodoffdp.com/wp-content/uploads/2023/04/Instagram-Girl-DP.jpg"
        />
      ),
      employee_id: "EMP001",
      Name: "Jane Smith",
      phone_number: "9234439878",
      task_status: "8/157",
    },
  ];

  return (
    <div className="w-[100%]">
      <div className="flex justify-between">
        <div>
          <BreadCrumb />
        </div>
        <div>{/* <Filter /> */}</div>
      </div>
    </div>
  );
}
