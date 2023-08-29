import { styled, Tab, Box, Tabs } from "@mui/material";
import React, { lazy } from "react";
//import DynamicTable from "../table/dynamicTable";
import { useRouter } from "next/navigation";
import UserRoleComp from "./userRole";

const DynamicTable = lazy(() => import("@/components/table/dynamicTable"));

const StyledTab = styled((props: any) => <Tab {...props} />)(({ theme }) => ({
  fontWeight: 500,
  fontSize: "16px",
  lineHeight: "21px",
  margin: "0 5rem",
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

export default function StaffDataTab(props: any) {
  const [value, setValue] = React.useState(0);
  const router = useRouter();

  const data = [
    {
      sl_no: "01",
      Username: (
        <span
          className="cursor-pointer"
          onClick={() => {
            router.push(`/staff-management/profile`);
          }}
        >{`Mohammed Shushan`}</span>
      ),
      jon_tittle: "Admin",
      password: "afrty81j555",
      company_id: "DTC0034",
      phone_number: "91 985746328",
    },
    {
      sl_no: "01",
      Username: (
        <span
          className="cursor-pointer"
          onClick={() => {
            router.push(`/staff-management/profile`);
          }}
        >{`Mohammed Shushan`}</span>
      ),
      jon_tittle: "Admin",
      password: "afrty81j555",
      company_id: "DTC0034",
      phone_number: "91 985746328",
    },
    {
      sl_no: "01",
      Username: (
        <span
          className="cursor-pointer"
          onClick={() => {
            router.push(`/staff-management/profile`);
          }}
        >{`Mohammed Shushan`}</span>
      ),
      jon_tittle: "Admin",
      password: "afrty81j555",
      company_id: "DTC0034",
      phone_number: "91 985746328",
    },
    {
      sl_no: "01",
      Username: (
        <span
          className="cursor-pointer"
          onClick={() => {
            router.push(`/staff-management/profile`);
          }}
        >{`Mohammed Shushan`}</span>
      ),
      jon_tittle: "Admin",
      password: "afrty81j555",
      company_id: "DTC0034",
      phone_number: "91 985746328",
    },
    {
      sl_no: "01",
      Username: (
        <span
          className="cursor-pointer"
          onClick={() => {
            router.push(`/staff-management/profile`);
          }}
        >{`Mohammed Shushan`}</span>
      ),
      jon_tittle: "Admin",
      password: "afrty81j555",
      company_id: "DTC0034",
      phone_number: "91 985746328",
    },
    {
      sl_no: "01",
      Username: (
        <span
          className="cursor-pointer"
          onClick={() => {
            router.push(`/staff-management/profile`);
          }}
        >{`Mohammed Shushan`}</span>
      ),
      jon_tittle: "Admin",
      password: "afrty81j555",
      company_id: "DTC0034",
      phone_number: "91 985746328",
    },
  ];

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div>
      <Tabs
        className="mx-8"
        sx={{
          ".css-heg063-MuiTabs-flexContainer": {
            borderBottom: "2px solid #D9D9D9",
            padding: "0 1rem",
          },
        }}
        value={value}
        onChange={handleChange}
        aria-label="scrollable force tabs example"
      >
        <StyledTab label={`Staff list`} className="mx-6 px-6" />
        <StyledTab label={`User Role`} className="mx-6 px-6" />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        <DynamicTable data={data} classes={` py-4`} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <UserRoleComp />
      </CustomTabPanel>
    </div>
  );
}
