import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
import endpoints from "../../config/appConfig";
import axios from "axios";
export const loginAdmin = createAsyncThunk(
    "auth/login",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(endpoints.Auth.login, data);

            if (response.data.access_token) {
                localStorage.setItem("tokenAdmin", response.data.access_token);
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
export const GetmeAdmin = createAsyncThunk(
    "auth/getme",
    async (config, { rejectWithValue }) => {
        try {
            
            const response = await axiosInstance.get(endpoints.Auth.me(config?.day || ""));
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
//Client
export const loginClient = createAsyncThunk(
    "auth/loginClient",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(endpoints.AuthClient.login, data);
            if (response.data.access_token) {
                localStorage.setItem("tokenClient", response.data.access_token);
            }
            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message: error.response?.data?.message || "Có lỗi xảy ra",
                errors: error.response?.data?.errors || "Có lỗi xảy ra",
            });
        }
    }
);
export const registerClient = createAsyncThunk(
    "auth/registerClient",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                endpoints.AuthClient.register,
                data
            );
            if (response.data.access_token) {
                localStorage.setItem("tokenClient", response.data.access_token);
            }
            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message: error.response?.data?.message || "Có lỗi xảy ra",
                errors: error.response?.data?.errors || "Có lỗi xảy ra",
            });
        }
    }
);

export const logoutClient = createAsyncThunk(
    "auth/logoutClient",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(
                endpoints.AuthClient.logout
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
export const forgotpasswordClient = createAsyncThunk(
    "auth/forgotpasswordClient",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(
                endpoints.AuthClient.forgotpassword,
                data
            );
            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message: error.response?.data?.message || "Có lỗi xảy ra",
                error: error.response?.data?.error || "Có lỗi xảy ra",
                errors: error.response?.data?.errors || "Có lỗi xảy ra",
            });
        }
    }
);
export const resetpasswordClient = createAsyncThunk(
    "auth/resetpasswordClient",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(
                endpoints.AuthClient.resetpassword,
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
export const GetmeClient = createAsyncThunk(
    "auth/getmeClient",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(endpoints.AuthClient.me);
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
export const ChangePassword = createAsyncThunk(
    "auth/changePassword",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(
                endpoints.Auth.changepassword,
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
export const EditProfile = createAsyncThunk(
    "auth/editProfile",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(
                endpoints.Auth.EditProfile(data.id),
                data.data
            );
            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message: error.response?.data?.message || "Có lỗi xảy ra",
                errors: error.response?.data?.errors || "Có lỗi xảy ra",
            });
        }
    }
);
export const EditProfileClient = createAsyncThunk(
    "auth/editProfileClient",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(
                endpoints.AuthClient.EditProfile(data.id),
                data.data
            );
            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message: error.response?.data?.message || "Có lỗi xảy ra",
                errors: error.response?.data?.errors || "Có lỗi xảy ra",
            });
        }
    }
);
export const ChangePasswordClient = createAsyncThunk(
    "auth/changePasswordClient",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(
                endpoints.AuthClient.changepassword(data.id),
                data.data
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
    role: null,
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
            // localStorage.removeItem("tokenAdmin");
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
            })
            .addCase(GetmeAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetmeAdmin.fulfilled, (state, action) => {
                state.user = action.payload;
                state.role = action.payload.data.role;
                localStorage.setItem("role", action.payload.data.role);
                state.loading = false;
            })
            .addCase(GetmeAdmin.rejected, (state, action) => {
                state.loading = false;

                state.error = action.payload;
            })
            .addCase(loginClient.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginClient.fulfilled, (state, action) => {
                state.user = action.payload;

                state.loading = false;
            })
            .addCase(loginClient.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(registerClient.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerClient.fulfilled, (state, action) => {
                state.user = action.payload;

                state.loading = false;
            })
            .addCase(registerClient.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(logoutClient.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutClient.fulfilled, (state, action) => {
                state.user = null;
                state.loading = false;
            })
            .addCase(logoutClient.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(forgotpasswordClient.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(forgotpasswordClient.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(forgotpasswordClient.rejected, (state, action) => {
                state.loading = false;

                state.error = action.payload;
            })
            .addCase(resetpasswordClient.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(resetpasswordClient.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(resetpasswordClient.rejected, (state, action) => {
                state.loading = false;

                state.error = action.payload;
            })
            .addCase(GetmeClient.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetmeClient.fulfilled, (state, action) => {
                state.user = action.payload;

                state.loading = false;
            })
            .addCase(GetmeClient.rejected, (state, action) => {
                state.loading = false;

                state.error = action.payload;
            })
            .addCase(ChangePassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(ChangePassword.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(ChangePassword.rejected, (state, action) => {
                state.loading = false;

                state.error = action.payload;
            })
            .addCase(EditProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(EditProfile.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(EditProfile.rejected, (state, action) => {
                state.loading = false;

                state.error = action.payload;
            })
            .addCase(EditProfileClient.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(EditProfileClient.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(EditProfileClient.rejected, (state, action) => {
                state.loading = false;

                state.error = action.payload;
            })
            .addCase(ChangePasswordClient.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(ChangePasswordClient.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(ChangePasswordClient.rejected, (state, action) => {
                state.loading = false;

                state.error = action.payload;
            });
    },
});
export const { logout, setUser, getUser } = authSlice.actions;
export default authSlice.reducer;
