import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// utils
import { axios } from "@/redux/api";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
// api call

const FAILED = async (data: string) => {
    toast.error(data, {
        position: toast.POSITION.TOP_RIGHT,
    });
};

const SUCCESS = async (data: string) => {
    toast.success(data, {
        position: toast.POSITION.TOP_RIGHT,
    });
};

export const addFarmer: any = createAsyncThunk(
  "addFormer/addFarmer",
  async (value: any, { rejectWithValue }) => {
    const token = localStorage.getItem(`token`);
    try {
      const data: any = await axios.post(`api/farmer`, value, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

const AddFarmer: any = createSlice({
  name: "addFormer",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    response: {},
  },
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(addFarmer.pending, (state: any, { payload }: any) => {
      state.isLoading = true;
    });
    builder.addCase(addFarmer.fulfilled, (state: any, { payload }: any) => {
      state.isLoading = false;
      state.response = payload.data?.data;
      state.Message = payload.data.message;
      state.isSuccess = true;
      SUCCESS(payload?.data?.message);
    });

    builder.addCase(addFarmer.rejected, (state: any, { payload }: any) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.Message = payload.data ? payload.data.message : payload.message;
      FAILED(payload?.data?.message);
    });
  },
});

// Reducer
export default AddFarmer.reducer;
