import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// utils
import { axios } from "@/redux/api";

// api call
export const listFarmers: any = createAsyncThunk(
  "listFormer/listFarmers",
  async (value: any, { rejectWithValue }) => {
    try {
      const data: any = await axios.get(`/api/farmer` + (value ? value : ""), {
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

const ListFormer: any = createSlice({
  name: "listFormer",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    response: {},
  },
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(listFarmers.pending, (state: any, { payload }: any) => {
      state.isLoading = true;
    });
    builder.addCase(listFarmers.fulfilled, (state: any, { payload }: any) => {
      state.isLoading = false;
      state.response = payload.data;
      state.Message = payload.data.message;
      state.isSuccess = true;
    });

    builder.addCase(listFarmers.rejected, (state: any, { payload }: any) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.Message = payload.data ? payload.data.message : payload.message;
    });
  },
});

// Reducer
export default ListFormer.reducer;
