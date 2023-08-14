"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface Filter {
  onSearch: any;
  value: string;
  addUrl: string;
  filter: any;
  applyFilter: any;
}

const Filter = ({ onSearch, value, addUrl, filter, applyFilter }: Filter) => {
  const [openFilter, setOpenFilter] = useState(false);
  const router = useRouter();
  return (
    <>
      <div className="flex items-center my-3 px-3">
        {/* search bar */}
        <div className="rounded-[16px] flex items-center bg-gray-100 p-1">
          <input
            onChange={(e) => {
              onSearch(e.target.value);
            }}
            value={value}
            placeholder="Search here"
            className="w-[300px] bg-gray-100  px-3 py-2  outline-none"
          />
          <div className="px-3">
            <svg
              className="cursor-pointer"
              width="20"
              height="20"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.9778 26L14.8778 16.9C14.1556 17.4778 13.325 17.9352 12.3861 18.2722C11.4472 18.6093 10.4481 18.7778 9.38889 18.7778C6.76481 18.7778 4.54422 17.8687 2.72711 16.0507C0.91 14.2326 0.000962963 12.012 0 9.38889C0 6.76481 0.909037 4.54422 2.72711 2.72711C4.54519 0.91 6.76578 0.000962963 9.38889 0C12.013 0 14.2336 0.909037 16.0507 2.72711C17.8678 4.54519 18.7768 6.76578 18.7778 9.38889C18.7778 10.4481 18.6093 11.4472 18.2722 12.3861C17.9352 13.325 17.4778 14.1556 16.9 14.8778L26 23.9778L23.9778 26ZM9.38889 15.8889C11.1944 15.8889 12.7294 15.2567 13.9938 13.9923C15.2581 12.728 15.8899 11.1935 15.8889 9.38889C15.8889 7.58333 15.2567 6.04837 13.9923 4.784C12.728 3.51963 11.1935 2.88793 9.38889 2.88889C7.58333 2.88889 6.04837 3.52107 4.784 4.78544C3.51963 6.04982 2.88793 7.5843 2.88889 9.38889C2.88889 11.1944 3.52107 12.7294 4.78544 13.9938C6.04982 15.2581 7.5843 15.8899 9.38889 15.8889Z"
                fill="#3D7FFA"
              />
            </svg>
          </div>
        </div>
        {/* filter icon */}
        <div className="px-4">
          <svg
            onClick={() => {
              setOpenFilter(!openFilter);
            }}
            className="cursor-pointer"
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.2962 25H8.8421V12.3869L0 1.97021V0H24V1.95896L15.5789 12.3756V20.7618L11.2962 25ZM10.5263 23.3333H10.5986L13.8947 20.0715V11.791L22.0795 1.66667H1.94211L10.5263 11.7798V23.3333Z"
              fill="#3D7FFA"
            />
          </svg>
        </div>
        {/* popover */}
        {openFilter && (
          <div className="absolute z-[99] bg-[#F4F8FF] px-3 py-5 rounded-[10px] right-[30px]  top-[70px]">
            {filter ?? ""}
            <div className="ml-auto w-[100px] mr-[20px] ">
              <div
                onClick={() => {
                  setOpenFilter(false);
                  applyFilter(true);
                }}
                className="bg-primary rounded-[30px] justify-center cursor-pointer flex items-center px-4 py-2 text-white"
                style={{
                  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                }}
              >
                Apply
              </div>
            </div>
          </div>
        )}

        {/* add  */}
        <div className="px-2">
          <div
            onClick={() => {
              router.push(addUrl);
            }}
            className="bg-primary rounded-[30px] cursor-pointer flex items-center px-4 py-2 text-white"
            style={{
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            <div>
              <svg
                className="mx-2"
                width="21"
                height="17"
                viewBox="0 0 21 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.3636 10.625C10.815 10.625 5.72727 12.0381 5.72727 14.875V17H21V14.875C21 12.0381 15.9123 10.625 13.3636 10.625ZM4.77273 6.375V3.1875H2.86364V6.375H0V8.5H2.86364V11.6875H4.77273V8.5H7.63636V6.375M13.3636 8.5C14.3763 8.5 15.3474 8.05223 16.0635 7.2552C16.7795 6.45817 17.1818 5.37717 17.1818 4.25C17.1818 3.12283 16.7795 2.04183 16.0635 1.2448C15.3474 0.447766 14.3763 0 13.3636 0C12.351 0 11.3798 0.447766 10.6638 1.2448C9.94773 2.04183 9.54545 3.12283 9.54545 4.25C9.54545 5.37717 9.94773 6.45817 10.6638 7.2552C11.3798 8.05223 12.351 8.5 13.3636 8.5Z"
                  fill="white"
                />
              </svg>
            </div>
            add
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
