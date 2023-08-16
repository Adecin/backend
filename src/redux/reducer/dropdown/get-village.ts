import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// utils
import { axios } from "@/redux/api";

// api call
export const getVillage: any = createAsyncThunk(
  "GetVillage/getVillage",
  async (value: any, { rejectWithValue }) => {
    try {
      const data: any = await axios.get(
        `api/common/village` + (value ? value : ""),
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

// Village

const ListVillage: any = createSlice({
  name: "GetVillage",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    response: {},
  },
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(getVillage.pending, (Village: any, { payload }: any) => {
      Village.isLoading = true;
    });
    builder.addCase(getVillage.fulfilled, (Village: any, { payload }: any) => {
      Village.isLoading = false;
      Village.response = payload.data?.data;
      Village.Message = payload.data.message;
      Village.isSuccess = true;
    });

    builder.addCase(getVillage.rejected, (Village: any, { payload }: any) => {
      Village.isLoading = false;
      Village.isSuccess = false;
      Village.isError = true;
      Village.Message = payload.data ? payload.data.message : payload.message;
    });
  },
});

// Reducer
export default ListVillage.reducer;
