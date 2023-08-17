import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// utils
import { axios } from "@/redux/api";

// api call
export const addFieldOfficer: any = createAsyncThunk(
  "addFieldOfficer/add",
  async (value: any, { rejectWithValue }) => {
    try {
      const data: any = await axios.post(`api/technician/create`, value, {
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

const AddFieldOfficerData: any = createSlice({
  name: "AddFieldOfficerData",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    response: {},
  },
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(addFieldOfficer.pending, (state: any, { payload }: any) => {
      state.isLoading = true;
    });
    builder.addCase(addFieldOfficer.fulfilled, (state: any, { payload }: any) => {
      state.isLoading = false;
      state.response = payload.data?.data;
      state.Message = payload.data.message;
      state.isSuccess = true;
    });

    builder.addCase(addFieldOfficer.rejected, (state: any, { payload }: any) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.Message = payload.data ? payload.data.message : payload.message;
    });
  },
});

// Reducer
export default AddFieldOfficerData.reducer;
