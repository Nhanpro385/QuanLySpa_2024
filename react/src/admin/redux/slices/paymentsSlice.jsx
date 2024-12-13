// User Slice
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
import endpoints from "../../config/appConfig";
import { logout } from "./authSlice";

const checkRoleAndLogout = (dispatch) => {
    const userRole = localStorage.getItem("role");

    if (!userRole) {
        dispatch(logout());
    }

    return userRole;
};

export const PaymentsGet = createAsyncThunk(
    "Payments/get",
    async (per_page, { rejectWithValue }) => {
        try {
            // Xây dựng query parameters chỉ với `per_page` nếu có
            const queryParams = per_page ? `?per_page=${per_page}` : "";

            // Gọi API
            const response = await axiosInstance.get(
                `${endpoints.Payments.list}${queryParams}`
            );

            // Trả về dữ liệu response
            return response.data;
        } catch (error) {
            // Trả về lỗi với rejectWithValue
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi lấy danh sách thanh toán",
            });
        }
    }
);

export const PaymentsAdd = createAsyncThunk(
    "Payments/add",
    async (data, { dispatch, rejectWithValue }) => {
        const userRole = checkRoleAndLogout(dispatch);
        if (userRole !== "Quản trị viên") {
            return rejectWithValue({
                status: 403,
                message: "Bạn không có quyền thêm thanh toán",
            });
        }

        try {
            const response = await axiosInstance.post(
                endpoints.Payments.create,
                data
            );
            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message: error.response?.data?.message || "Có lỗi xảy ra",
                errors: error.response?.data?.errors || [],
                error: error.response?.data?.error || "",
            });
        }
    }
);
export const PaymentsDelete = createAsyncThunk(
    "Payments/delete",
    async (id, { dispatch, rejectWithValue }) => {
        const userRole = checkRoleAndLogout(dispatch);
        if (userRole !== "Quản trị viên") {
            return rejectWithValue({
                status: 403,
                message: "Bạn không có quyền xóa thanh toán",
            });
        }

        try {
            await axiosInstance.delete(endpoints.Payments.delete(id));
            return id;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi xóa thanh toán",
            });
        }
    }
);
export const PaymentsUpdate = createAsyncThunk(
    "Payments/update",
    async (data, { dispatch, rejectWithValue }) => {
        const userRole = checkRoleAndLogout(dispatch);
        if (userRole !== "Quản trị viên") {
            return rejectWithValue({
                status: 403,
                message: "Bạn không có quyền cập nhật thanh toán",
            });
        }

        try {
            const response = await axiosInstance.put(
                endpoints.Payments.update(data.id),
                data.data
            );
            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi cập nhật thanh toán",
                errors: error.response?.data?.errors || [],
            });
        }
    }
);
export const PaymentsGetById = createAsyncThunk(
    "Payments/getById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                endpoints.Payments.detail(id)
            );
            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi lấy thông tin thanh toán",
            });
        }
    }
);
export const Paymentsearch = createAsyncThunk(
    "Payments/search",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                `${endpoints.Payments.search}?search=${data.search}&page=${data.page}&per_page=${data.per_page}&sort_order=${data.sort}&status[eq]=${data.status}`
            );

            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi tìm kiếm thanh toán",
            });
        }
    }
);
export const getPaymentsShift = createAsyncThunk(
    "Payments/getShift",
    async (per_page, { rejectWithValue }) => {
        try {
            const queryParams = per_page ? `&per_page=${per_page}` : "";

            // Gọi API
            const response = await axiosInstance.get(
                `${endpoints.Payments.getstaffshift}${queryParams}`
            );

            // Trả về dữ liệu response
            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi lấy thông tin ca làm việc",
            });
        }
    }
);

const initialState = {
    Payments: {
        data: [],
    },
    Payment: {},
    status: "idle",
    error: null,
    loading: false,
};

const Paymentslice = createSlice({
    name: "user",

    initialState,
    reducers: {
        resetPaymentstate: (state) => {
            state.status = "idle";
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(PaymentsGet.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(PaymentsGet.fulfilled, (state, action) => {
                state.Payments = action.payload;
                state.loading = false;
            })
            .addCase(PaymentsGet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(PaymentsAdd.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(PaymentsAdd.fulfilled, (state, action) => {
                if (!state.Payments.data) {
                    state.Payments.data = [];
                }
                state.Payments.data.push(action.payload.data);
                state.loading = false;
            })
            .addCase(PaymentsAdd.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(PaymentsDelete.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(PaymentsDelete.fulfilled, (state, action) => {
                state.Payments.data = state.Payments.data.filter(
                    (cate) => cate.id !== action.payload
                );
                state.loading = false;
            })
            .addCase(PaymentsDelete.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message; // Nhận thông báo lỗi
            })
            .addCase(PaymentsUpdate.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(PaymentsUpdate.fulfilled, (state, action) => {
                state.Payments.data = state.Payments.data.map((cate) =>
                    cate.id === action.payload?.data?.id
                        ? action.payload.data
                        : cate
                );
                state.loading = false;
            })
            .addCase(PaymentsUpdate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message; // Nhận thông báo lỗi
            })
            .addCase(PaymentsGetById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(PaymentsGetById.fulfilled, (state, action) => {
                state.Payment = action.payload;
                state.loading = false;
            })
            .addCase(PaymentsGetById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(Paymentsearch.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(Paymentsearch.fulfilled, (state, action) => {
                if (action.payload.data == undefined) {
                    state.Payments = {
                        data: [],
                    };
                } else {
                    state.Payments = action.payload;
                }

                state.loading = false;
            })
            .addCase(Paymentsearch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getPaymentsShift.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPaymentsShift.fulfilled, (state, action) => {
                state.Payments = action.payload;
                state.loading = false;
            })
            .addCase(getPaymentsShift.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});
export default Paymentslice.reducer;
