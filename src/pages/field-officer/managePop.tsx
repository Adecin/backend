import MultiSelectMenu from "@/components/inputComponents/multiSelect";
import SelectMenu from "@/components/inputComponents/selectMenu";
import updateAssignFarmer from "@/redux/reducer/fieldOfficer/updateAssignFarmer";
import { getCrop } from "@/redux/reducer/crop/get-all-crop";
import { Box, Tabs, styled, Tab } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listAllSurvey } from "@/redux/reducer/survey/getSurveyList";
import * as Yup from "yup";
import { useFormik } from "formik";
import { assignTechSurvey } from "@/redux/reducer/fieldOfficer/assignSurvey";
import { assignTechCrop } from "@/redux/reducer/fieldOfficer/assignTechCrop";
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

const TechnicianManage = ({ closePopUp, farmersList, techIds }: any) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
        {/* <StyledTab label={`Assign crop type`} className="" /> */}
      </Tabs>
      <CustomTabPanel index={0} value={value}>
        <ManageAssignSurvey technicianIds={techIds} closePopUp={closePopUp} />
      </CustomTabPanel>
      {/* <CustomTabPanel index={1} value={value}>
        <ManageCropType technicianIds={techIds} closePopUp={closePopUp} />
      </CustomTabPanel> */}
    </>
  );
};

export default TechnicianManage;

const ManageCropType = (props: any) => {
  const { technicianIds, closePopUp } = props;
  const dispatch = useDispatch();
  const CropResponse = useSelector((state: any) => state.ListCrop.response);
  const CropList = CropResponse.data;

  const AssignTechCrop = useSelector((state: any) => state.AssignTechCrop);

  //console.log(`vjkj`, AssignTechCrop);

  const CropTypeSchema = Yup.object().shape({
    cropIds: Yup.array().required(),
    technicianIds: Yup.array().required(),
  });

  const formik = useFormik({
    initialValues: {
      cropIds: [],
      technicianIds: technicianIds,
    },
    validationSchema: CropTypeSchema,
    onSubmit: (values: any) => {
      //console.log(values);
      dispatch(assignTechCrop(values));
    },
  });

  const {
    values,
    handleChange,
    handleSubmit,
    resetForm,
    touched,
    setFieldValue,
    errors,
  } = formik;

  useEffect(() => {
    dispatch(getCrop());
  }, []);

  useEffect(() => {
    if (AssignTechCrop.isSuccess) {
      closePopUp();
    }
  }, [AssignTechCrop]);

  return (
    <div>
      <div className="w-[400px] mt-6">
        <MultiSelectMenu
          name="cropIds"
          fieldStyle={{
            fontSize: "16px",
            color: "#000",
          }}
          handleChange={(e: any) => {
            //console.log(`value`, e.target.value);
            setFieldValue(`cropIds`, e.target.value);
          }}
          placeHolderText="Select crop type"
          labelname="Select crop type"
          data={CropList ?? []}
          value={values.cropIds}
        />
      </div>
      <div className="flex justify-center mr-5">
        <div
          onClick={(e: any) => {
            resetForm();
          }}
          className="bg-[#BEBEBE] cursor-pointer px-8 mx-2 rounded-[5px] text-white py-2 font-medium"
        >
          Cancel
        </div>
        <div
          onClick={(e: any) => {
            handleSubmit();
            //closePopUp();
          }}
          className="bg-primary cursor-pointer px-8 mx-2 rounded-[5px] text-white py-2 font-medium"
        >
          Save
        </div>
      </div>
    </div>
  );
};

const ManageAssignSurvey = (props: any) => {
  const dispatch = useDispatch();

  const { technicianIds, closePopUp } = props;

  //console.log(`technicianIds`, technicianIds);

  const SurveyList = useSelector((state: any) => state.ListAllSurvey.response);
  const AssignTechSurvey = useSelector((state: any) => state.AssignTechSurvey);

  const AssignSurveySchema = Yup.object().shape({
    surveyIds: Yup.array().required(),
    technicianIds: Yup.array().required(),
  });

  const formik = useFormik({
    initialValues: {
      surveyIds: [],
      technicianIds: technicianIds,
    },
    validationSchema: AssignSurveySchema,
    onSubmit: (values: any) => {
      //console.log(values);
      dispatch(assignTechSurvey(values));
    },
  });

  const {
    values,
    handleChange,
    resetForm,
    handleSubmit,
    touched,
    setFieldValue,
    errors,
  } = formik;

  useEffect(() => {
    dispatch(listAllSurvey());
  }, []);

  useEffect(() => {
    if (AssignTechSurvey.isSuccess) {
      closePopUp();
    }
  }, [AssignTechSurvey]);

  return (
    <div>
      <div className="w-[400px] mt-6">
        <MultiSelectMenu
          name="surveyIds"
          handleChange={(e: any) => {
            //console.log(e.target, `target.value`);
            setFieldValue(`surveyIds`, e.target.value);
          }}
          fieldStyle={{
            fontSize: "16px",
            color: "#000",
          }}
          //value={selectedTechnicain}
          labelname="Select survey name"
          placeHolderText="Select survey name"
          data={SurveyList ?? []}
          value={values.surveyIds}
        />
      </div>
      <div className="flex justify-center mr-5">
        <div
          onClick={(e: any) => {
            resetForm();
          }}
          className="bg-[#BEBEBE] cursor-pointer px-8 mx-2 rounded-[5px] text-white py-2 font-medium"
        >
          Cancel
        </div>
        <div
          onClick={(e: any) => {
            handleSubmit();
            //closePopUp();
          }}
          className="bg-primary cursor-pointer px-8 mx-2 rounded-[5px] text-white py-2 font-medium"
        >
          Save
        </div>
      </div>
    </div>
  );
};
