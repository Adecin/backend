"use client";

import { EB_Garamond } from "next/font/google";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Image from "next/image";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const garamond = EB_Garamond({ weight: "700", subsets: ["latin"] });
export default function Sidebar() {
  const pathname = usePathname();
  const [isExpand, setIsExpand] = useState(true);
  const [isActive, setActive] = useState(0);
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();
  const getUrl = pathname?.split("/");

  return (
    <>
      <div className={"h-[100%] flex-row items-center flex  justify-center "}>
        <div
          className={`bg-primary h-[100vh]  max:w-[300px]  ${
            !isExpand ? "xl:w-[100px] w-[50px]" : "xl:w-[300px] w-[180px]"
          }`}
        >
          {/* title */}
          <div className="mx-2">
            <div className="mt-[50px]  pb-[10px] border-b border-white w-[100%] text-white text-center text-[30px]">
              DTE
            </div>
          </div>

          {/* expand button */}
          {/* <div className="w-[100%] flex justify-center mb-0 xl:mb-6 my-6">
            {!isExpand ? (
              <img
                onClick={() => {
                  setIsExpand(!isExpand);
                }}
                src="/humber.png"
                className="xl:w-[40px] xl:h-[40px] w-[20px] h-[20px] cursor-pointer"
                alt="humber"
              />
            ) : (
              <img
                onClick={() => {
                  setIsExpand(!isExpand);
                }}
                src="/close.png"
                className="xl:w-[40px] xl:h-[40px] w-[20px] h-[20px] cursor-pointer"
                alt="close"
              />
            )}
          </div> */}

          {/* side menu */}
          <div className="mt-8">
            {sideMenu.map((e: any, index: number) => {
              return (
                <>
                  {e.name == "border" ? (
                    <>
                      <div className="border-b h-[20px] mx-2 border-white" />
                      <div className="h-[20px]" />
                    </>
                  ) : (
                    <>
                      {" "}
                      <div
                        key={index}
                        onClick={() => {
                          setActive(index);
                          if (e.children) {
                            setOpen(!isOpen);
                          } else {
                            router.push(e.url);
                          }
                        }}
                        className={`flex xl:px-5 px-2 items-center cursor-pointer  my-2 w-[100%]  ${
                          !e.children
                            ? pathname === e.url
                              ? "bg-primary"
                              : ""
                            : getUrl?.[2] === e.url.split("/")[2]
                            ? "bg-primary"
                            : ""
                        }  ${
                          !isExpand
                            ? "justify-center xl:py-3 "
                            : "pl-6 xl:py-4 py-2"
                        } ${
                          pathname?.split("/")[1] == e.url.split("/")[1]
                            ? "bg-secondary"
                            : ""
                        }`}
                      >
                        <div className="w-[20px]">{e.icon}</div>
                        {isExpand ? (
                          <div className="px-3 text-white text-[14px] xl:text-[16px]">
                            {e.name}
                          </div>
                        ) : (
                          ""
                        )}
                        {e.children ? (
                          <KeyboardArrowDownIcon
                            className={
                              isExpand
                                ? "ml-[auto] text-white mr-4 w-[15px] "
                                : "w-[10px] text-white xl:w-[15px]"
                            }
                          />
                        ) : (
                          ""
                        )}
                      </div>
                      {/* open nested menu */}
                      {isOpen &&
                        isActive === index &&
                        isExpand &&
                        e.children &&
                        NestedMenu(e, router)}
                    </>
                  )}
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

// nested menu

const NestedMenu = (props: any, router: any) => {
  return (
    <>
      <div>
        {props.children.map((e: any, index: number) => {
          return (
            <>
              <div
                key={index}
                onClick={() => {
                  router.push(e.url);
                }}
                className="px-3 cursor-pointer  px-2 xl:py-3 my-1 xl:my-2 text-[8px] xl:text-[14px]"
              >
                <FiberManualRecordIcon className="xl:w-[20px] ml-4 mx-3 w-[10px]" />
                {e.name}
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

const sideMenu = [
  {
    name: "Dashboard",
    icon: <DashboardIcon className="xl:w-[20px] w-[15px] text-white" />,
    url: "/",
  },
  {
    name: "Field Officer",
    // icon: (
    //   // <img
    //     // src="/user.png"
    //     // alt="user"
    //     // className="xl:h-[20px] xl:w-[20px] h-[10px] w-[10px]"
    //   // />
    // ),
    url: "/field-officer",
  },
  {
    name: "Farmer",
    // icon: (
    //   // <img
    //     // src="/user.png"
    //     // alt="user"
    //     // className="xl:h-[20px] xl:w-[20px] h-[10px] w-[10px]"
    //   // />
    // ),
    url: "/farmer",
  },
  {
    name: "Staff Management",
    url: "/staff-management",
  },
  {
    name: "Crop Management",
    url: "/crop-management",
  },
  {
    name: "Survey",
    url: "/create-survey",
  },
  {
    name: "border",
    url: "/",
  },
  {
    name: "STP",
    url: "/stp",
  },
  {
    name: "Crop Monitoring",
    url: "/crop-monitoring",
  },
  {
    name: "New Regulation",
    url: "/new-regulation",
  },
];
