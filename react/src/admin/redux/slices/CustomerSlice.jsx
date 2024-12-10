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

export const CustomerGet = createAsyncThunk(
    "Customer/get",
    async (per_page, { rejectWithValue }) => {
        try {
            // Xây dựng query parameters chỉ với `per_page` nếu có
            const queryParams = per_page ? `?per_page=${per_page}` : "";
            const response = await axiosInstance.get(
                `${endpoints.Customers.list}${queryParams}`
            );

            // Trả về dữ liệu response
            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi lấy danh sách khách hàng",
            });
        }
    }
);

// AsyncThunk for adding a customer
export const CustomerAdd = createAsyncThunk(
    "Customer/add",
    async (data, { dispatch, rejectWithValue }) => {
        const userRole = checkRoleAndLogout(dispatch);
        if (userRole !== "Quản trị viên") {
            return rejectWithValue({
                status: 403,
                message: "Bạn không có quyền thêm khách hàng",
            });
        }

        try {
            const response = await axiosInstance.post(
                endpoints.Customers.create,
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

// AsyncThunk for deleting a customer
export const CustomerDelete = createAsyncThunk(
    "Customer/delete",
    async (id, { dispatch, rejectWithValue }) => {
        const userRole = checkRoleAndLogout(dispatch);
        if (userRole !== "Quản trị viên") {
            return rejectWithValue({
                status: 403,
                message: "Bạn không có quyền xóa khách hàng",
            });
        }

        try {
            const res = await axiosInstance.delete(
                endpoints.Customers.delete(id)
            );
            return res.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi xóa khách hàng",
            });
        }
    }
);

// AsyncThunk for updating a customer
export const CustomerUpdate = createAsyncThunk(
    "Customer/update",
    async (data, { dispatch, rejectWithValue }) => {
        const userRole = checkRoleAndLogout(dispatch);
        if (userRole !== "Quản trị viên") {
            return rejectWithValue({
                status: 403,
                message: "Bạn không có quyền cập nhật khách hàng",
            });
        }

        try {
            const response = await axiosInstance.put(
                endpoints.Customers.update(data.id),
                data
            );
            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi cập nhật khách hàng",
                errors: error.response?.data?.errors || [],
                error: error.response?.data?.error || {},
            });
        }
    }
);

// AsyncThunk for fetching customer by ID
export const CustomerGetbyId = createAsyncThunk(
    "Customer/getbyid",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                endpoints.Customers.detail(id)
            );
            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi lấy chi tiết khách hàng",
            });
        }
    }
);
export const CustomerSearch = createAsyncThunk(
    "Customer/search",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                `${endpoints.Customers.search}?search=${data.search}&page=${data.page}&per_page=${data.per_page}`
            );

            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi tìm kiếm khách hàng",
            });
        }
    }
);
// Initial state for customers slice
const initialState = {
    customers: {
        data: [],
    },
    customer: {}, // Single customer detail
    loading: false, // Loading state
    error: null, // Error state
};

// Customer slice with reducers and extraReducers
const CustomerSlice = createSlice({
    name: "customers",
    initialState,
    reducers: {
        setCustomer: (state, action) => {
            state.customer = action.payload; // Set customer manually
        },
    },
    extraReducers: (builder) => {
        builder
            // Customer Get
            .addCase(CustomerGet.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(CustomerGet.fulfilled, (state, action) => {
                state.customers = action.payload;
                state.loading = false;
            })
            .addCase(CustomerGet.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload?.message || "Failed to load customers";
            })
            // Customer Add
            .addCase(CustomerAdd.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(CustomerAdd.fulfilled, (state, action) => {
                console.log(action.payload);

                state.customers.data.push(action.payload);
                state.loading = false;
            })
            .addCase(CustomerAdd.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload?.message || "Failed to add customer";
            })
            // Customer Delete
            .addCase(CustomerDelete.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(CustomerDelete.fulfilled, (state, action) => {
                state.customers.data = state.customers.data.filter(
                    (customer) => customer.id !== action.payload
                );
                state.loading = false;
            })
            .addCase(CustomerDelete.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload?.message || "Failed to delete customer";
            })
            // Customer Update
            .addCase(CustomerUpdate.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(CustomerUpdate.fulfilled, (state, action) => {
                

                state.customers.data = state.customers.data.map((customer) =>
                    customer.id === action.payload.data.id
                        ? action.payload.data
                        : customer
                );
                state.loading = false;
            })
            .addCase(CustomerUpdate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to update customer";
            })
            // Customer Get by ID
            .addCase(CustomerGetbyId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(CustomerGetbyId.fulfilled, (state, action) => {
                state.customer = action.payload;
                state.loading = false;
            })
            .addCase(CustomerGetbyId.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload?.message || "Failed to get customer details";
            })
            .addCase(CustomerSearch.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(CustomerSearch.fulfilled, (state, action) => {
                if (action.payload.data == undefined) {
                    state.customers = {
                        data: [],
                    };
                } else {
                    state.customers = action.payload;
                }
                state.loading = false;
            })
            .addCase(CustomerSearch.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload?.message || "Failed to search customers";
            });
    },
});
export default CustomerSlice.reducer;
