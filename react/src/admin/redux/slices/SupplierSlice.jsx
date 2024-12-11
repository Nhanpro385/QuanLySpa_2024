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
// AsyncThunk for fetching Suppliers list
export const SupplierGet = createAsyncThunk(
    "Supplier/get",
    async (per_page, { rejectWithValue }) => {
        try {
            const queryParams = per_page ? `?per_page=${per_page}` : "";
            const response = await axiosInstance.get(
                `${endpoints.Suppliers.list}${queryParams}`
            );

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

export const SupplierAdd = createAsyncThunk(
    "Supplier/add",
    async (data, { dispatch, rejectWithValue }) => {
        const userRole = checkRoleAndLogout(dispatch);
        if (userRole !== "Quản trị viên") {
            return rejectWithValue({
                status: 403,
                message: "Bạn không có quyền thêm nhà cung cấp",
            });
        }

        try {
            const response = await axiosInstance.post(
                endpoints.Suppliers.create,
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

// AsyncThunk for deleting a Supplier
export const SupplierDelete = createAsyncThunk(
    "Supplier/delete",
    async (id, { dispatch, rejectWithValue }) => {
        const userRole = checkRoleAndLogout(dispatch);
        if (userRole !== "Quản trị viên") {
            return rejectWithValue({
                status: 403,
                message: "Bạn không có quyền xóa nhà cung cấp",
            });
        }

        try {
            await axiosInstance.delete(endpoints.Suppliers.delete(id));
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

// AsyncThunk for updating a Supplier
export const SupplierUpdate = createAsyncThunk(
    "Supplier/update",
    async (data, { dispatch, rejectWithValue }) => {
        const userRole = checkRoleAndLogout(dispatch);
        if (userRole !== "Quản trị viên") {
            return rejectWithValue({
                status: 403,
                message: "Bạn không có quyền cập nhật nhà cung cấp",
            });
        }

        try {
            const response = await axiosInstance.put(
                endpoints.Suppliers.update(data.id),
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

// AsyncThunk for fetching Supplier by ID
export const SupplierGetbyId = createAsyncThunk(
    "Supplier/getbyid",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                endpoints.Suppliers.detail(id)
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
export const SupplierSearch = createAsyncThunk(
    "Supplier/search",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                `${endpoints.Suppliers.search}?search=${data.search}&page=${data.page}&per_page=${data.per_page}`
            );

            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi tìm kiếm nhà cung cấp",
            });
        }
    }
);
// Initial state for Suppliers slice
const initialState = {
    Suppliers: {
        data: [],
    },
    Supplier: {}, // Single Supplier detail
    loading: false, // Loading state
    error: null, // Error state
};

// Supplier slice with reducers and extraReducers
const SupplierSlice = createSlice({
    name: "Suppliers",
    initialState,
    reducers: {
        setSupplier: (state, action) => {
            state.Supplier = action.payload; // Set Supplier manually
        },
    },
    extraReducers: (builder) => {
        builder
            // Supplier Get
            .addCase(SupplierGet.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(SupplierGet.fulfilled, (state, action) => {
                state.Suppliers = action.payload;
                state.loading = false;
            })
            .addCase(SupplierGet.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload?.message || "Failed to load Suppliers";
            })
            // Supplier Add
            .addCase(SupplierAdd.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(SupplierAdd.fulfilled, (state, action) => {
                state.Suppliers.data.push(action.payload);
                state.loading = false;
            })
            .addCase(SupplierAdd.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Supplier Delete
            .addCase(SupplierDelete.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(SupplierDelete.fulfilled, (state, action) => {
                

                state.Suppliers.data = state.Suppliers.data.filter(
                    (Supplier) => Supplier.id !== action.payload
                );
                state.loading = false;
            })
            .addCase(SupplierDelete.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload?.message || "Failed to delete Supplier";
            })
            // Supplier Update
            .addCase(SupplierUpdate.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(SupplierUpdate.fulfilled, (state, action) => {
                console.log(action.payload.data.id);

                state.Suppliers.data = state.Suppliers.data.map((Supplier) =>
                    Supplier.id === action.payload.data.id
                        ? action.payload.data
                        : Supplier
                );
                state.loading = false;
            })
            .addCase(SupplierUpdate.rejected, (state, action) => {
                state.loading = false;

                state.error = action.payload;
            })
            // Supplier Get by ID
            .addCase(SupplierGetbyId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(SupplierGetbyId.fulfilled, (state, action) => {
                state.Supplier = action.payload;
                state.loading = false;
            })
            .addCase(SupplierGetbyId.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload?.message || "Failed to get Supplier details";
            })
            .addCase(SupplierSearch.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(SupplierSearch.fulfilled, (state, action) => {
                if (action.payload.data == undefined) {
                    state.Suppliers = {
                        data: [],
                    };
                } else {
                    state.Suppliers = action.payload;
                }

                state.loading = false;
            })
            .addCase(SupplierSearch.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload?.message || "Failed to search Suppliers";
            });
    },
});

export default SupplierSlice.reducer;
