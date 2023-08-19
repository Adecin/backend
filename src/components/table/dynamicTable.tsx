import Checkbox from "@mui/material/Checkbox";

// type declaration
interface propsData {
  data: any;
  onClick?: any;
  backgroundColor?: string;
  classes?:any;
}

const DynamicTable = ({ data, onClick, backgroundColor,classes }: propsData) => {
  if (!data || data.length === 0) {
    return (
      <>
        <div>No Data Found</div>
      </>
    );
  }

  const keys = Object.keys(data[0]);
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
                className={`bg-${backgroundColor ?? "gray-100"}  py-4`}
                key={index}
              >
                {keys.map((key) => (
                  <td className={` py-1 pl-5` + classes}  key={key}>
                    <div className="  ">
                      <div className="text-text flex justify-center font-[500]">{item[key]}</div>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DynamicTable;
