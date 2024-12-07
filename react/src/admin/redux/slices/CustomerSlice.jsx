import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import endpoints from "../../config/appConfig";
import axiosInstance from "../../config/axiosInstance";
// AsyncThunk for fetching customers list
export const CustomerGet = createAsyncThunk(
    "Customer/get",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(endpoints.Customers.list);

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
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(endpoints.Customers.create, data);
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
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(endpoints.Customers.delete(id));
            return id;
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
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.put(
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
            });
        }
    }
);

// AsyncThunk for fetching customer by ID
export const CustomerGetbyId = createAsyncThunk(
    "Customer/getbyid",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(endpoints.Customers.detail(id));
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
                state.customers.push(action.payload);
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
                console.log(action.payload);

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
                console.log(action.payload.data.id);

                state.customers.data = state.customers.data.map((customer) =>
                    customer.id === action.payload.data.id
                        ? action.payload.data
                        : customer
                );
                state.loading = false;
            })
            .addCase(CustomerUpdate.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload?.message || "Failed to update customer";
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
            });
    },
});
    
export default CustomerSlice.reducer;
