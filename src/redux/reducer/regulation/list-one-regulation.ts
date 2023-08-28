import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// utils
import { axios } from "@/redux/api";

// api c
export const listRegulationOne: any = createAsyncThunk(
  "listRegulationOne/ListRegulationOne",
  async (value: any, { rejectWithValue }) => {
    try {
      const data: any = await axios.get(
        `/api/survey/regulation/detail/${value ?? ""}`,
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

const ListRegulationOne: any = createSlice({
  name: "ListRegulationOne",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    response: {},
  },
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(
      listRegulationOne.pending,
      (state: any, { payload }: any) => {
        state.isLoading = true;
      }
    );
    builder.addCase(
      listRegulationOne.fulfilled,
      (state: any, { payload }: any) => {
        state.isLoading = false;
        state.response = payload.data?.data;
        state.Message = payload.data.message;
        state.isSuccess = true;
      }
    );

    builder.addCase(
      listRegulationOne.rejected,
      (state: any, { payload }: any) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.Message = payload.data ? payload.data.message : payload.message;
      }
    );
  },
});

// Reducer
export default ListRegulationOne.reducer;
