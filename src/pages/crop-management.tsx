import { Tabs, Tab, styled, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import TextInput from "@/components/inputComponents/textInput";
import * as Yup from 'yup';
import { Formik, useFormik } from 'formik';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CustomButton from "@/components/customButton";
import BreadCrumb from "@/components/table/bread-crumb";
import Filter from "@/components/table/filter";
import AddCircleIcon from '@mui/icons-material/AddCircle';

const cropData = [
    { id: "01", cropName: "Burley", year: "2002" },
    { id: "02", cropName: "FCV-Mysore", year: "2004" },
    { id: "03", cropName: "FCV-NLS", year: "2008" },
    { id: "04", cropName: "RBU", year: "2011" }

]

const StyledTab = styled((props: any) => <Tab {...props} />)(({ theme }) => ({
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '21px',
    margin: '0 5rem',
    textTransform: 'none',
    color: "#858585",
    '&.Mui-selected': {
        fontWeight: 700,
        color: '#3D7FFA',
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
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
};

export default function CropManagement(props: any) {

    const [value, setValue] = React.useState(0);
    const [searchValue, setSearchValue] = React.useState("");


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div>
            <div className="flex justify-between mt-14 mb-6 mr-12">
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
                        </div>
                    }
                />
            </div>
            <Tabs className="mx-8"
                sx={{
                    ".css-heg063-MuiTabs-flexContainer": {
                        borderBottom: "2px solid #D9D9D9",
                        padding: "0 1rem"
                    }
                }}
                value={value}
                onChange={handleChange}
                aria-label="scrollable force tabs example">
                <StyledTab label={`FCV type`} className="mx-6 px-6" />
                <StyledTab label={`Non FCV type`} className="mx-6 px-6" />
            </Tabs>
            <CustomTabPanel value={value} index={0}>
                {cropData.map((item: any, index: any) => {
                    return (
                        <TypeElement key={index} />
                    )
                })}
                <CustomButton
                    classes={`text-primary `}
                    buttonName={`Add question`}
                    startIcon={<AddCircleIcon className="text-primary" />}
                    customStyle={{
                        background: "none",
                        padding: "3rem 1rem",
                        color: "#3D7FFA",
                    }}
                    handleOnClick={() => {
                    }}
                />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                {cropData.map((item: any, index: any) => {
                    return (
                        <TypeElement key={index}/>
                    )
                })}
                <CustomButton
                    classes={`text-primary `}
                    buttonName={`Add question`}
                    startIcon={<AddCircleIcon className="text-primary" />}
                    customStyle={{
                        background: "none",
                        padding: "3rem 1rem",
                        color: "#3D7FFA",
                    }}
                    handleOnClick={() => {
                    }}
                />
            </CustomTabPanel>

        </div>
    )
};

const TypeElement = () => {
    const [editCrop, setEditCrop] = useState(true);

    const SignInSchema = Yup.object().shape({
        crop_name: Yup.string()
            .matches(/^[aA-zZ]+$/, 'Must be only alphabets')
            .required('Please enter a valid email address.'),
        crop_year: Yup.string()
            .required('Please enter a valid password.')
            .matches(/^[0-9]+$/, 'Must be only digits')
    });

    const formik = useFormik({
        initialValues: {
            crop_name: '',
            crop_year: '',
        },
        validationSchema: SignInSchema,
        onSubmit: (values: any) => {
        },
    });


    const {
        values,
        handleBlur,
        handleChange,
        handleSubmit,
        touched,
        setFieldValue,
        resetForm,
        errors,
    } = formik;

    const handleEdit = () => {
        setEditCrop(!editCrop)
    }

    return (
        <div className="w-full flex items-center gsp-x-12">
            <div className="flex gap-x-8">
                <TextInput
                    readOnly={editCrop}
                    classes={` py-0 pt-2`}
                    label={""}
                    name="crop_name"
                    value={values}
                    onblur={handleBlur}
                    touched={touched}
                    handleChange={handleChange}
                    error={errors}
                    placeholder="Type crop name here"
                    customStyle={{
                        color: "#858585",
                        padding: "0.85rem",
                        width: "300px",
                        background: "#F7F7F7",
                    }}
                />
                <TextInput
                    readOnly={editCrop}
                    classes={` py-0 pt-2`}
                    label={""}
                    name="crop_year"
                    value={values}
                    onblur={handleBlur}
                    touched={touched}
                    handleChange={handleChange}
                    error={errors}
                    placeholder="Type year here"
                    customStyle={{
                        color: "#858585",
                        padding: "0.85rem",
                        width: "300px",
                        background: "#F7F7F7",
                    }}
                />
            </div>
            {editCrop ? <EditIcon className={`text-primary text-[28px] mx-3 cursor-pointer`} onClick={() => { handleEdit() }} /> : <CustomButton
                classes={` w-[107px] rounded-[30px]`}
                buttonName={`Save`}
                customStyle={{ background: "#3D7FFA", borderRadius: "30px", padding: "0.5rem 1.5rem" }}
                handleOnClick={() => { handleEdit() }}
            />}
            <DeleteOutlineIcon className={`text-grey text-[28px] mx-3 cursor-pointer`} onClick={() => { handleEdit() }} />
        </div>
    )
}