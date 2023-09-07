import { Checkbox } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readNotification } from "@/redux/reducer/notification/readNotification";

interface NotificationItem {
  id: number;
  title: string;
  name: string;
  activity: string;
  description: string;
  createdDate: string;
}

const NotificationComponent = ({ items }: { items: NotificationItem[] }) => {
  const dispatch = useDispatch();

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  console.log(`recieved`, items.length);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      const allItemIds = items.map((item) => item.id);
      setSelectedItems(allItemIds);
    }
    setSelectAll(!selectAll);
  };
  const handleItemSelect = (itemId: number) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };
  const isItemSelected = (itemId: number) => selectedItems.includes(itemId);

  console.log(`selectedIt ems`, selectedItems);

  const handleReadOneNotification = (value: any) => {
    dispatch(readNotification({ id: value }));
  };

  const handleReadAllNotification = () => {
    dispatch(readNotification());
  };

  return (
    <div className="space-y-4 mb-5">
      <div className="flex mt-5 ml-10 items-center">
        <Checkbox
          //color="blue"
          checked={selectAll}
          onChange={handleSelectAll}
        />
        <div
          className="flex justify-between mr-[3rem]"
          style={{ width: "80%" }}
        >
          <p className="ml-2 text-gray-600 font-semibold  items-center">All</p>
          <p
            className="text-red-600 text-sm cursor-pointer underline flex items-center "
            onClick={(e: any) => {
              handleReadAllNotification();
            }}
          >
            {`Read All ( ${items.length} )`}
          </p>
        </div>
      </div>

      {/* .filter((item:any)=> if(item?isRead == false){
        return item
      }) */}
      {items?.map((item) => (
        <div key={item.id} className="flex mt-5  ml-10 mb-20">
          <div style={{ display: "flex", alignItems: "center" }}>
            <Checkbox
              className=""
              //color="blue"
              checked={isItemSelected(item.id)}
              onChange={() => handleItemSelect(item.id)}
            />
          </div>
          <div
            onClick={(e: any) => {
              handleReadOneNotification(item.id);
            }}
            className="p-4 border border-gray-200 rounded-md center items-center ml-4"
            style={{
              width: "936px",
              height: "106px",
              top: "333px",
              left: "350px",
              backgroundColor: "#f1f1f1",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div className="flex items-center">
              <svg
                width="46"
                height="46"
                viewBox="0 0 46 46"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="23" cy="23" r="23" fill="#3D7FFA" />
                <path
                  d="M17.6709 18.0469L15.9414 28H14.2598L15.9893 18.0469H17.6709ZM20.8496 22.4014L20.6104 23.7617H16.2422L16.4814 22.4014H20.8496ZM22.1553 18.0469L21.916 19.4141H16.9941L17.2402 18.0469H22.1553ZM31.0516 22.7363L30.9832 23.2764C30.8921 23.9053 30.7234 24.5137 30.4773 25.1016C30.2358 25.6849 29.9168 26.209 29.5203 26.6738C29.1284 27.1341 28.659 27.4964 28.1121 27.7607C27.5652 28.0251 26.9432 28.1504 26.2459 28.1367C25.5805 28.123 25.02 27.9749 24.5643 27.6924C24.1085 27.4098 23.7508 27.0361 23.491 26.5713C23.2358 26.1064 23.0649 25.5915 22.9783 25.0264C22.8917 24.4567 22.8849 23.8802 22.9578 23.2969L23.033 22.7568C23.1242 22.1325 23.2928 21.5286 23.5389 20.9453C23.785 20.362 24.1062 19.8402 24.5027 19.3799C24.8992 18.915 25.3709 18.5505 25.9178 18.2861C26.4646 18.0218 27.0844 17.8965 27.7771 17.9102C28.4471 17.9238 29.0076 18.0719 29.4588 18.3545C29.9145 18.6325 30.27 19.0039 30.5252 19.4688C30.785 19.9336 30.9559 20.4486 31.0379 21.0137C31.1199 21.5788 31.1245 22.153 31.0516 22.7363ZM29.3016 23.2969L29.3768 22.7295C29.4178 22.3877 29.436 22.0231 29.4314 21.6357C29.4269 21.2438 29.3722 20.8747 29.2674 20.5283C29.1626 20.1774 28.9848 19.8903 28.7342 19.667C28.4881 19.4437 28.1372 19.3229 27.6814 19.3047C27.212 19.2865 26.8019 19.3799 26.451 19.585C26.1046 19.7855 25.813 20.0566 25.576 20.3984C25.339 20.7402 25.1499 21.1162 25.0086 21.5264C24.8719 21.9365 24.7762 22.3398 24.7215 22.7363L24.6463 23.3037C24.6007 23.641 24.5802 24.0055 24.5848 24.3975C24.5939 24.7894 24.6508 25.1608 24.7557 25.5117C24.8605 25.8626 25.0382 26.1543 25.2889 26.3867C25.5395 26.6146 25.8882 26.7354 26.3348 26.749C26.8133 26.7673 27.2257 26.6738 27.5721 26.4688C27.9184 26.2637 28.2101 25.9902 28.4471 25.6484C28.684 25.3066 28.8709 24.9307 29.0076 24.5205C29.1489 24.1104 29.2469 23.7025 29.3016 23.2969Z"
                  fill="white"
                />
              </svg>

              {/* <p className="bg-blue-500 text-white rounded-full w-10 h-10 flex text-center items-center justify-center mr-2 italic text-[16px]">
                {item.title}
              </p> */}
              <div className="ml-10">
                <p className=" text-gray-600 text-[16px] font-semibold mb-2">
                  {item.name}
                </p>

                <p className="text-blue-500 text-[16px] mt-auto">
                  {item.description}
                </p>
              </div>
            </div>
            <div>
              <p className="text-gray-500 text-xs mr-10">
                {item?.createdDate?.split("T")[0]}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default NotificationComponent;
