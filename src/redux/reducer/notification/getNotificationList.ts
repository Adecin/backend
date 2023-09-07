import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// utils
import { axios } from "@/redux/api";

// api call
export const getNotficatioList: any = createAsyncThunk(
  "getNotficatioList/listNotificaton",
  async (value: any, { rejectWithValue }) => {
    try {
      console.log('rediux', value);
      const data: any = await axios.get(`api/notification`, {
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

const NotificationListState: any = createSlice({
  name: "NotificationListState",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    response: {},
  },
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(getNotficatioList.pending, (state: any, { payload }: any) => {
      state.isLoading = true;
    });
    builder.addCase(getNotficatioList.fulfilled, (state: any, { payload }: any) => {
      state.isLoading = false;
      state.response = payload.data?.data;
      state.Message = payload.data.message;
      state.isSuccess = true;
    });

    builder.addCase(getNotficatioList.rejected, (state: any, { payload }: any) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.Message = payload.data ? payload.data.message : payload.message;
    });
  },
});

// Reducer
export default NotificationListState.reducer;
