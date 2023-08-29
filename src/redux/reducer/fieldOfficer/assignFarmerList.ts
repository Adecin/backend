import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// utils
import { axios } from "@/redux/api";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

//toast
const FAILED = async (data: string) => {
  toast.error(data, {
      position: toast.POSITION.TOP_RIGHT,
  });
};

const SUCCESS = async (data: string) => {
  toast.success(data, {
      position: toast.POSITION.TOP_RIGHT,
  });
};

// api call
export const assignFarmerList: any = createAsyncThunk(
  "assignFarmerList/List",
  async (value: any, { rejectWithValue }) => {
    try {
      const data: any = await axios.get(
        `api/farmer/assignList` + (value ? value : ""),
        {
          withCredentials: true,
        }
      );

      if (data.data.status) {
        return data;
      } else {
        return rejectWithValue(data);
      }
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

// Village

const AssignFarmerListData: any = createSlice({
  name: "AssignFarmerListData",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    response: [],
  },
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(assignFarmerList.pending, (Village: any, { payload }: any) => {
      Village.isLoading = true;
    });
    builder.addCase(assignFarmerList.fulfilled, (Village: any, { payload }: any) => {
      Village.isLoading = false;
      Village.response = payload.data?.data;
      Village.Message = payload.data.message;
      Village.isSuccess = true;
    });

    builder.addCase(assignFarmerList.rejected, (Village: any, { payload }: any) => {
      Village.isLoading = false;
      Village.isSuccess = false;
      Village.isError = true;
      Village.Message = payload.data ? payload.data.message : payload.message;
    });
  },
});

// Reducer
export default AssignFarmerListData.reducer;
