import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// utils
import { axios } from "@/redux/api";

// api c
export const updateQuestion: any = createAsyncThunk(
  "UpdateQuestion/updateQuestion",
  async (value: any, { rejectWithValue }) => {
    try {
      const data: any = await axios.put(`/api/survey/question`, value, {
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

const UpdateQuestion: any = createSlice({
  name: "updateQuestion",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    response: {},
    Message: "",
  },
  reducers: {
    is_success: (state, payload) => {
      state.isSuccess = false;
    },
  },
  extraReducers: (builder: any) => {
    builder.addCase(updateQuestion.pending, (state: any, { payload }: any) => {
      state.isLoading = true;
    });
    builder.addCase(
      updateQuestion.fulfilled,
      (state: any, { payload }: any) => {
        state.isLoading = false;
        state.response = payload.data?.data;
        state.Message = payload.data.message;
        state.isSuccess = true;
      }
    );

    builder.addCase(updateQuestion.rejected, (state: any, { payload }: any) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.Message = payload.data ? payload.data.message : payload.message;
    });
  },
});

// Reducer
export default UpdateQuestion.reducer;
export const { is_success } = UpdateQuestion.actions;
