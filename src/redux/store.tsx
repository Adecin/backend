import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "@/redux/baseapi";

// stores
import ListFormer from "./reducer/farmer/list-former";
import listOneFarmer from "./reducer/farmer/list-one-farmer";
import listFarm from "./reducer/farmer/list-farm";

// dropdown
import ListState from "./reducer/dropdown/get-state";
import ListDistrict from "./reducer/dropdown/get-district";
import ListVillage from "./reducer/dropdown/get-village";

//fieldOfficer
import ListFieldOfficerData from "./reducer/fieldOfficer/getList";
import OneFieldOfficerData from "./reducer/fieldOfficer/getOne";
import AddFieldOfficerData from "./reducer/fieldOfficer/addFieldOfficer";

// crop
import ListCrop from "./reducer/crop/get-all-crop";

// farmer
import AddFarmer from "./reducer/farmer/add-farmer";

export const store = configureStore({
  reducer: {
    ListFormer: ListFormer,
    listOneFarmer: listOneFarmer,
    listFarm: listFarm,
    // common data
    ListState: ListState,
    ListDistrict: ListDistrict,
    ListVillage: ListVillage,
    // crop
    ListCrop: ListCrop,
    //  farmer
    AddFarmer: AddFarmer,
    //fieldOfficer
    ListFieldOfficerData:ListFieldOfficerData,
    OneFieldOfficerData:OneFieldOfficerData,
    AddFieldOfficerData:AddFieldOfficerData,
    
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware: any) => {
    return getDefaultMiddleware({ serializableCheck: false }).concat(
      baseApi.middleware
    );
  },
});

export const { dispatch } = store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
