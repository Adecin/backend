"use client"

import { EB_Garamond } from "next/font/google";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import Image from "next/image";

const garamond = EB_Garamond({ weight: "700", subsets: ["latin"] });
export default function Heder() {
  return (
    <>
      <div
        className={
          "xl:h-[90px] h-[55px] bg-[#212245] items-center flex justify-between px-10"
        }
      >
        <div
          className="text-[20-px] xl:text-[24px]"
          style={{
            fontFamily: garamond.style.fontFamily,
          }}
        >
          Nova Admin
        </div>

        <div className="flex items-center h-[100%]">
          <div className="px-5">
            <Image
              src="/light.png"
              alt="light"
              width={100}
              height={100}
              className="xl:h-[30px] xl:w-[30px] h-[20px] w-[20px]"
              priority
            />
          </div>
          <div className="px-5">
            <Image
              src="/notification.png"
              alt="notification"
              width={100}
              height={100}
              className="xl:h-[30px] xl:w-[30px] h-[20px] w-[20px]"
              priority
            />
          </div>
          <div className="px-5 flex items-center">
            <Image
              src="/avatar.png"
              alt="notification"
              width={100}
              height={100}
              className="xl:h-[50px] xl:w-[50px] h-[30px] w-[30px]"
              priority
            />
            <div className="px-4 text-[8px] xl:text-[14px]">vijay prasath</div>
            <div>
              <KeyboardArrowDownIcon className="w-[15px]" />
            </div>
          </div>          
        </div>
      </div>
    </>
  );
}



