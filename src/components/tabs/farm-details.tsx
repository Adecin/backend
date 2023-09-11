import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

export default function Tabs({ data }: any) {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  //console.log("data", data);

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
            {data?.response?.data?.map((e: any, index: number) => {
              return (
                <Tab
                  key={index}
                  label={"Field " + (index + 1)}
                  value={(index + 1).toLocaleString()}
                />
              );
            })}
          </TabList>
        </Box>
        {data?.response?.data?.map((e: any, index: number) => {
          return (
            <TabPanel key={index} value={(index + 1).toLocaleString()}>
              <FieldOne data={e} />
            </TabPanel>
          );
        })}
      </TabContext>
    </Box>
  );
}

const FieldOne = ({ data }: any) => {
  return (
    <div>
      {" "}
      <div className="bg-lblue  max-w-[1400px]  my-2 p-5 rounded-[10px] grid grid-cols-5 ">
        <div className="px-5 flex flex-col  justify-between">
          <div className="my-4 text-[#858585] text-[16px]">Acreage</div>
          <div className="my-4 text-text font-semibold text-[14px]">
            {data.acres ?? ""}
          </div>
        </div>{" "}
        <div className="px-5 flex flex-col  justify-between">
          <div className="my-4 text-[#858585] text-[16px]">Soil Type</div>
          <div className="my-4 text-text font-semibold text-[14px]">
            {data.soilType ?? ""}
          </div>
        </div>{" "}
        <div className="px-5 flex flex-col  justify-between">
          <div className="my-4 text-[#858585] text-[16px]">Crop Type</div>
          <div className="my-4 text-text font-semibold text-[14px]">
            {data.cropTypeId?.name ?? ""}
          </div>
        </div>{" "}
        <div className="px-5 flex flex-col  justify-between">
          <div className="my-4 text-[#858585] text-[16px]">
            Irrigation Type{" "}
          </div>
          <div className="my-4 font-semibold text-text text-[14px]">
            {data.irrigationType ?? ""}
          </div>
        </div>
        <div className="px-5 flex flex-col  justify-between">
          <div className="my-4 text-[#858585] text-[16px]">OwnerShip</div>
          <div className="my-4 font-semibold text-text text-[14px]">
            {data.ownership ?? ""}
          </div>
        </div>
        <div className="px-5 flex flex-col  justify-between">
          <div className="my-4 text-[#858585] text-[16px]">Farm ID</div>
          <div className="my-4 font-semibold text-text text-[14px]">
            {data.farmId}
          </div>
        </div>
        <div className="px-5 flex flex-col  justify-between">
          <div className="my-4 text-[#858585] text-[16px]">
            Registration Number
          </div>
          <div className="my-4 font-semibold text-text text-[14px]">
            {data.registrationNumber ?? ""}
          </div>
        </div>
        <div className="px-5 flex flex-col  justify-between">
          <div className="my-4 text-[#858585] text-[16px]">Geo Location</div>
          <div className="my-4 font-semibold text-primary underline text-[14px]">
            {data.geoLocation ?? ""}
          </div>
        </div>
        <div className="px-5 flex flex-col  justify-between">
          <div className="my-4 text-[#858585] text-[16px]">Plot Map</div>
          <div className="my-4 font-semibold text-primary  underline text-[14px]">
            {data.plotMap ?? ""}
          </div>
        </div>
      </div>
    </div>
  );
};
