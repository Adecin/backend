import CustomButton from "@/components/customButton";
import SelectMenu from "@/components/inputComponents/selectMenu";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useState } from "react";
import { assignFarmer } from "@/redux/reducer/fieldOfficer/assignFarmer";
import { useDispatch, useSelector } from "react-redux";

const selectOptions = [{ id: 1, name: "Select by farmer Id" }];

const Options = [
  { id: 1, name: "Select by farmer Name" },
  { id: 2, name: "Select by farmer Id" }
];

export default function FarmerList(props: any) {
  const { onClose, data, fieldOfficerId } = props;
  // const [selectBy, setSelectBy] = useState(selectOptions[0]);
  const [dataType, setDataType] = useState('name');
  const [checkedItems, setCheckedItems] = useState(new Set());
  const dispatch = useDispatch();

  const handleCheckboxChange = (item: any) => {
    const updatedCheckedItems = new Set(checkedItems);

    if (updatedCheckedItems.has(item)) {
      updatedCheckedItems.delete(item);
    } else {
      updatedCheckedItems.add(item);
    }
    setCheckedItems(updatedCheckedItems);
  };

  const handleSaveClick = () => {
    const selectedData = data?.filter((item: any, index: any) => checkedItems.has(index));
    const selectedIds = selectedData.map((item: any) => item.id);
    console.log(selectedIds);
    const assignData = {
      technicianId: fieldOfficerId,
      farmerId: selectedIds
    }
    dispatch(assignFarmer(assignData))
    onClose();

  };

  console.log(data);
  console.log('fieldOfficerId', fieldOfficerId);

  return (
    <div className="">
      <div className="listHeader bg-primary flex w-full h-[4rem] rounded-b-[10px] p-[1.3rem] flex justify-between items-center">
        <div className="w-[70%] mt-4">
          <SelectMenu
            background="blue"
            fieldStyle={{
              background: "#3D7FFA",
              color: "white",
              fontSize: "1.1rem",
            }}
            value={(e: any) => { e.target.name }}
            name="farmer"
            handleChange={(e: any) => {
              e.target.value === 1 ?
                setDataType('name')
                :
                setDataType('id')
            }}
            placeHolderText="select by farmer name"
            data={Options}
          />
        </div>
        <div className="searchFarmer">
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.9778 26L14.8778 16.9C14.1556 17.4778 13.325 17.9352 12.3861 18.2722C11.4472 18.6093 10.4481 18.7778 9.38889 18.7778C6.76481 18.7778 4.54422 17.8687 2.72711 16.0507C0.91 14.2326 0.000962963 12.012 0 9.38889C0 6.76481 0.909037 4.54422 2.72711 2.72711C4.54519 0.91 6.76578 0.000962963 9.38889 0C12.013 0 14.2336 0.909037 16.0507 2.72711C17.8678 4.54519 18.7768 6.76578 18.7778 9.38889C18.7778 10.4481 18.6093 11.4472 18.2722 12.3861C17.9352 13.325 17.4778 14.1556 16.9 14.8778L26 23.9778L23.9778 26ZM9.38889 15.8889C11.1944 15.8889 12.7294 15.2567 13.9938 13.9923C15.2581 12.728 15.8899 11.1935 15.8889 9.38889C15.8889 7.58333 15.2567 6.04837 13.9923 4.784C12.728 3.51963 11.1935 2.88793 9.38889 2.88889C7.58333 2.88889 6.04837 3.52107 4.784 4.78544C3.51963 6.04982 2.88793 7.5843 2.88889 9.38889C2.88889 11.1944 3.52107 12.7294 4.78544 13.9938C6.04982 15.2581 7.5843 15.8899 9.38889 15.8889Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
      <div className="py-3 px-[2rem] m-[1rem]">
        <FormGroup>
          {data?.map((item: any, index: any) => {
            return (
              <FormControlLabel
                key={index}
                control={<Checkbox
                  checked={checkedItems.has(index)}
                  onChange={() => handleCheckboxChange(index)}
                />}
                label={dataType === 'name' ? item.name : item.farmerId}
              />
            );
          })}
        </FormGroup>
        <div className="flex justify-center gap-x-12 my-3">
          <CustomButton
            classes={`bg-[#BEBEBE] w-[107px]`}
            customStyle={{ background: "#BEBEBE" }}
            buttonName={`Cancel`}
            handleOnClick={onClose}
          />
          <CustomButton
            classes={` w-[107px]`}
            buttonName={`Save`}
            customStyle={{ background: "#3D7FFA" }}
            handleOnClick={handleSaveClick}
          />
        </div>
      </div>
    </div>
  );
}
