import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import endpoints from "../../config/appConfig";
import axiosInstance from "../../config/axiosInstance";
import { logout } from "./authSlice";
const checkRoleAndLogout = (dispatch) => {
    const userRole = localStorage.getItem("role");

    if (!userRole) {
        dispatch(logout());
    }

    return userRole;
};
export const StreatmentGet = createAsyncThunk(
    "Streatment/get",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                endpoints.streatments.list
            );

            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi lấy danh sách lịch sử trị liệu",
            });
        }
    }
);

export const StreatmentAdd = createAsyncThunk(
    "Streatment/add",
    async (data, { dispatch, rejectWithValue }) => {
        const userRole = checkRoleAndLogout(dispatch);
        if (userRole !== "Quản trị viên") {
            return rejectWithValue({
                status: 403,
                message: "Bạn không có quyền thêm lịch sử trị liệu",
            });
        }
        try {
            const response = await axiosInstance.post(
                endpoints.streatments.create,
                data
            );
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
export const StreatmentDelete = createAsyncThunk(
    "Streatment/delete",
    async (id, { dispatch, rejectWithValue }) => {
        const userRole = checkRoleAndLogout(dispatch);
        if (userRole !== "Quản trị viên") {
            return rejectWithValue({
                status: 403,
                message: "Bạn không có quyền xóa lịch sử trị liệu",
            });
        }
        try {
            await axiosInstance.delete(endpoints.streatments.delete(id));
            return id;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message: error.response?.data?.message || "Có lỗi xảy ra",
            });
        }
    }
);
export const StreatmentUpdate = createAsyncThunk(
    "Streatment/update",
    async (data, { dispatch, rejectWithValue }) => {
        const userRole = checkRoleAndLogout(dispatch);
        if (userRole !== "Quản trị viên") {
            return rejectWithValue({
                status: 403,
                message: "Bạn không có quyền cập nhật lịch sử trị liệu",
            });
        }
        try {
            const response = await axiosInstance.put(
                endpoints.streatments.update,
                data
            );
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
const initialState = {
    streatments: {
        data: [],
    },
    streament: {},
    loading: false,
    error: null,
};
const streatmentSlice = createSlice({
    name: "streatment",
    initialState,
    reducers: {
        clearState: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(StreatmentGet.pending, (state) => {
                state.loading = true;
            })
            .addCase(StreatmentGet.fulfilled, (state, action) => {
                state.loading = false;
                state.streatments = action.payload;
            })
            .addCase(StreatmentGet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(StreatmentAdd.pending, (state) => {
                state.loading = true;
            })
            .addCase(StreatmentAdd.fulfilled, (state, action) => {
                state.loading = false;
                state.streament = action.payload;
            })
            .addCase(StreatmentAdd.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(StreatmentDelete.pending, (state) => {
                state.loading = true;
            })
            .addCase(StreatmentDelete.fulfilled, (state, action) => {
                state.loading = false;
                state.streatments.data = state.streatments.data.filter(
                    (item) => item.id !== action.payload
                );
            })
            .addCase(StreatmentDelete.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(StreatmentUpdate.pending, (state) => {
                state.loading = true;
            })
            .addCase(StreatmentUpdate.fulfilled, (state, action) => {
                state.loading = false;
                state.streament = action.payload;
            })
            .addCase(StreatmentUpdate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});
export const { clearState } = streatmentSlice.actions;
export default streatmentSlice.reducer;
