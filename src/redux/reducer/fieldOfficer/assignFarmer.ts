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
export const assignFarmer: any = createAsyncThunk(
  "assignFarmer/assign",
  async (value: any, { rejectWithValue }) => {
    try {
      const data: any = await axios.post(
        `api/farmer/assign`, value,
        {
          withCredentials: true,
        }
      );

      if (data.data.status) {
        console.log(`data`,data)
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

const AssignFarmerData: any = createSlice({
  name: "AssignFarmerData",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    response: {},
  },
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(assignFarmer.pending, (Village: any, { payload }: any) => {
      Village.isLoading = true;
    });
    builder.addCase(assignFarmer.fulfilled, (Village: any, { payload }: any) => {
      Village.isLoading = false;
      Village.response = payload.data?.data;
      Village.Message = payload.data.message;
      Village.isSuccess = true;
      SUCCESS(payload?.data?.message);
    });

    builder.addCase(assignFarmer.rejected, (Village: any, { payload }: any) => {
      Village.isLoading = false;
      Village.isSuccess = false;
      Village.isError = true;
      Village.Message = payload.data ? payload.data.message : payload.message;
      FAILED(Village.Message);
    });
  },
});

// Reducer
export default AssignFarmerData.reducer;
