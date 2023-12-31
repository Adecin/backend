import Checkbox from "@mui/material/Checkbox";
import { TablePagination } from "@mui/material";
import { useState } from "react";

// type declaration
interface propsData {
  data: any;
  onClick?: any;
  backgroundColor?: string;
  classes?: any;
  count?: any;
  paginateData?: any;
  clearPage?: any;
}

const DynamicTable = ({
  data,
  onClick,
  backgroundColor,
  classes,
  count,
  paginateData,
  clearPage,
}: propsData) => {
  const [paginateDatas, setData] = useState({
    page: 0,
    limit: 10,
  });
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  if (!data || data.length === 0) {
    return (
      <>
        <div className="w-full text-center text-[18px font-bold]">
          No Data Found
        </div>
      </>
    );
  }
  const keys = Object.keys(data[0]);

  const handleChangePage = (event: any, newPage: any) => {
    //console.log(`page change`, newPage);
    //console.log(`rowsPerPage`, rowsPerPage);
    setPage(newPage);
    paginateData({
      page: newPage,
      rowsPerPage: rowsPerPage,
    });
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    paginateData({
      page: 0,
      rowsPerPage: event.target.value,
    });
  };

  return (
    <>
      <div className="w-full p-3 mb-[50px] ">
        <table className="w-full">
          <thead>
            <tr>
              {keys.map((key: string, index: number) =>
                key == "checkBox" ? (
                  <th className="py-5 pl-5 text-start" key={key}>
                    <div
                      className={`text-grey capitalize text-center ${
                        index === keys.length - 1 ? "" : "border-r-[3px]"
                      } my-0`}
                    >
                      <Checkbox
                        onChange={(e: any) => {
                          onClick(e.target.checked);
                        }}
                      />
                      All
                    </div>
                  </th>
                ) : (
                  <th className="py-5 pl-5 text-start" key={key}>
                    <div
                      className={`text-grey capitalize text-center ${
                        index === keys.length - 1 ? "" : "border-r-[3px]"
                      } my-0`}
                    >
                      {key.split("_").join(" ")}
                    </div>
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y-[10px] divide-white">
            {data.map((item: any, index: number) => (
              <tr
                className={`bg-${
                  backgroundColor ?? "gray-100"
                }  py-4 hover:bg-[#d2d2d2d9]`}
                key={index}
              >
                {keys.map((key) => (
                  <td className={` py-3 pl-5 ` + classes} key={key}>
                    <div className="  ">
                      <div className="text-text flex justify-center font-[500]">
                        {item[key]}
                      </div>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
};

export default DynamicTable;
