import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// utils
import { axios } from "@/redux/api";

// api call
export const getDistrict: any = createAsyncThunk(
  "GetDistrict/getDistrict",
  async (value: any, { rejectWithValue }) => {
    try {
      const data: any = await axios.get(
        `api/common/district` + (value ? value : ""),
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

// District

const ListDistrict: any = createSlice({
  name: "GetDistrict",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    response: {},
  },
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(getDistrict.pending, (District: any, { payload }: any) => {
      District.isLoading = true;
    });
    builder.addCase(
      getDistrict.fulfilled,
      (District: any, { payload }: any) => {
        District.isLoading = false;
        District.response = payload.data?.data;
        District.Message = payload.data.message;
        District.isSuccess = true;
      }
    );

    builder.addCase(getDistrict.rejected, (District: any, { payload }: any) => {
      District.isLoading = false;
      District.isSuccess = false;
      District.isError = true;
      District.Message = payload.data ? payload.data.message : payload.message;
    });
  },
});

// Reducer
export default ListDistrict.reducer;
