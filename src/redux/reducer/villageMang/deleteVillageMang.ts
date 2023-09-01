import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// utils
import { axios } from "@/redux/api";

// api call
export const deleteVillageMang: any = createAsyncThunk(
  "villageMang/getAll",
  async (value: any, { rejectWithValue }) => {
    try {
      const data: any = await axios.delete(`api/village-mang` + (value ? value : ""), {
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

const deleteVillageMangData: any = createSlice({
  name: "deleteVillageMangData",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    response: {},
  },
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(deleteVillageMang.pending, (Crop: any, { payload }: any) => {
      Crop.isLoading = true;
    });
    builder.addCase(deleteVillageMang.fulfilled, (Crop: any, { payload }: any) => {
      Crop.isLoading = false;
      Crop.response = payload.data;
      Crop.Message = payload.data.message;
      Crop.isSuccess = true;
    });

    builder.addCase(deleteVillageMang.rejected, (Crop: any, { payload }: any) => {
      Crop.isLoading = false;
      Crop.isSuccess = false;
      Crop.isError = true;
      Crop.Message = payload.data ? payload.data.message : payload.message;
    });
  },
});

// Reducer
export default deleteVillageMangData.reducer;
