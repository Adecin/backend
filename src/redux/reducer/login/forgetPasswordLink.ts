import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// utils
import { axios } from "@/redux/api";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import jwtDecode from 'jwt-decode';

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
export const forgetPasswordLink: any = createAsyncThunk(
    "forgetPasswordLink/forgetPassword",
    async (value: any, { rejectWithValue }) => {
        try {
            const data: any = await axios.post(`/api/user/sent-otp/email`, value, {
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

const ForgetPassword: any = createSlice({
    name: "ForgetPassword",
    initialState: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        response: {},
    },
    reducers: {},
    extraReducers: (builder: any) => {
        builder.addCase(forgetPasswordLink.pending, (state: any, { payload }: any) => {
            state.isLoading = true;
        });
        builder.addCase(forgetPasswordLink.fulfilled, (state: any, { payload }: any) => {
            state.isLoading = false;
            state.response = payload.data?.data;
            state.Message = payload.data?.message;
            state.isSuccess = true;
            SUCCESS(payload?.data?.message);
        });
        builder.addCase(forgetPasswordLink.rejected, (state: any, { payload }: any) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.Message = payload?.data ? payload?.data?.message : payload?.message;
            FAILED(state.Message);
        });
    },
});

// Reducer
export default ForgetPassword.reducer;
