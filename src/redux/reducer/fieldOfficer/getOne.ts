import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// utils
import { axios } from "@/redux/api";

// api call
export const oneFieldOfficer: any = createAsyncThunk(
  "fieldOfficer/list/one",
  async (value: any, { rejectWithValue }) => {
    try {
      const data: any = await axios.get(`/api/technician/list/` + value, {
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

const OneFieldOfficerData: any = createSlice({
  name: "OneFieldOfficerData",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    response: {},
  },
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(oneFieldOfficer.pending, (state: any, { payload }: any) => {
      state.isLoading = true;
    });
    builder.addCase(oneFieldOfficer.fulfilled, (state: any, { payload }: any) => {
      state.isLoading = false;
      state.response = payload.data?.data;
      state.Message = payload.data.message;
      state.isSuccess = true;
    });

    builder.addCase(oneFieldOfficer.rejected, (state: any, { payload }: any) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.Message = payload.data ? payload.data.message : payload.message;
    });
  },
});

// Reducer
export default OneFieldOfficerData.reducer;
