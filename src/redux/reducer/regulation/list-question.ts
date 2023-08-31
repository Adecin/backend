import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// utils
import { axios } from "@/redux/api";

// api call
export const listAllQuestion: any = createAsyncThunk(
  "listAllQuestion/ListAllQuestion",
  async (value: any, { rejectWithValue }) => {
    try {
      const data: any = await axios.get(
        `/api/survey/question` + (value ?? ""),
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

const ListAllQuestion: any = createSlice({
  name: "ListAllQuestion",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    response: {},
  },
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(listAllQuestion.pending, (state: any, { payload }: any) => {
      state.isLoading = true;
    });
    builder.addCase(
      listAllQuestion.fulfilled,
      (state: any, { payload }: any) => {
        state.isLoading = false;
        state.response = payload.data?.data;
        state.Message = payload.data.message;
        state.isSuccess = true;
      }
    );

    builder.addCase(
      listAllQuestion.rejected,
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
export default ListAllQuestion.reducer;
