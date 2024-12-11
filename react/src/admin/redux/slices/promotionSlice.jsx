import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
import endpoints from "../../config/appConfig";
import { logout } from "./authSlice";

// Kiểm tra vai trò và đăng xuất nếu không hợp lệ
const checkRoleAndLogout = (dispatch) => {
    const userRole = localStorage.getItem("role");

    if (!userRole) {
        dispatch(logout());
        throw new Error(
            "Chưa đăng nhập hoặc không tìm thấy vai trò người dùng."
        );
    }

    return userRole;
};

// Async actions
export const promotionsGet = createAsyncThunk(
    "promotions/get",
    async (per_page, { rejectWithValue }) => {
        try {
            const queryParams = per_page ? `?per_page=${per_page}` : "";
            const response = await axiosInstance.get(
                `${endpoints.promotions.list}${queryParams}`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi lấy danh sách khuyến mãi",
            });
        }
    }
);

export const promotionsAdd = createAsyncThunk(
    "promotions/add",
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const userRole = checkRoleAndLogout(dispatch);
            if (userRole !== "Quản trị viên") {
                return rejectWithValue({
                    status: 403,
                    message: "Bạn không có quyền thêm khuyến mãi",
                });
            }
            const response = await axiosInstance.post(
                endpoints.promotions.create,
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
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi thêm khuyến mãi",
                errors: error.response?.data?.errors || [],
            });
        }
    }
);

export const promotionsDelete = createAsyncThunk(
    "promotions/delete",
    async (id, { dispatch, rejectWithValue }) => {
        try {
            const userRole = checkRoleAndLogout(dispatch);
            if (userRole !== "Quản trị viên") {
                return rejectWithValue({
                    status: 403,
                    message: "Bạn không có quyền xóa khuyến mãi",
                });
            }

            await axiosInstance.delete(endpoints.promotions.delete(id));
            return id;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi xóa khuyến mãi",
            });
        }
    }
);

export const promotionsUpdate = createAsyncThunk(
    "promotions/update",
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const userRole = checkRoleAndLogout(dispatch);
            if (userRole !== "Quản trị viên") {
                return rejectWithValue({
                    status: 403,
                    message: "Bạn không có quyền cập nhật khuyến mãi",
                });
            }

            const response = await axiosInstance.post(
                endpoints.promotions.update(data.id),
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
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi cập nhật khuyến mãi",
                errors: error.response?.data?.errors || [],
            });
        }
    }
);

export const promotionsGetById = createAsyncThunk(
    "promotions/getById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                endpoints.promotions.detail(id)
            );
            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi lấy thông tin khuyến mãi",
            });
        }
    }
);

export const promotionsearch = createAsyncThunk(
    "promotions/search",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                `${endpoints.promotions.search}?search=${data.search}&page=${data.page}&per_page=${data.per_page}`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi tìm kiếm khuyến mãi",
            });
        }
    }
);
export const promotionGetClient = createAsyncThunk(
    "promotions/getpromotionsClient",
    async (per_page) => {
        const queryParams = per_page ? `?per_page=${per_page}` : "";
        const response = await axiosInstance.get(
            `${endpoints.promotions.listClient}${queryParams}`
        );

        return response.data;
    }
);

// Initial state
const initialState = {
    promotions: { data: [] },
    promotion: {},
    status: "idle",
    error: null,
    loading: false,
};

// Slice
const promotionslice = createSlice({
    name: "promotion",
    initialState,
    reducers: {
        resetpromotionstate: (state) => {
            state.status = "idle";
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Get promotions
            .addCase(promotionsGet.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(promotionsGet.fulfilled, (state, action) => {
                state.promotions = action.payload;
                state.loading = false;
            })
            .addCase(promotionsGet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || action.error.message;
            })
            // Add promotion
            .addCase(promotionsAdd.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(promotionsAdd.fulfilled, (state, action) => {
                state.promotions.data.push(action.payload.data);
                state.loading = false;
            })
            .addCase(promotionsAdd.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload?.message || "Lỗi khi thêm khuyến mãi";
            })
            // Delete promotion
            .addCase(promotionsDelete.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(promotionsDelete.fulfilled, (state, action) => {
                state.promotions.data = state.promotions.data.filter(
                    (item) => item.id !== action.payload
                );
                state.loading = false;
            })
            .addCase(promotionsDelete.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload?.message || "Lỗi khi xóa khuyến mãi";
            })
            // Update promotion
            .addCase(promotionsUpdate.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(promotionsUpdate.fulfilled, (state, action) => {
                state.promotions.data = state.promotions.data.map((item) =>
                    item.id === action.payload.data.id
                        ? action.payload.data
                        : item
                );
                state.loading = false;
            })
            .addCase(promotionsUpdate.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload?.message || "Lỗi khi cập nhật khuyến mãi";
            })
            // Get promotion by ID
            .addCase(promotionsGetById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(promotionsGetById.fulfilled, (state, action) => {
                state.promotion = action.payload;
                state.loading = false;
            })
            .addCase(promotionsGetById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || action.error.message;
            })
            // Search promotions
            .addCase(promotionsearch.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(promotionsearch.fulfilled, (state, action) => {
                state.promotions = action.payload?.data
                    ? action.payload
                    : { data: [] };
                state.loading = false;
            })
            .addCase(promotionsearch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || action.error.message;
            })
            .addCase(promotionGetClient.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(promotionGetClient.fulfilled, (state, action) => {
                state.promotions = action.payload;
                state.loading = false;
            })
            .addCase(promotionGetClient.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { resetpromotionstate } = promotionslice.actions;
export default promotionslice.reducer;
