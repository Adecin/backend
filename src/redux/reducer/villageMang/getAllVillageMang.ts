import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// utils
import { axios } from "@/redux/api";

// api call
export const getAllVillageMang: any = createAsyncThunk(
  "villageMang/getAll",
  async (value: any, { rejectWithValue }) => {
    try {
      const data: any = await axios.get(`api/village-mang` + (value ? value : ""), {
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

const getAllVillageMangData: any = createSlice({
  name: "getAllVillageMangData",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    response: {},
  },
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(getAllVillageMang.pending, (Crop: any, { payload }: any) => {
      Crop.isLoading = true;
    });
    builder.addCase(getAllVillageMang.fulfilled, (Crop: any, { payload }: any) => {
      Crop.isLoading = false;
      Crop.response = payload.data;
      Crop.Message = payload.data.message;
      Crop.isSuccess = true;
    });

    builder.addCase(getAllVillageMang.rejected, (Crop: any, { payload }: any) => {
      Crop.isLoading = false;
      Crop.isSuccess = false;
      Crop.isError = true;
      Crop.Message = payload.data ? payload.data.message : payload.message;
    });
  },
});

// Reducer
export default getAllVillageMangData.reducer;
