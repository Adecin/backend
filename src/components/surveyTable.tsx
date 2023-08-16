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
                            {keys.map((key: string, index: number) =>
                            (
                                <th className="py-5 pl-5 text-center" key={key}>
                                    <div
                                        className={`text-grey capitalize ${index === keys.length - 1 ? "" : "border-r-[3px]"
                                            } my-0`}
                                    >
                                        {key.split("_").join(" ")}
                                    </div>
                                </th>
                            )
                            )}
                            <th className="text-grey text-center">{`Download`}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y-[10px] divide-white">
                        {data.map((item: any, index: number) => (
                            <tr className="py-4" style={{
                                background: "#F4F8FF"
                            }} key={index}>
                                <td className="text-center py-5 pl-5 ">{index + 1}</td>
                                {keys.map((key) => (
                                    <td className="text-center py-5 pl-5 " key={key}>
                                        <div className="  ">
                                            <div className="text-text font-[500]">{item[key]}</div>
                                        </div>
                                    </td>
                                ))}
                                <td className="text-center py-5 pl-10" style={{ cursor: "pointer" }}>
                                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 27H27H1Z" fill="#3D7FFA" />
                                        <path d="M1 27H27" stroke="#3D7FFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M14 1H17.8519V9.66667H22.6667L14 22.6667M14 1H10.1482V9.66667H5.33337L14 22.6667" fill="#3D7FFA" />
                                        <path d="M14 1H17.8519V9.66667H22.6667L14 22.6667L5.33337 9.66667H10.1482V1H14Z" stroke="#3D7FFA" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
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
