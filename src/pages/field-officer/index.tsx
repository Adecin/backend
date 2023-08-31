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
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Checkbox, Dialog } from "@mui/material";
import TechnicianManage from "./managePop";

const Info = async (data: string) => {
  toast.info(data, {
    position: toast.POSITION.TOP_RIGHT,
  });
};
const DynamicTable = lazy(() => import("@/components/table/dynamicTable"));

const ListFieldOfficer = () => {
  const [searchValue, setSearchValue] = useState("");
  const [filterEmpty, setfilterEmpty] = useState(false);
  const [counter, setCounter] = useState(0);
  const [checkedData, setCheckData] = useState<any>([]);
  const [allSelect, setSelect] = useState(false);
  const [manageOpen, setManageOpen] = useState(false);

  const router = useRouter();

  const [technicianFilter, setTechnicianFilter] = useState<any>({
    districtId: "",
    villageId: "",
  });

  const [paginateData, setData] = useState<any>({
    page: 0,
    limit: 10,
  });

  const initialValues = {
    districtId: "",
    villageId: "",
  };

  const handleSelectFilter = (name: any, value: any) => {
    technicianFilter[`${name}`] = value;
    setTechnicianFilter({ ...technicianFilter });
  };

  const query = `?page=${paginateData.page}&limit=${paginateData.limit}&districtId=${technicianFilter.districtId}&villageId=${technicianFilter.villageId}`;

  const applyFetchFilter = () => {
    const isEmpty =
      technicianFilter.districtId == false &&
      technicianFilter.villageId == false
        ? true
        : false;

    if (isEmpty) {
      setfilterEmpty(true);
    } else {
      dispatch(listFieldOfficer(query));
      setTechnicianFilter(initialValues);
    }
  };

  const handleClearFilter = () => {
    setTechnicianFilter(initialValues);
  };

  const dispatch = useDispatch();
  const ListFieldOfficer = useSelector(
    (store: any) => store.ListFieldOfficerData
  );
  // const ListOfficerData = ListFieldOfficer.response.data

  useEffect(() => {
    dispatch(listFieldOfficer(query));
  }, [paginateData]);

  useEffect(() => {
    if (counter == 2) {
      console.log(`filterData 11`, ListFieldOfficer.response.data);
      if (
        !ListFieldOfficer.response.data ||
        ListFieldOfficer.response.data.length === 0
      ) {
        console.log(`filterData in`, ListFieldOfficer.response.data);

        Info(`No Data Found`);
      }
    }
    setCounter(counter + 1);
  }, [ListFieldOfficer.response.data]);

  const filterData = ListFieldOfficer.response.data?.map(
    (e: any, index: number) => {
      return {
        checkBox: (
          <Checkbox
            checked={allSelect ? true : checkedData.includes(e.id)}
            onChange={() => {
              if (checkedData.includes(e.id)) {
                const findIndex = checkedData.indexOf(e.id);
                const cloneData = [...checkedData];
                cloneData.splice(findIndex, 1);
                setCheckData(cloneData);
              } else {
                setCheckData([...checkedData, e.id]);
              }
            }}
          />
        ),
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
            isEmpty={filterEmpty}
            onSearch={(e: string) => {
              setSearchValue(e);
            }}
            clearFilter={() => {
              handleClearFilter();
            }}
            filter={
              <div>
                <FieldOfficerFilter
                  values={technicianFilter}
                  selectFilter={handleSelectFilter}
                />
              </div>
            }
            addUrl={"/field-officer/add"}
          />
        </div>
        <div
          onClick={() => {
            setManageOpen(true);
          }}
          className="mx-4 text-[18px] underline cursor-pointer text-grey font-semibold"
        >
          Manage
        </div>
        <DynamicTable
          onClick={(e: boolean) => {
            setSelect(e);
          }}
          data={filterData ?? []}
          count={ListFieldOfficer.response.count}
          paginateData={(e: any) => {
            setData({
              page: e.page,
              limit: e.rowsPerPage,
            });
          }}
        />
      </div>
      <Dialog
        open={manageOpen}
        sx={{
          outline: "none",
          padding: "20px",
          "& .MuiDialog-root ": {
            borderRadius: "10px",
          },
          "& .MuiPaper-root ": {
            background: "#F9FAFB",
          },
          "& .MuiDialog-container": { outline: "none" },
        }}
      >
        <div className="ml-auto bg-[#F9FAFB] mt-3 mr-2">
          <svg
            onClick={() => {
              setManageOpen(false);
            }}
            className="cursor-pointer"
            width="31"
            height="31"
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_394_1843)">
              <circle cx="15.5" cy="11.5" r="11.5" fill="#858585" />
              <path
                d="M10.3022 6.30219C10.3978 6.20639 10.5115 6.13039 10.6365 6.07854C10.7616 6.02669 10.8956 6 11.031 6C11.1664 6 11.3004 6.02669 11.4255 6.07854C11.5506 6.13039 11.6642 6.20639 11.7598 6.30219L15.5002 10.0411L19.2405 6.30219C19.3362 6.20648 19.4498 6.13056 19.5749 6.07876C19.6999 6.02696 19.8339 6.0003 19.9693 6.0003C20.1047 6.0003 20.2387 6.02696 20.3637 6.07876C20.4888 6.13056 20.6024 6.20648 20.6981 6.30219C20.7938 6.3979 20.8697 6.51152 20.9215 6.63657C20.9733 6.76162 21 6.89565 21 7.031C21 7.16636 20.9733 7.30039 20.9215 7.42544C20.8697 7.55049 20.7938 7.66411 20.6981 7.75982L16.9592 11.5002L20.6981 15.2405C20.8914 15.4338 21 15.6959 21 15.9693C21 16.2427 20.8914 16.5048 20.6981 16.6981C20.5048 16.8914 20.2427 17 19.9693 17C19.6959 17 19.4338 16.8914 19.2405 16.6981L15.5002 12.9592L11.7598 16.6981C11.5665 16.8914 11.3044 17 11.031 17C10.7576 17 10.4955 16.8914 10.3022 16.6981C10.1089 16.5048 10.0003 16.2427 10.0003 15.9693C10.0003 15.6959 10.1089 15.4338 10.3022 15.2405L14.0411 11.5002L10.3022 7.75982C10.2064 7.66416 10.1304 7.55055 10.0785 7.42549C10.0267 7.30044 10 7.16638 10 7.031C10 6.89562 10.0267 6.76157 10.0785 6.63651C10.1304 6.51146 10.2064 6.39785 10.3022 6.30219Z"
                fill="#F9FAFB"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_394_1843"
                x="0"
                y="0"
                width="31"
                height="31"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_394_1843"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_394_1843"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </div>
        <div className="px-7 pb-7  bg-[#F9FAFB]">
          {checkedData.length > 0 && (
            <div className="mb-5 text-[20px] font-semibold">Manage</div>
          )}
          {checkedData.length ? (
            <TechnicianManage
              closePopUp={() => {
                setManageOpen(false);
              }}
              farmersList={checkedData}
            />
          ) : (
            <div style={{ fontSize: "18px" }}> Please select the farmers</div>
          )}
        </div>
      </Dialog>
    </>
  );
};
export default ListFieldOfficer;

const FieldOfficerFilter = (props: any) => {
  const { selectFilter, values } = props;

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
            handleChange={(e: any) => {}}
          />
        </div>
        <div className="w-[350px] px-3">
          <SelectMenu
            name="districtId"
            value={values}
            placeHolderText="Select District"
            data={districtDropDown ?? []}
            handleChange={(e: any) => {
              selectFilter(`districtId`, e.target.value);
            }}
          />
        </div>
        <div className="w-[350px] px-3">
          <SelectMenu
            name="villageId"
            value={values}
            placeHolderText="Select Village"
            data={villageDropDown ?? []}
            handleChange={(e: any) => {
              selectFilter(`villageId`, e.target.value);
            }}
          />
        </div>
        <div className="w-[350px] px-3">
          <SelectMenu
            name="manager"
            handleChange={(e: any) => {}}
            placeHolderText="Survey"
            data={[]}
          />
        </div>
      </div>
    </>
  );
};
