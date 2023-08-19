import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// utils
import { axios } from "@/redux/api";

// api call
export const addFarmer: any = createAsyncThunk(
  "addFormer/addFarmer",
  async (value: any, { rejectWithValue }) => {
    try {
      const data: any = await axios.post(`api/farmer`, value, {
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

const AddFarmer: any = createSlice({
  name: "addFormer",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    response: {},
  },
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(addFarmer.pending, (state: any, { payload }: any) => {
      state.isLoading = true;
    });
    builder.addCase(addFarmer.fulfilled, (state: any, { payload }: any) => {
      state.isLoading = false;
      state.response = payload.data?.data;
      state.Message = payload.data.message;
      state.isSuccess = true;
      window.alert(payload.data.message)
    });

    builder.addCase(addFarmer.rejected, (state: any, { payload }: any) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.Message = payload.data ? payload.data.message : payload.message;
    });
  },
});

// Reducer
export default AddFarmer.reducer;
