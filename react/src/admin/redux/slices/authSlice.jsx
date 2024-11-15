import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
import endpoints from "../../config/appConfig";
import axios from "axios";
export const loginAdmin = createAsyncThunk(
    "auth/login",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                endpoints.Auth.login,
                data
            );
            if (response.data.access_token) {
                localStorage.setItem("token", response.data.access_token);
            }
            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message: error.response?.data?.message || "Có lỗi xảy ra",
            });
        }
    }
);
export const logoutAdmin = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(endpoints.Auth.logout);
            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message: error.response?.data?.message || "Có lỗi xảy ra",
            });
        }
    }
);
export const forgotpassword = createAsyncThunk(
    "auth/forgotpassword",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(
                endpoints.Auth.forgotpassword,
                data
            );
            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message: error.response?.data?.message || "Có lỗi xảy ra",
            });
        }
    }
);
export const resetpassword = createAsyncThunk(
    "auth/resetpassword",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(
                endpoints.Auth.resetpassword,
                data
            );

            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message: error.response?.data?.message || "Có lỗi xảy ra",
                error: error.response?.data?.errors || "Có lỗi xảy ra",
            });
        }
    }
);
const initialState = {
    token: null,
    user: null,
    loading: false,
    error: null,
};
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem("token");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginAdmin.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(loginAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(logoutAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutAdmin.fulfilled, (state, action) => {
                state.user = null;
                state.loading = false;
            })
            .addCase(logoutAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(forgotpassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(forgotpassword.fulfilled, (state, action) => {
                state.user = action.payload;
                console.log(action.payload);

                state.loading = false;
            })
            .addCase(forgotpassword.rejected, (state, action) => {
                state.loading = false;

                state.error = action.payload;
            })
            .addCase(resetpassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(resetpassword.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(resetpassword.rejected, (state, action) => {
                state.loading = false;

                state.error = action.payload;
            });
    },
});
export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
