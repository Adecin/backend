import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// utils
import { axios } from "@/redux/api";

// api call
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
      window.alert(payload.data.message)
    });

    builder.addCase(approveFarmer.rejected, (state: any, { payload }: any) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.Message = payload.data ? payload.data.message : payload.message;
    });
  },
});

// Reducer
export default ApproveFarmerData.reducer;
