import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// utils
import { axios } from "@/redux/api";

// api call
export const assignedFarmersCount: any = createAsyncThunk(
  "assignedFarmersCount/list",
  async (value: any, { rejectWithValue }) => {
    try {
      const data: any = await axios.get(`/api/assignFarmerCounts` + (value ? value : ""), {
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

const AssignedFarmersCountData: any = createSlice({
  name: "AssignedFarmersCountData",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    response: {},
  },
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(assignedFarmersCount.pending, (state: any, { payload }: any) => {
      state.isLoading = true;
    });
    builder.addCase(assignedFarmersCount.fulfilled, (state: any, { payload }: any) => {
      state.isLoading = false;
      state.response = payload.data?.data;
      state.Message = payload.data.message;
      state.isSuccess = true;
    });

    builder.addCase(assignedFarmersCount.rejected, (state: any, { payload }: any) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.Message = payload.data ? payload.data.message : payload.message;
    });
  },
});

// Reducer
export default AssignedFarmersCountData.reducer;
