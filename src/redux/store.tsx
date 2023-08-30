import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "@/redux/baseapi";
import UserLogin from "./reducer/login/login";
// stores

// dropdown
import ListState from "./reducer/dropdown/get-state";
import ListDistrict from "./reducer/dropdown/get-district";
import ListVillage from "./reducer/dropdown/get-village";

//fieldOfficer
import ListFieldOfficerData from "./reducer/fieldOfficer/getList";
import OneFieldOfficerData from "./reducer/fieldOfficer/getOne";
import AddFieldOfficerData from "./reducer/fieldOfficer/addFieldOfficer";
import UpdateFieldOfficerData from "./reducer/fieldOfficer/updateFieldOfficer";

// crop
import ListCrop from "./reducer/crop/get-all-crop";
import AddCrop from "./reducer/crop/add-croptype";
import UpdateCrop from "./reducer/crop/update-crop";

// farmer
import AddFarmer from "./reducer/farmer/add-farmer";
import AddFarm from "./reducer/farmer/add-farm";
import ListFormer from "./reducer/farmer/list-former";
import listOneFarmer from "./reducer/farmer/list-one-farmer";
import listFarm from "./reducer/farmer/list-farm";
import EditFarmer from "./reducer/farmer/edit-farmer";
import UnassignFarmerListData from "./reducer/fieldOfficer/unassignFarmerList";
import AssignFarmerData from "./reducer/fieldOfficer/addFieldOfficer";
import AssignFarmerListData from "./reducer/fieldOfficer/assignFarmerList";
import EditFarm from "./reducer/farmer/edit-farm";
import ApproveFarmerData from "./reducer/farmer/approve-farmer";
import AssignedFarmersCountData from "./reducer/fieldOfficer/assignFarmersCounts";
import updateAssignFarmerData from "./reducer/fieldOfficer/updateAssignFarmer";
//regulation
import AddNewRegulation from "./reducer/regulation/add-regulation";
import ListAllRegulation from "./reducer/regulation/listAllRegulation";
import ListRegulationOne from "./reducer/regulation/list-one-regulation";
import ListAllPillar from "./reducer/regulation/list-pillar";
import listQuestion from "./reducer/regulation/list-question";
import UpdateQuestion from "./reducer/regulation/update-question";
import AddQuestion from "./reducer/regulation/add-question";
import DeleteQuestion from "./reducer/regulation/delete-question";
import EditRegulation from "./reducer/regulation/edit-regulation";

//survey
import AddNewSurvey from "./reducer/survey/add-survey";

//user
import AddUserState from "./reducer/user/addStaff";
import UpdateUserState from "./reducer/user/updateUser";
import OneUserState from "./reducer/user/getOneUser";

export const store = configureStore({
  reducer: {
    // common data
    ListState: ListState,
    ListDistrict: ListDistrict,
    ListVillage: ListVillage,
    UserLogin: UserLogin,

    // crop
    ListCrop: ListCrop,
    AddCrop: AddCrop,
    UpdateCrop: UpdateCrop,
    //  farmer
    AddFarmer: AddFarmer,
    AddFarm: AddFarm,
    ListFormer: ListFormer,
    listOneFarmer: listOneFarmer,
    listFarm: listFarm,
    EditFarmer: EditFarmer,
    EditFarm: EditFarm,
    //fieldOfficer
    ListFieldOfficerData: ListFieldOfficerData,
    OneFieldOfficerData: OneFieldOfficerData,
    AddFieldOfficerData: AddFieldOfficerData,
    UpdateFieldOfficerData: UpdateFieldOfficerData,
    UnassignFarmerListData: UnassignFarmerListData,
    AssignFarmerData: AssignFarmerData,
    AssignFarmerListData: AssignFarmerListData,
    ApproveFarmerData: ApproveFarmerData,
    AssignedFarmersCountData: AssignedFarmersCountData,
    updateAssignFarmerData: updateAssignFarmerData,
    //regulation
    AddNewRegulation: AddNewRegulation,
    EditRegulation: EditRegulation,
    ListAllRegulation: ListAllRegulation,
    ListRegulationOne: ListRegulationOne,
    ListAllPillar: ListAllPillar,
    listQuestion: listQuestion,
    UpdateQuestion: UpdateQuestion,
    AddQuestion: AddQuestion,
    DeleteQuestion: DeleteQuestion,
    //survey
    AddNewSurvey: AddNewSurvey,
    //user
    AddUserState: AddUserState,
    UpdateUserState: UpdateUserState,
    OneUserState: OneUserState,

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
