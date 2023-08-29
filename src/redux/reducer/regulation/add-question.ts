import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// utils
import { axios } from "@/redux/api";

// api c
export const addQuestion: any = createAsyncThunk(
  "addQuestion/addQuestion",
  async (value: any, { rejectWithValue }) => {
    try {
      const data: any = await axios.post(`/api/survey/question`, value, {
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

const AddQuestion: any = createSlice({
  name: "addQuestion",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    response: {},
    Message: "",
  },
  reducers: {
    add_question_is_success: (state, payload) => {
      state.isSuccess = false;
    },
  },
  extraReducers: (builder: any) => {
    builder.addCase(addQuestion.pending, (state: any, { payload }: any) => {
      state.isLoading = true;
    });
    builder.addCase(addQuestion.fulfilled, (state: any, { payload }: any) => {
      state.isLoading = false;
      state.response = payload.data?.data;
      state.Message = payload.data.message;
      state.isSuccess = true;
    });

    builder.addCase(addQuestion.rejected, (state: any, { payload }: any) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.Message = payload.data ? payload.data.message : payload.message;
    });
  },
});

// Reducer
export default AddQuestion.reducer;
export const { add_question_is_success } = AddQuestion.actions;
