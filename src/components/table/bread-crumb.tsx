"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const BreadCrumb = ({
  lastName,
  classes,
}: {
  lastName?: string;
  classes?: any;
}) => {
  const [pathName, setPathName] = useState([]);
  const router: any = useRouter();
  useEffect(() => {
    const path: any = window.location.pathname;
    setPathName(path.split("/"));
  }, []);
  const filterPath: any = [...pathName];
  if (lastName) {
    filterPath.splice(pathName.length - 1, 1);
    filterPath.push(lastName);
  }

  return (
    <>
      <div className="py-5 px-4 bg-white">
        <div className="flex items-center">
          {filterPath?.map((breadCrumb: any, index: number) => {
            console.log(`breadCrumb`, breadCrumb);
            return (
              <>
                <div
                  key={index}
                  onClick={() => {
                    const getRoutingPath = pathName
                      .splice(0, index + 1)
                      .join("/");
                    router.push(getRoutingPath);
                  }}
                  className={
                    `text-[18px] text-red cursor-pointer capitalize font-semibold hover:underline ` +
                    classes
                  }
                >
                  <span className={`hover:text-[#3D7FFA]`}>
                    {breadCrumb.split("-").join(" ")}
                  </span>
                </div>
                <div className={`text-[18px] text-text hover:text-[#3D7FFA]`}>
                  {pathName.length - 1 === index || index === 0 ? (
                    ""
                  ) : (
                    <span className="hover:text-[#3D7FFA]">
                      <span>&nbsp;</span> {">"} <span>&nbsp;</span>{" "}
                    </span>
                  )}
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default BreadCrumb;
