"use client";

import { EB_Garamond } from "next/font/google";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Image from "next/image";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { listAllRegulation } from "@/redux/reducer/regulation/listAllRegulation";
import { listAllSurvey } from "@/redux/reducer/survey/getSurveyList";

const garamond = EB_Garamond({ weight: "700", subsets: ["latin"] });
export default function Sidebar() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const [isExpand, setIsExpand] = useState(true);
  const [isActive, setActive] = useState(0);
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();
  const getUrl = pathname?.split("/");

  // datas
  const regulationList = useSelector((state: any) => state.ListAllRegulation);
  const AddNewRegulation = useSelector((state: any) => state.AddNewRegulation);

  const SurveyList = useSelector((state: any) => state.ListAllSurvey);
  const AddNewSurvey = useSelector((state: any) => state.AddNewSurvey);

  // useEffect
  useEffect(() => {
    dispatch(listAllRegulation());
    dispatch(listAllSurvey());
  }, [AddNewRegulation, AddNewSurvey]);

  return (
    <>
      <div className={"h-[100%] flex-row items-center flex  justify-center "}>
        <div
          style={{ overflow: "auto", scrollbarWidth: "none" }}
          className={`bg-primary h-[100vh] max:w-[300px]  ${
            !isExpand ? "xl:w-[100px] w-[50px]" : "xl:w-[300px] w-[180px]"
          }`}
        >
          {/* title */}
          <div className="mx-2">
            <div className="mt-[20px] pb-[10px] border-b border-white w-[100%] text-white text-center text-[30px]">
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
          <div className="mt-4">
            {sideMenu.map((e: any, index: number) => {
              return (
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
                        : "pl-6 xl:py-3 py-2"
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
                </>
              );
            })}
            <section>
              <div className="border-b h-[20px] mx-2 border-white" />
              <div className="h-[20px]" />
            </section>
            <div
              onClick={() => {
                router.push("/create-survey");
              }}
              className={`flex xl:px-5  px-2 items-center cursor-pointer  my-2 w-[100%]  ${
                pathname === "/create-survey" ? "bg-primary" : ""
              }  ${
                !isExpand ? "justify-center xl:py-3 " : "pl-6 xl:py-3 py-2"
              } ${
                pathname?.split("/")[1] == "/create-survey".split("/")[1]
                  ? "bg-secondary"
                  : ""
              }`}
            >
              {/* <div className="w-[20px]">{e.icon ?? ""}</div> */}

              <div className="flex gap-x-4 items-center px-3 ml-5 text-white text-[14px] xl:text-[16px]">
                <svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 10.7778V15.2222C16 15.6937 15.8127 16.1459 15.4793 16.4793C15.1459 16.8127 14.6937 17 14.2222 17H1.77778C1.30628 17 0.854097 16.8127 0.520699 16.4793C0.187301 16.1459 0 15.6937 0 15.2222V2.77778C0 2.30628 0.187301 1.8541 0.520699 1.5207C0.854097 1.1873 1.30628 1 1.77778 1H6.22222V2.77778H1.77778V15.2222H14.2222V10.7778H16Z"
                    fill="white"
                  />
                  <path
                    d="M16 4.4H11.6V0H9.4V4.4H5V6.6H9.4V11H11.6V6.6H16V4.4Z"
                    fill="white"
                  />
                </svg>
                <span>{`Create Survey`}</span>
              </div>
            </div>
            {SurveyList.isSuccess &&
              SurveyList.response.map((e: any, index: number) => {
                const url = "/survey/" + e.id;

                console.log(url, pathname);
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
                              router.push(url);
                            }
                          }}
                          className={`flex xl:px-5 px-2 items-center cursor-pointer  my-2 w-[100%]  ${
                            pathname === url ? "bg-primary" : ""
                          }  ${
                            !isExpand
                              ? "justify-center xl:py-3 "
                              : "pl-6 xl:py-3 py-2"
                          } ${pathname == url ? "bg-secondary" : ""}`}
                        >
                          <div className="w-[20px]">{e.icon ?? ""}</div>
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
            <section>
              <div className="border-b h-[20px] mx-2 border-white" />
              <div className="h-[20px]" />
            </section>
            {regulationList.isSuccess &&
              regulationList.response.map((e: any, index: number) => {
                const url = "/regulation/" + e.id;

                console.log(url, pathname);
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
                              router.push(url);
                            }
                          }}
                          className={`flex xl:px-5 px-2 items-center cursor-pointer  my-2 w-[100%]  ${
                            pathname === url ? "bg-primary" : ""
                          }  ${
                            !isExpand
                              ? "justify-center xl:py-3 "
                              : "pl-6 xl:py-3 py-2"
                          } ${pathname == url ? "bg-secondary" : ""}`}
                        >
                          <div className="w-[20px]">{e.icon ?? ""}</div>
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

            {/* new regulation */}
            <div
              onClick={() => {
                router.push("/new-regulation");
              }}
              className={`flex xl:px-5  px-2 items-center cursor-pointer  my-2 w-[100%]  ${
                pathname === "/new-regulation" ? "bg-primary" : ""
              }  ${
                !isExpand ? "justify-center xl:py-3 " : "pl-6 xl:py-3 py-2"
              } ${
                pathname?.split("/")[1] == "/new-regulation".split("/")[1]
                  ? "bg-secondary"
                  : ""
              }`}
            >
              {/* <div className="w-[20px]">{e.icon ?? ""}</div> */}

              <div className="flex gap-x-3 items-center px-3 ml-5 text-white text-[14px] xl:text-[16px]">
                <svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 10.7778V15.2222C16 15.6937 15.8127 16.1459 15.4793 16.4793C15.1459 16.8127 14.6937 17 14.2222 17H1.77778C1.30628 17 0.854097 16.8127 0.520699 16.4793C0.187301 16.1459 0 15.6937 0 15.2222V2.77778C0 2.30628 0.187301 1.8541 0.520699 1.5207C0.854097 1.1873 1.30628 1 1.77778 1H6.22222V2.77778H1.77778V15.2222H14.2222V10.7778H16Z"
                    fill="white"
                  />
                  <path
                    d="M16 4.4H11.6V0H9.4V4.4H5V6.6H9.4V11H11.6V6.6H16V4.4Z"
                    fill="white"
                  />
                </svg>
                <span>{`New Regulation`}</span>{" "}
              </div>
            </div>
            {/* inbox */}
            <>
              <div className="border-b h-[20px] mx-2 border-white" />
              <div className="h-[20px]" />
            </>
            <div
              onClick={() => {
                router.push("/inbox");
              }}
              className={`flex xl:px-5  px-2 items-center cursor-pointer  my-2 w-[100%]  ${
                pathname === "/inbox" ? "bg-primary" : ""
              }  ${
                !isExpand ? "justify-center xl:py-3 " : "pl-6 xl:py-3 py-2"
              } ${
                pathname?.split("/")[1] == "/inbox".split("/")[1]
                  ? "bg-secondary"
                  : ""
              }`}
            >
              {/* <div className="w-[20px]">{e.icon ?? ""}</div> */}

              <div className="px-3 ml-5 text-white text-[14px] xl:text-[16px]">
                Inbox
              </div>
            </div>
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
    name: "Village Management",
    url: "/village-management",
  },
  // {
  //   name: "border",
  //   url: "/",
  // },
  // {
  //   name: "STP",
  //   url: "/regulation",
  // },
  // {
  //   name: "Crop Monitoring",
  //   url: "/crop-monitoring",
  // },
];
