import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// utils
import { axios } from "@/redux/api";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

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
export const addCrop: any = createAsyncThunk(
  "addCrop/addCropType",
  async (value: any, { rejectWithValue }) => {
    try {
      const data: any = await axios.post(`api/crops`, value, {
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

const AddCrop: any = createSlice({
  name: "AddCrop",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    response: {},
  },
  reducers: {
    clear_add_crop_success: (state: any, payload: any) => {
      state.isSuccess = false;
    },
  },
  extraReducers: (builder: any) => {
    builder.addCase(addCrop.pending, (state: any, { payload }: any) => {
      state.isLoading = true;
    });
    builder.addCase(addCrop.fulfilled, (state: any, { payload }: any) => {
      state.isLoading = false;
      state.response = payload.data?.data;
      state.Message = payload.data.message;
      state.isSuccess = true;
      SUCCESS(payload.data.message);
    });

    builder.addCase(addCrop.rejected, (state: any, { payload }: any) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.Message = payload.data ? payload.data.message : payload.message;
      FAILED(state.Message);
    });
  },
});

// Reducer
export default AddCrop.reducer;
export const { clear_add_crop_success } = AddCrop.actions;
