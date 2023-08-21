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
export const addNewRegulation: any = createAsyncThunk(
  "addNewRegulation/add",
  async (value: any, { rejectWithValue }) => {
    try {
      const data: any = await axios.post(`api/survey/regulation`, value, {
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

const AddNewRegulation: any = createSlice({
  name: "AddNewRegulation",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    response: {},
  },
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(addNewRegulation.pending, (state: any, { payload }: any) => {
      state.isLoading = true;
    });
    builder.addCase(addNewRegulation.fulfilled, (state: any, { payload }: any) => {
      state.isLoading = false;
      state.response = payload.data?.data;
      state.Message = payload.data.message;
      state.isSuccess = true;
      window.alert(payload.data.message)
      SUCCESS(payload.data.message);
      console.log(`payload`,payload)
    });

    builder.addCase(addNewRegulation.rejected, (state: any, { payload }: any) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.Message = payload.data ? payload.data.message : payload.message;
      FAILED(payload.message);
      console.log(`payload`,payload)
    });
  },
});

// Reducer
export default AddNewRegulation.reducer;
