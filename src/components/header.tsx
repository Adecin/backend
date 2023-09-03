import { Badge, Dialog } from "@mui/material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useEffect, useState } from "react";
import LogoutPop from "./confirmLogout";
import CustomButton from "./customButton";
import PopCloseIcon from "./popcloseIcons";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const Header = (props: any) => {
  const {} = props;
  const [logOutPop, setLogOutPop] = useState(false);
  const router = useRouter();

  //const token = localStorage.getItem("token");
  const [token, setToken] = useState<string | null>("");
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const getUser = () => {
    if (token) {
      return jwtDecode(token);
    }
  };

  const userDetails: any = getUser();

  const SUCCESS = async (data: string) => {
    toast.success(data, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const handleLogOutPop = () => {
    localStorage.removeItem("token");
    setToken("");
    setLogOutPop(false);
    SUCCESS(`Successfully Logged Out`);
  };
  console.log(`token outer`, token);

  useEffect(() => {
    if (counter == 2) {
      if (token == "" || null || undefined) {
        console.log(`token false`, token);
        router.push("/login");
      }
    }
    setCounter(counter + 1);
  }, [token]);

  return (
    <>
      <div className="flex justify-end px-8 m-3 text-primary gap-x-8">
        <Badge badgeContent={2} color="error" className="px-2">
          <NotificationsNoneIcon className="text-primary text-[28px]" />
        </Badge>
        <div className="px-2">{userDetails?.data.name ?? ""}</div>
        {/*<div className="px-2">
          {userDetails?.name ? (
            <div className="text-primary ">
              <span>{userDetails?.name}</span>
              <img
                src={userDetails?.profileImage}
                alt={"alt"}
                style={{
                  height: "30px",
                  width: "30px",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
              />
            </div>
          ) : (
            <AccountCircleIcon />
          )}
        </div> */}
        <div
          className="flex gap-x-2 cursor-pointer"
          onClick={() => {
            setLogOutPop(true);
          }}
        >
          <LogoutOutlinedIcon />
        </div>
      </div>
      <Dialog open={logOutPop} fullWidth={true} maxWidth={"xs"}>
        <svg
          onClick={() => {
            setLogOutPop(false);
          }}
          className="cursor-pointer flex self-end mx-3 my-2"
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

        <div className="flex flex-col m-auto mb-4 gap-y-4 items-center">
          <p
            style={{
              textAlign: "center",
              fontSize: "14px",
            }}
          >{`Do you want to log out the application`}</p>
          <div className="flex gap-x-12">
            <CustomButton
              style={{
                fontWeight: "600",
                height: "30px",
                fontSize: "10px",
                width: "3rem",
              }}
              buttonName="OK"
              handleOnClick={() => {
                handleLogOutPop();
              }}
            />
            <CustomButton
              style={{
                fontWeight: "600",
                height: "30px",
                fontSize: "10px",
                width: "3rem",
              }}
              buttonName="Cancel"
              handleOnClick={() => {
                setLogOutPop(false);
              }}
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Header;
