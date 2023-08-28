import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// utils
import { axios } from "@/redux/api";

// api call
export const listAllPillar: any = createAsyncThunk(
  "listAllPillar/ListAllPillar",
  async (value: any, { rejectWithValue }) => {
    try {
      const data: any = await axios.get(
        `/api/survey/Pillar` + (value ? value : ""),
        {
          withCredentials: true,
        }
      );

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

const ListAllPillar: any = createSlice({
  name: "ListAllPillar",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    response: {},
  },
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(listAllPillar.pending, (state: any, { payload }: any) => {
      state.isLoading = true;
    });
    builder.addCase(listAllPillar.fulfilled, (state: any, { payload }: any) => {
      state.isLoading = false;
      state.response = payload.data?.data;
      state.Message = payload.data.message;
      state.isSuccess = true;
    });

    builder.addCase(listAllPillar.rejected, (state: any, { payload }: any) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.Message = payload.data ? payload.data.message : payload.message;
    });
  },
});

// Reducer
export default ListAllPillar.reducer;
