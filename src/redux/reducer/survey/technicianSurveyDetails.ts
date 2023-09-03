import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// utils
import { axios } from "@/redux/api";

// api call
export const listTechnicianSurveyDetails: any = createAsyncThunk(
  "listTechnicianSurveyDetails/listSurvey",
  async (value: any, { rejectWithValue }) => {
    try {
      const data: any = await axios.get(`api/assign/technician/survey/farmer/list` + (value ? value : ""), {
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

const TechSurveyDetails: any = createSlice({
  name: "TechSurveyDetails",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    response: [],
  },
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(listTechnicianSurveyDetails.pending, (state: any, { payload }: any) => {
      state.isLoading = true;
    });
    builder.addCase(listTechnicianSurveyDetails.fulfilled, (state: any, { payload }: any) => {
      state.isLoading = false;
      state.response = payload.data?.data;
      state.Message = payload.data.message;
      state.isSuccess = true;
    });

    builder.addCase(listTechnicianSurveyDetails.rejected, (state: any, { payload }: any) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.Message = payload.data ? payload.data.message : payload.message;
      // FAILED(state.Message);
    });
  },
});

// Reducer
export default TechSurveyDetails.reducer;
