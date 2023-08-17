import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// utils
import { axios } from "@/redux/api";

// api call
export const getCrop: any = createAsyncThunk(
  "GetCrop/getCrop",
  async (value: any, { rejectWithValue }) => {
    try {
      const data: any = await axios.get(`api/crops` + (value ? value : ""), {
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

// Crop

const ListCrop: any = createSlice({
  name: "GetCrop",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    response: {},
  },
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(getCrop.pending, (Crop: any, { payload }: any) => {
      Crop.isLoading = true;
    });
    builder.addCase(getCrop.fulfilled, (Crop: any, { payload }: any) => {
      Crop.isLoading = false;
      Crop.response = payload.data;
      Crop.Message = payload.data.message;
      Crop.isSuccess = true;
    });

    builder.addCase(getCrop.rejected, (Crop: any, { payload }: any) => {
      Crop.isLoading = false;
      Crop.isSuccess = false;
      Crop.isError = true;
      Crop.Message = payload.data ? payload.data.message : payload.message;
    });
  },
});

// Reducer
export default ListCrop.reducer;
