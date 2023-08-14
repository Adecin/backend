import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

export default function Tabs() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1", minHeight: "500px" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            variant="fullWidth"
            scrollButtons="auto"
            sx={{
              "& .MuiTab-root": {
                textTransform: "capitalize",
              },
            }}
            onChange={handleChange}
          >
            <Tab label="Field 1" value="1" />
            <Tab label="Field 2" value="2" />
            <Tab label="Field 3" value="3" />
            <Tab label="Field 4" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <FieldOne />
        </TabPanel>
        <TabPanel value="2">
          <FieldOne />
        </TabPanel>
        <TabPanel value="3">
          <FieldOne />
        </TabPanel>
        <TabPanel value="4">
          <FieldOne />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

const FieldOne = () => {
  return (
    <div>
      {" "}
      <div className="bg-lblue  max-w-[1400px]  my-2 p-5 rounded-[10px] grid grid-cols-5 ">
        <div className="px-5 flex flex-col  justify-between">
          <div className="my-4 text-[#858585] text-[16px]">Acreage</div>
          <div className="my-4 text-text text-[14px]">2.2</div>
        </div>{" "}
        <div className="px-5 flex flex-col  justify-between">
          <div className="my-4 text-[#858585] text-[16px]">Soil Type</div>
          <div className="my-4 text-text text-[14px]">Silt</div>
        </div>{" "}
        <div className="px-5 flex flex-col  justify-between">
          <div className="my-4 text-[#858585] text-[16px]">
            Irrigation Type{" "}
          </div>
          <div className="my-4 text-text text-[14px]">Bore well</div>
        </div>
        <div className="px-5 flex flex-col  justify-between">
          <div className="my-4 text-[#858585] text-[16px]">OwnerShip</div>
          <div className="my-4 text-text text-[14px]">Free Hold</div>
        </div>
        <div className="px-5 flex flex-col  justify-between">
          <div className="my-4 text-[#858585] text-[16px]">Field ID</div>
          <div className="my-4 text-text text-[14px]">023434</div>
        </div>
        <div className="px-5 flex flex-col  justify-between">
          <div className="my-4 text-[#858585] text-[16px]">
            Registration Number
          </div>
          <div className="my-4 text-text text-[14px]">PYG425786</div>
        </div>
        <div className="px-5 flex flex-col  justify-between">
          <div className="my-4 text-[#858585] text-[16px]">Gio Location</div>
          <div className="my-4 text-primary underline text-[14px]">
            {`2°10'26.5"E`}
          </div>
        </div>
        <div className="px-5 flex flex-col  justify-between">
          <div className="my-4 text-[#858585] text-[16px]">Plot Map</div>
          <div className="my-4 text-primary  underline text-[14px]">
            {`2°10'26.5"E`}
          </div>
        </div>
      </div>
    </div>
  );
};
