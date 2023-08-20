import { Tabs, Tab, styled, Box } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import TextInput from "@/components/inputComponents/textInput";
import * as Yup from 'yup';
import { Formik, useFormik } from 'formik';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CustomButton from "@/components/customButton";
import BreadCrumb from "@/components/table/bread-crumb";
import Filter from "@/components/table/filter";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { getCrop } from "@/redux/reducer/crop/get-all-crop";
import { useDispatch, useSelector } from "react-redux";
import { addCrop } from "@/redux/reducer/crop/add-croptype";
import { updateCrop } from "@/redux/reducer/crop/update-crop";

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
    const [showfcv, setshowfcv] = React.useState(false);
    const [showNfcv, setshowNfcv] = React.useState(false);
    const dispatch = useDispatch();

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const handlehidefield = () => {
        setshowfcv(false);
    };
    const handlehidefieldN = () => {
        setshowNfcv(false);
    };

    const AddCropState = useSelector((state: any) => state.AddCrop);
    const AddCropType = AddCropState.response;

    const UpdateState = useSelector((state: any) => state.UpdateCrop);
    const UpadteCropType = AddCropState.response;

    const CropResponse = useSelector((state: any) => state.ListCrop.response);
    const CropList = CropResponse.data;
    const CropTypeValue = (value == 0) ? `FCV` : `NONFCV`;

    useEffect(() => {
        dispatch(getCrop());
    }, []);

    useEffect(() => {
        console.log(`refreshing`)
        dispatch(getCrop());
    }, [AddCropState.isSuccess, UpdateState.isSuccess]);

    console.log(`AddCropState`, AddCropState)
    console.log(`UpdateState`, UpdateState)

    return (
        <div>
            <div className="absolute top-0 sticky bg-white flex justify-between mt-14 mb-6 mr-12">
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
                onChange={handleTabChange}
                aria-label="scrollable force tabs example">
                <StyledTab label={`FCV type`} className="mx-6 px-6" />
                <StyledTab label={`Non FCV type`} className="mx-6 px-6" />
            </Tabs>
            <CustomTabPanel value={value} index={0}>
                <div>
                    {CropList?.filter((item: any) => {
                        if (item.cropType == `FCV`) {
                            return item
                        }
                    }).map((filteredItem: any, index: any) => {

                        return (
                            <UpdateCropComponent key={index} dataItem={filteredItem} />
                        )
                    })}
                    {showfcv &&
                        <AddCropComponent cropType={CropTypeValue} readOnly={false} hideField={handlehidefield}/>
                    }
                </div>
                <CustomButton
                    classes={`text-primary `}
                    buttonName={`Add question`}
                    startIcon={<AddCircleIcon className="text-primary" />}
                    customStyle={{
                        background: "none",
                        padding: "1rem 3rem",
                        color: "#3D7FFA",
                    }}
                    handleOnClick={() => {
                        setshowfcv(true);
                    }}
                />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <div>
                    {CropList?.filter((item: any) => {
                        if (item.cropType == `NONFCV`) {
                            return item
                        }
                    }).map((filteredItem: any, index: any) => {
                        return (
                            <UpdateCropComponent key={index} dataItem={filteredItem} />
                        )
                    })}
                    {showNfcv &&
                        <AddCropComponent cropType={CropTypeValue} readOnly={false} hideField={handlehidefieldN}/>
                    }
                </div>
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
                        setshowNfcv(true);
                    }}
                />
            </CustomTabPanel>
        </div>
    )
};

const TypeElement = (props: any) => {
    const [editCrop, setEditCrop] = useState(true);
    const { crop_year, crop_name, handleChange, handleSubmit, readOnly, errors, touched } = props;

    const handleEdit = () => {
        setEditCrop(false);
    };

    return (
        <div className="w-full flex items-center gsp-x-12">
            <div className="flex gap-x-8">
                <TextInput
                    readOnly={readOnly ?? editCrop}
                    classes={` py-0 pt-2`}
                    label={""}
                    name="name"
                    value={crop_name}
                    //touched={touched}
                    handleChange={handleChange}
                    //error={errors}
                    placeholder="Type crop name here"
                    customStyle={{
                        color: "#858585",
                        padding: "0.85rem",
                        width: "300px",
                        background: "#F7F7F7",
                    }}
                />
                <TextInput
                    readOnly={readOnly ?? editCrop}
                    classes={` py-0 pt-2`}
                    label={""}
                    name="cropYear"
                    value={crop_year}
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
            {(readOnly ?? editCrop) ? <EditIcon className={`text-primary text-[28px] mx-3 cursor-pointer`} onClick={() => { handleEdit() }} /> : <CustomButton
                classes={` w-[107px] rounded-[30px]`}
                buttonName={`Save`}
                customStyle={{ background: "#3D7FFA", borderRadius: "30px", padding: "0.5rem 1.5rem" }}
                handleOnClick={handleSubmit} />}
            <DeleteOutlineIcon className={`text-grey text-[28px] mx-3 cursor-pointer`} onClick={() => { handleEdit() }} />
        </div>
    )
};

const AddCropComponent = (props: any) => {
    const dispatch = useDispatch();
    const { cropType, hideField } = props;
    const SignInSchema = Yup.object().shape({
        name: Yup.string()
            .matches(/^[aA-zZ]+$/, 'Must be only alphabets')
            .required('Please enter a valid crop name'),
        cropYear: Yup.string()
            .required('Please enter a valid crop year')
            .matches(/^[0-9]+$/, 'Must be only digits'),
        cropType: Yup.string(),
        id: Yup.string(),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            cropYear: '',
            cropType: cropType,
        },
        validationSchema: SignInSchema,
        onSubmit: (values: any) => {
            dispatch(addCrop(values));
            console.log(`values 1`, values);
        },
    });

    const {
        values,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldTouched,
        touched,
        errors,
    } = formik;
    console.log(`values 3`, values);
    const submitTest = () => {
        console.log(`values update`, values);
        dispatch(addCrop(values));
        hideField();
    }

    return (
        <TypeElement readOnly={false} handleChange={handleChange} crop_year={values.cropYear} handleSubmit={submitTest} crop_name={values.name} errors={errors} touched={touched} />
    )
};

const UpdateCropComponent = (props: any) => {
    const dispatch = useDispatch();
    const { dataItem } = props;
    const SignInSchema = Yup.object().shape({
        name: Yup.string()
            .matches(/^[aA-zZ]+$/, 'Must be only alphabets')
            .required('Please enter a valid crop name'),
        cropYear: Yup.string()
            .required('Please enter a valid crop year')
            .matches(/^[0-9]+$/, 'Must be only digits'),
        cropType: Yup.string(),
        id: Yup.string(),
    });

    const formik = useFormik({
        initialValues: {
            name: dataItem.name ?? '',
            cropYear: dataItem.cropYear ?? '',
            cropType: dataItem.cropType ?? '',
            id: dataItem.id ?? '',
        },
        validationSchema: SignInSchema,
        onSubmit: (values: any) => {
            console.log(`values update`, values);
            dispatch(updateCrop(values));
        },
    });

    const {
        values,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldTouched,
        touched,
        errors,
    } = formik;

    const submitTest = () => {
        console.log(`values update`, values);
        dispatch(updateCrop(values));
    }
    return (
        <TypeElement handleChange={handleChange} crop_year={values.cropYear} handleSubmit={submitTest} crop_name={values.name} errors={errors} touched={touched} />
    )
}