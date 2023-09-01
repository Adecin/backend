import MultiSelectMenu from "@/components/inputComponents/multiSelect";
import SelectMenu from "@/components/inputComponents/selectMenu";
import TextArea from "@/components/inputComponents/texArea";
import approveFarmer from "@/redux/reducer/farmer/approve-farmer";
import { listFieldOfficer } from "@/redux/reducer/fieldOfficer/getList";
import updateAssignFarmer from "@/redux/reducer/fieldOfficer/updateAssignFarmer";
import { getCrop } from "@/redux/reducer/crop/get-all-crop";
import {
  Box,
  Tabs,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  styled,
  Tab,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const StyledTab = styled((props: any) => <Tab {...props} />)(({ theme }) => ({
  fontWeight: 500,
  fontSize: "16px",
  lineHeight: "21px",
  margin: "0 1rem",
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

const TechnicianManage = ({ closePopUp, farmersList }: any) => {
  const [is_approve, setApprove] = useState("true");
  const [reason, setReason] = useState("");

  const [selectedTechnicain, setSelectedTechnicain] = useState({
    tech: "",
  });

  const [value, setValue] = useState(0);
  const ListFieldOfficer = useSelector(
    (store: any) => store.ListFieldOfficerData
  );

  const CropResponse = useSelector((state: any) => state.ListCrop.response);
  const CropList = CropResponse.data;

  const dispatch = useDispatch();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(listFieldOfficer(""));
    dispatch(getCrop());
  }, []);

  const handleApprove = () => {
    closePopUp();
    const data =
      is_approve == "true"
        ? {
            is_approve: is_approve,
            id: farmersList,
          }
        : {
            id: farmersList,
            reason: reason,
          };
    dispatch(approveFarmer(data));
  };

  return (
    <>
      <Tabs
        className=""
        sx={{
          ".css-heg063-MuiTabs-flexContainer": {
            borderBottom: "2px solid #D9D9D9",
            padding: "0 1rem",
          },
        }}
        value={value}
        onChange={handleChange}
        aria-label=""
      >
        <StyledTab label={`Assign survey`} className="" />
        <StyledTab label={`Assign crop type`} className="" />
      </Tabs>
      <CustomTabPanel index={0} value={value}>
        <div className="w-[400px] mt-6">
          <MultiSelectMenu
            name="tech"
            handleChange={(e: any) => {
              setSelectedTechnicain({
                ...selectedTechnicain,
                tech: e.target.value,
              });
            }}
            //value={selectedTechnicain}
            labelname="Select survey name"
            placeHolderText="Select survey name"
            data={ListFieldOfficer?.response?.data}
            value={[]}
          />
        </div>
        <div className="flex justify-center mr-5">
          <div
            onClick={() => {
              closePopUp();
            }}
            className="bg-[#BEBEBE] cursor-pointer px-8 mx-2 rounded-[5px] text-white py-2 font-medium"
          >
            Cancel
          </div>
          <div
            onClick={() => {
              const data = {
                technicianId: selectedTechnicain.tech,
                farmerId: farmersList,
              };
              dispatch(updateAssignFarmer(data));
              closePopUp();
            }}
            className="bg-primary cursor-pointer px-8 mx-2 rounded-[5px] text-white py-2 font-medium"
          >
            Save
          </div>
        </div>
      </CustomTabPanel>
      <CustomTabPanel index={1} value={value}>
        <div className="w-[400px] mt-6">
          <MultiSelectMenu
            name="manager"
            handleChange={() => {}}
            placeHolderText="Select crop type"
            labelname="Select crop type"
            data={CropList ?? []}
            value={[]}
          />
        </div>
        <div className="flex justify-center mr-5">
          <div
            onClick={() => {
              closePopUp();
            }}
            className="bg-[#BEBEBE] cursor-pointer px-8 mx-2 rounded-[5px] text-white py-2 font-medium"
          >
            Cancel
          </div>
          <div
            onClick={() => {
              closePopUp();
            }}
            className="bg-primary cursor-pointer px-8 mx-2 rounded-[5px] text-white py-2 font-medium"
          >
            Save
          </div>
        </div>
      </CustomTabPanel>
    </>
  );
};

export default TechnicianManage;
