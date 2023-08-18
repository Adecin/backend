import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// utils
import { axios } from "@/redux/api";

// api call
export const updateFieldOfficer: any = createAsyncThunk(
  "fieldOfficer/update",
  async (value: any, { rejectWithValue }) => {
    try {
      console.log('rediux', value);
      const data: any = await axios.put(`/api/technician/update`, value, {
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

const UpdateFieldOfficerData: any = createSlice({
  name: "UpdateFieldOfficerData",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    response: {},
  },
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(updateFieldOfficer.pending, (state: any, { payload }: any) => {
      state.isLoading = true;
    });
    builder.addCase(updateFieldOfficer.fulfilled, (state: any, { payload }: any) => {
      state.isLoading = false;
      state.response = payload.data?.data;
      state.Message = payload.data.message;
      state.isSuccess = true;
    });

    builder.addCase(updateFieldOfficer.rejected, (state: any, { payload }: any) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.Message = payload.data ? payload.data.message : payload.message;
    });
  },
});

// Reducer
export default UpdateFieldOfficerData.reducer;