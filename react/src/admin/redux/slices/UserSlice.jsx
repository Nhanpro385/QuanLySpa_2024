// User Slice
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
import endpoints from "../../config/appConfig";

export const usersGet = createAsyncThunk(
    "users/get",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(endpoints.Users.list);
            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi lấy danh sách người dùng",
            });
        }
    }
);
export const usersAdd = createAsyncThunk(
    "users/add",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(endpoints.Users.create, data);
            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message: error.response?.data?.message || "Có lỗi xảy ra",
                errors: error.response?.data?.errors || [],
            });
        }
    }
);
export const usersDelete = createAsyncThunk(
    "users/delete",
    async (id, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(endpoints.Users.delete(id));
            return id;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi xóa người dùng",
            });
        }
    }
);
export const usersUpdate = createAsyncThunk(
    "users/update",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(
                endpoints.Users.update(data.id),
                data
            );
            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi cập nhật người dùng",
                errors: error.response?.data?.errors || [],
            });
        }
    }
);
export const usersGetById = createAsyncThunk(
    "users/getById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(endpoints.Users.detail(id));
            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi lấy thông tin người dùng",
            });
        }
    }
);
const initialState = {
    users: {
        data: [],
    },
    user: {},
    status: "idle",
    error: null,
    loading: false,
};

const userSlice = createSlice({
    name: "user",

    initialState,
    reducers: {
        resetUserState: (state) => {
            state.status = "idle";
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(usersGet.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(usersGet.fulfilled, (state, action) => {
                console.log(action.payload.data);

                state.users = action.payload;
                state.loading = false;
            })
            .addCase(usersGet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(usersAdd.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(usersAdd.fulfilled, (state, action) => {
                if (!state.users.data) {
                    state.users.data = [];
                }
                state.users.data.push(action.payload.data);
                state.loading = false;
            })
            .addCase(usersAdd.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(usersDelete.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(usersDelete.fulfilled, (state, action) => {
           
                state.users.data = state.users.data.filter(
                    (cate) => cate.id !== action.payload
                );
                state.loading = false;
            })
            .addCase(usersDelete.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message; // Nhận thông báo lỗi
            })
            .addCase(usersUpdate.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(usersUpdate.fulfilled, (state, action) => {
                console.log(action.payload.data.id);

                state.users.data = state.users.data.map((cate) =>
                    cate.id === action.payload.data.id
                        ? action.payload.data
                        : cate
                );
                state.loading = false;
            })
            .addCase(usersUpdate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message; // Nhận thông báo lỗi
            })
            .addCase(usersGetById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(usersGetById.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(usersGetById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});
export default userSlice.reducer;
