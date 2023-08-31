import Checkbox from "@mui/material/Checkbox";

// type declaration
interface propsData {
  data: any;
  onClick?: any;
}

const SurveyTable = ({ data, onClick }: propsData) => {
  const keys = Object.keys(data[0]);
  return (
    <>
      <div className="w-full p-3 mb-[50px] ">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-grey capitalize text-center my-0 pl-5">{`No.`}</th>
              {keys.map((key: string, index: number) => (
                <th className="py-5 pl-5 text-center" key={key}>
                  <div
                    className={`text-grey capitalize ${
                      index === keys.length - 1 ? "" : "border-r-[3px]"
                    } my-0`}
                  >
                    {key.split("_").join(" ")}
                  </div>
                </th>
              ))}
              <th className="text-grey text-center">{``}</th>
            </tr>
          </thead>
          <tbody className="divide-y-[10px] divide-white">
            {data.map((item: any, index: number) => (
              <tr
                className="py-4"
                style={{
                  background: "#F4F8FF",
                }}
                key={index}
              >
                <td className="text-center py-5 pl-5 ">{index + 1}</td>
                {keys.map((key) => (
                  <td className="text-center py-5 pl-5 " key={key}>
                    <div className="  ">
                      <div className="text-text font-[500]">{item[key]}</div>
                    </div>
                  </td>
                ))}
                <td
                  className="text-center py-5 pl-10 pr-10 underline text-primary"
                  style={{ cursor: "pointer" }}
                >
                  view
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SurveyTable;
