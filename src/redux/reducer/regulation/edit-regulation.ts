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
export const editRegulation: any = createAsyncThunk(
  "editRegulation/editRegulation",
  async (value: any, { rejectWithValue }) => {
    try {
      const data: any = await axios.put(`api/survey/regulation`, value, {
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

const EditRegulation: any = createSlice({
  name: "editRegulation",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    response: {},
  },
  reducers: {
    editRegulationIsSuccess: (state: any, payload: any) => {
      state.isSuccess = false;
    },
  },
  extraReducers: (builder: any) => {
    builder.addCase(editRegulation.pending, (state: any, { payload }: any) => {
      state.isLoading = true;
    });
    builder.addCase(
      editRegulation.fulfilled,
      (state: any, { payload }: any) => {
        state.isLoading = false;
        state.response = payload.data?.data;
        state.Message = payload.data.message;
        state.isSuccess = true;
        SUCCESS(payload.data.message);
      }
    );

    builder.addCase(editRegulation.rejected, (state: any, { payload }: any) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.Message = payload.data ? payload.data.message : payload.message;
      FAILED(state.Message);
    });
  },
});

// Reducer
export default EditRegulation.reducer;
export const { editRegulationIsSuccess } = EditRegulation.actions;
