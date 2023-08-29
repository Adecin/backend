import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// utils
import { axios } from "@/redux/api";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


//toast
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
export const editFarm: any = createAsyncThunk(
  "editForm/editFarm",
  async (value: any, { rejectWithValue }) => {
    try {
      const data: any = await axios.put(`api/farmer/farm`, value, {
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

const EditFarm: any = createSlice({
  name: "editForm",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    response: {},
  },
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(editFarm.pending, (state: any, { payload }: any) => {
      state.isLoading = true;
    });
    builder.addCase(editFarm.fulfilled, (state: any, { payload }: any) => {
      alert(payload.data.message);
      state.isLoading = false;
      state.response = payload.data?.data;
      state.Message = payload.data.message;
      window.alert(payload.data.message)
      state.isSuccess = true;
      SUCCESS(payload?.data?.message);
    });

    builder.addCase(editFarm.rejected, (state: any, { payload }: any) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.Message = payload.data ? payload.data.message : payload.message;
      FAILED(state.Message);
    });
  },
});

// Reducer
export default EditFarm.reducer;
