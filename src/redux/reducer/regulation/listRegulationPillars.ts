import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// utils
import { axios } from "@/redux/api";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

// api call
export const listRegulationPillars: any = createAsyncThunk(
  "listRegulationPillars/list",
  async (value: any, { rejectWithValue }) => {
    try {
      const data: any = await axios.get(
        `/api/farmer/farm/regulationId/pillar` + (value ? value : ""),
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

const ListRegulationPillars: any = createSlice({
  name: "ListRegulationPillars",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    response: {},
  },
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(
      listRegulationPillars.pending,
      (state: any, { payload }: any) => {
        state.isLoading = true;
      }
    );
    builder.addCase(
      listRegulationPillars.fulfilled,
      (state: any, { payload }: any) => {
        state.isLoading = false;
        state.response = payload.data?.data;
        state.Message = payload.data.message;
        state.isSuccess = true;
      }
    );

    builder.addCase(
      listRegulationPillars.rejected,
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
export default ListRegulationPillars.reducer;
