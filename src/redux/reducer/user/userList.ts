import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// utils
import { axios } from "@/redux/api";

// api call
export const userListInfo: any = createAsyncThunk(
  "userListInfo/listUser",
  async (value: any, { rejectWithValue }) => {
    try {
      console.log('rediux', value);
      const data: any = await axios.get(`/api/user/list/`, {
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

const UserListState: any = createSlice({
  name: "UserListState",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    response: {},
  },
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(userListInfo.pending, (state: any, { payload }: any) => {
      state.isLoading = true;
    });
    builder.addCase(userListInfo.fulfilled, (state: any, { payload }: any) => {
      state.isLoading = false;
      state.response = payload.data?.data;
      state.Message = payload.data.message;
      state.isSuccess = true;
    });

    builder.addCase(userListInfo.rejected, (state: any, { payload }: any) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.Message = payload.data ? payload.data.message : payload.message;
    });
  },
});

// Reducer
export default UserListState.reducer;
