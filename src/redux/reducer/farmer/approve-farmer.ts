import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// utils
import { axios } from "@/redux/api";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// api call
const FAILED = async (data: string) => {
  toast.error(data, {
      position: toast.POSITION.TOP_RIGHT,
  });
};

const SUCCESS = async (data: string) => {
  toast.success(data, {
      position: toast.POSITION.BOTTOM_RIGHT,
  });
};


export const approveFarmer: any = createAsyncThunk(
  "approveFarmer/Farmer",
  async (value: any, { rejectWithValue }) => {
    try {
      const data: any = await axios.put(`api/farmer/approve`, value, {
        withCredentials: true,
      });

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

// state

const ApproveFarmerData: any = createSlice({
  name: "ApproveFarmerData",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    response: {},
  },
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(approveFarmer.pending, (state: any, { payload }: any) => {
      state.isLoading = true;
    });
    builder.addCase(approveFarmer.fulfilled, (state: any, { payload }: any) => {
      state.isLoading = false;
      state.response = payload.data?.data;
      state.Message = payload.data.message;
      state.isSuccess = true;
      SUCCESS(payload?.data?.message);
    });

    builder.addCase(approveFarmer.rejected, (state: any, { payload }: any) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.Message = payload.data ? payload.data.message : payload.message;
      FAILED(state.Message);
    });
  },
});

// Reducer
export default ApproveFarmerData.reducer;
