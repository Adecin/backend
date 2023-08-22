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
export const userLogin: any = createAsyncThunk(
    "userLogin/login",
    async (value: any, { rejectWithValue }) => {
        try {
            const data: any = await axios.post(`api/user/login`, value, {
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

const UserLogin: any = createSlice({
    name: "UserLogin",
    initialState: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        response: {},
    },
    reducers: {},
    extraReducers: (builder: any) => {
        builder.addCase(userLogin.pending, (state: any, { payload }: any) => {
            state.isLoading = true;
            window.alert(payload.data.message)
        });
        builder.addCase(userLogin.fulfilled, (state: any, { payload }: any) => {
            state.isLoading = false;
            state.response = payload.data?.data;
            state.Message = payload.data.message;
            state.isSuccess = true;
            localStorage.setItem('token', payload.data.token);
            window.alert(payload.data.message)
            const decodedToken: any = jwtDecode(payload.data.token);
            if (decodedToken?.data?.role === 'admin'){
                window.location.pathname = '/dashboard';
            }          
            SUCCESS(payload.data.message);
        });

        builder.addCase(userLogin.rejected, (state: any, { payload }: any) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.Message = payload.data ? payload.data.message : payload.message;
            FAILED(payload.message);
            window.alert(payload.data.message)
        });
    },
});

// Reducer
export default UserLogin.reducer;
