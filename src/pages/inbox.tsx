import { ClassNames } from "@emotion/react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import { useEffect, useState } from "react";
import NotificationComponent from "@/components/inbox/notificationComponent";
import { useDispatch, useSelector } from "react-redux";
import { getNotficatioList } from "@/redux/reducer/notification/getNotificationList";

const Inbox = () => {
  const [activeTab, setActiveTab] = useState("messages");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();

  const ReadNotification = useSelector(
    (state: any) => state.ReadNotificationState
  );

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setIsDropdownOpen(false);
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleViewMore = () => {
    setActiveTab("notification");
    setIsDropdownOpen(false);
  };
  const NotificationData = useSelector(
    (store: any) => store.NotificationListState.response
  );

  const NotificationList = NotificationData.data;

  console.log(`NotificationList`, NotificationList);

  const filterCropType = (items: any) => {
    const unReadMsgs = items?.filter((item: any) => {
      if (item.isRead === false) {
        console.log(`filterItem`, item);
        return item;
      }
    });
    return unReadMsgs;
  };

  useEffect(() => {
    dispatch(getNotficatioList());
    filterCropType(NotificationList);
  }, [ReadNotification]);

  const twoItems = filterCropType(NotificationList)?.slice(0, 3);
  return (
    <div>
      <div className="flex justify-end mr-20 mt-10 mb-6">
        <div className="relative" onClick={toggleDropdown}>
          <NotificationsNoneIcon className="mr-4 cursor-pointer" />{" "}
          {NotificationList?.length > 0 && (
            <div className="absolute -top-2 right-1 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs cursor-pointer">
              {NotificationData?.UnreadNotificationCount}{" "}
            </div>
          )}
          {isDropdownOpen && (
            <div
              className="absolute top-8 right-0 mt-2 bg-white  border-gray-300 rounded-md shadow-md"
              style={{
                width: "300px",
                backgroundColor: "#f1f1f1",
              }}
            >
              <div className=" ">
                <div className=" mt-4  mb-3 ml-3  mr-3  flex justify-between">
                  <p className=" flex items-center ">Notifications</p>
                  <p className="text-red-600 text-sm cursor-pointer underline flex items-center justify-right">
                    Clear All
                  </p>
                </div>
                {twoItems.map((item: any, index: any) => (
                  <div
                    key={index}
                    className=" p-4 mr-3 ml-3 border-b-2 border-gray-200 justify-start items-center"
                    style={{
                      backgroundColor: "#f1f1f1",
                      display: "flex",
                    }}
                  >
                    <div className="flex items-center w-full justify-between">
                      <svg
                        width="38"
                        height="38"
                        viewBox="0 0 38 38"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="19" cy="19" r="19" fill="#3D7FFA" />
                        <path
                          d="M12.6709 14.0469L10.9414 24H9.25977L10.9893 14.0469H12.6709ZM15.8496 18.4014L15.6104 19.7617H11.2422L11.4814 18.4014H15.8496ZM17.1553 14.0469L16.916 15.4141H11.9941L12.2402 14.0469H17.1553ZM26.0516 18.7363L25.9832 19.2764C25.8921 19.9053 25.7234 20.5137 25.4773 21.1016C25.2358 21.6849 24.9168 22.209 24.5203 22.6738C24.1284 23.1341 23.659 23.4964 23.1121 23.7607C22.5652 24.0251 21.9432 24.1504 21.2459 24.1367C20.5805 24.123 20.02 23.9749 19.5643 23.6924C19.1085 23.4098 18.7508 23.0361 18.491 22.5713C18.2358 22.1064 18.0649 21.5915 17.9783 21.0264C17.8917 20.4567 17.8849 19.8802 17.9578 19.2969L18.033 18.7568C18.1242 18.1325 18.2928 17.5286 18.5389 16.9453C18.785 16.362 19.1062 15.8402 19.5027 15.3799C19.8992 14.915 20.3709 14.5505 20.9178 14.2861C21.4646 14.0218 22.0844 13.8965 22.7771 13.9102C23.4471 13.9238 24.0076 14.0719 24.4588 14.3545C24.9145 14.6325 25.27 15.0039 25.5252 15.4688C25.785 15.9336 25.9559 16.4486 26.0379 17.0137C26.1199 17.5788 26.1245 18.153 26.0516 18.7363ZM24.3016 19.2969L24.3768 18.7295C24.4178 18.3877 24.436 18.0231 24.4314 17.6357C24.4269 17.2438 24.3722 16.8747 24.2674 16.5283C24.1626 16.1774 23.9848 15.8903 23.7342 15.667C23.4881 15.4437 23.1372 15.3229 22.6814 15.3047C22.212 15.2865 21.8019 15.3799 21.451 15.585C21.1046 15.7855 20.813 16.0566 20.576 16.3984C20.339 16.7402 20.1499 17.1162 20.0086 17.5264C19.8719 17.9365 19.7762 18.3398 19.7215 18.7363L19.6463 19.3037C19.6007 19.641 19.5802 20.0055 19.5848 20.3975C19.5939 20.7894 19.6508 21.1608 19.7557 21.5117C19.8605 21.8626 20.0382 22.1543 20.2889 22.3867C20.5395 22.6146 20.8882 22.7354 21.3348 22.749C21.8133 22.7673 22.2257 22.6738 22.5721 22.4688C22.9184 22.2637 23.2101 21.9902 23.4471 21.6484C23.684 21.3066 23.8709 20.9307 24.0076 20.5205C24.1489 20.1104 24.2469 19.7025 24.3016 19.2969Z"
                          fill="white"
                        />
                      </svg>
                      {/* <div className="w-full h-full bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2 italic text-xs">
                        {item.title}
                      </div> */}
                      <div className="flex w-full items-center justify-between self-end ">
                        <div className="mr-7 ml-4 items-left">
                          <p className=" text-gray-600 text-sm  mb-1">
                            {item.name}
                          </p>
                          <p className="text-gray-500 text-xs mr ">
                            {item.createdDate?.split("T")[0]}
                          </p>
                        </div>
                        <div className="items-center text-center cursor-pointer text-blue-600 underline text-xs">
                          <p className="items-right">View</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}{" "}
              </div>
              <div className="flex justify-center">
                <button
                  className="mt-5  mb-5 text-sm items-center text-blue-600 cursor-pointer underline "
                  onClick={handleViewMore}
                >
                  View More
                </button>
              </div>
            </div>
          )}{" "}
        </div>

        <SettingsIcon className="mr-4 cursor-pointer" />
        <PersonOutlineIcon className="cursor-pointer" />
      </div>
      <div>
        <p
          className="ml-6"
          style={{
            color: "#43424D",
            fontWeight: 500,
            fontSize: "18px",
          }}
        >
          Inbox
        </p>
        <div className=" ml-3 mr-6 text-[18px] mt font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px gap-x-[3rem]">
            <li className="mr-2 cursor-pointer">
              <a
                className={`inline-block p-4  ${
                  activeTab === "notification"
                    ? " text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                    : "rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                }`}
                onClick={() => handleTabClick("notification")}
              >
                Notifications
              </a>
            </li>

            <li className="mr-2 cursor-pointer">
              <a
                className={`inline-block p-4  ${
                  activeTab === "messages"
                    ? " text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                    : "rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                }`}
                onClick={() => handleTabClick("messages")}
              >
                Messages
              </a>
            </li>
          </ul>
        </div>
        {activeTab === "notification" && (
          <NotificationComponent items={filterCropType(NotificationList)} />
        )}{" "}
      </div>
    </div>
  );
};
export default Inbox;
