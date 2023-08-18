import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// utils
import { axios } from "@/redux/api";

// api call
export const unassignFarmerList: any = createAsyncThunk(
  "unassignFarmer/List",
  async (value: any, { rejectWithValue }) => {
    try {
      const data: any = await axios.get(
        `api/farmer/unassignList` + (value ? value : ""),
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

const UnassignFarmerListData: any = createSlice({
  name: "UnassignFarmerListData",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    response: {},
  },
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(unassignFarmerList.pending, (Village: any, { payload }: any) => {
      Village.isLoading = true;
    });
    builder.addCase(unassignFarmerList.fulfilled, (Village: any, { payload }: any) => {
      Village.isLoading = false;
      Village.response = payload.data?.data;
      Village.Message = payload.data.message;
      Village.isSuccess = true;
    });

    builder.addCase(unassignFarmerList.rejected, (Village: any, { payload }: any) => {
      Village.isLoading = false;
      Village.isSuccess = false;
      Village.isError = true;
      Village.Message = payload.data ? payload.data.message : payload.message;
    });
  },
});

// Reducer
export default UnassignFarmerListData.reducer;
