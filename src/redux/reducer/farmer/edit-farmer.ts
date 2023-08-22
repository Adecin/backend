import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// utils
import { axios } from "@/redux/api";

// api call
export const editFarmer: any = createAsyncThunk(
  "editFormer/editFarmer",
  async (value: any, { rejectWithValue }) => {
    try {
      const data: any = await axios.put(`api/farmer`, value, {
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

const EditFarmer: any = createSlice({
  name: "editFormer",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    response: {},
  },
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(editFarmer.pending, (state: any, { payload }: any) => {
      state.isLoading = true;
    });
    builder.addCase(editFarmer.fulfilled, (state: any, { payload }: any) => {
      alert(payload.data.message);
      state.isLoading = false;
      state.response = payload.data?.data;
      state.Message = payload.data.message;
      state.isSuccess = true;
    });

    builder.addCase(editFarmer.rejected, (state: any, { payload }: any) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.Message = payload.data ? payload.data.message : payload.message;
    });
  },
});

// Reducer
export default EditFarmer.reducer;
