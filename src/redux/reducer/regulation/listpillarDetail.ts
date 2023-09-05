import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// utils
import { axios } from "@/redux/api";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

// api call
export const listPillarDetail: any = createAsyncThunk(
  "listPillarDetail/list",
  async (value: any, { rejectWithValue }) => {
    try {
      const data: any = await axios.get(
        `/api/farmer/farm/survey/pillar/detail` + (value ? value : ""),
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

const ListPillarDetail: any = createSlice({
  name: "ListPillarDetail",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    response: {},
  },
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(
        listPillarDetail.pending,
      (state: any, { payload }: any) => {
        state.isLoading = true;
      }
    );
    builder.addCase(
        listPillarDetail.fulfilled,
      (state: any, { payload }: any) => {
        state.isLoading = false;
        state.response = payload.data?.data;
        state.Message = payload.data.message;
        state.isSuccess = true;
      }
    );

    builder.addCase(
        listPillarDetail.rejected,
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
export default ListPillarDetail.reducer;
