import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import endpoints from "../../config/appConfig";
import axiosInstance from "../../config/axiosInstance";
import { logout } from "./authSlice";
const checkRoleAndLogout = (dispatch) => {
    const userRole = localStorage.getItem("role");
    console.log("userRole", userRole);
    if (!userRole) {
        dispatch(logout());
        return null; // Early return for invalid role
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
            console.log("data", data);
            const response = await axiosInstance.post(
                endpoints.streatments.create,
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
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
            const res = await axiosInstance.delete(
                endpoints.streatments.delete(id)
            );
            return res.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message: error.response?.data?.message || "Có lỗi xảy ra",
                errors: error.response?.data?.errors || [],
                error: error.response?.data?.error || {},
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
            console.log("data", data);

            const response = await axiosInstance.post(
                endpoints.streatments.update(data.id),
                data.data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
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
export const StreatmentSearch = createAsyncThunk(
    "streatment/search",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                `${endpoints.streatments.search}?created_at[like]=${data.search}&page=${data.page}&per_page=${data.per_page}`
            );

            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi tìm kiếm lịch hẹn",
            });
        }
    }
);
export const StreatmentGetById = createAsyncThunk(
    "streatment/getById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                endpoints.streatments.detail(id)
            );

            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message: error.response?.data?.message || "Có lỗi xảy ra",
                errors: error.response?.data?.errors || [],
                error: error.response?.data?.error || {},
            });
        }
    }
);
export const StreatmentGetByCustomer = createAsyncThunk(
    "streatment/getByCustomer",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                endpoints.streatments.byCustomer(id)
            );

            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message: error.response?.data?.message || "Có lỗi xảy ra",
                errors: error.response?.data?.errors || [],
                error: error.response?.data?.error || {},
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
                state.streatments.data.push(action.payload.data);
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
            })
            .addCase(StreatmentSearch.pending, (state) => {
                state.loading = true;
            })
            .addCase(StreatmentSearch.fulfilled, (state, action) => {
                state.loading = false;
                console.log("action.payload", action.payload);

                state.streatments = action.payload;
            })
            .addCase(StreatmentSearch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(StreatmentGetById.pending, (state) => {
                state.loading = true;
            })
            .addCase(StreatmentGetById.fulfilled, (state, action) => {
                state.loading = false;
                state.streament = action.payload;
            })
            .addCase(StreatmentGetById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(StreatmentGetByCustomer.pending, (state) => {
                state.loading = true;
            })
            .addCase(StreatmentGetByCustomer.fulfilled, (state, action) => {
                state.loading = false;
                state.streatments = action.payload;
            })
            .addCase(StreatmentGetByCustomer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});
export const { clearState } = streatmentSlice.actions;
export default streatmentSlice.reducer;
