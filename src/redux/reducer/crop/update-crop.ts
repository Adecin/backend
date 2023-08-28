import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// utils
import { axios } from "@/redux/api";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

//toast messages
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

// api call
export const updateCrop: any = createAsyncThunk(
  "updateCrop/updateCropType",
  async (value: any, { rejectWithValue }) => {
    try {
      const data: any = await axios.put(`api/crops`, value, {
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

const UpdateCrop: any = createSlice({
  name: "UpdateCrop",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    response: {},
  },
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(updateCrop.pending, (state: any, { payload }: any) => {
      state.isLoading = true;
    });
    builder.addCase(updateCrop.fulfilled, (state: any, { payload }: any) => {
      state.isLoading = false;
      state.response = payload.data?.data;
      state.Message = payload.data.message;
      state.isSuccess = true;
      window.location.reload();
      window.alert(payload.data.message)
      SUCCESS(payload.data.message);
    });

    builder.addCase(updateCrop.rejected, (state: any, { payload }: any) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.Message = payload.data ? payload.data.message : payload.message;
      FAILED(state.Message);
    });
  },
});

// Reducer
export default UpdateCrop.reducer;