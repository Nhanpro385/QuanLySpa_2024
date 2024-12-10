import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
import endpoints from "../../config/appConfig";
import { logout } from "./authSlice";

// Function to check role and logout if no role is found
const checkRoleAndLogout = (dispatch) => {
    const userRole = localStorage.getItem("role");
    if (!userRole) {
        dispatch(logout());
    }
    return userRole;
};

// Async thunk for warehouse import
export const warehouseImport = createAsyncThunk(
    "warehouse/import",
    async (data, { dispatch, rejectWithValue }) => {
        const userRole = checkRoleAndLogout(dispatch);
        if (userRole !== "Quản trị viên") {
            return rejectWithValue({
                status: 403,
                message: "Bạn không có quyền nhập kho",
            });
        }

        try {
            const response = await axiosInstance.post(
                endpoints.warehouse.import,
                data
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// Async thunk for warehouse export
export const warehouseExport = createAsyncThunk(
    "warehouse/export",
    async (data, { dispatch, rejectWithValue }) => {
        const userRole = checkRoleAndLogout(dispatch);
        if (userRole !== "Quản trị viên") {
            return rejectWithValue({
                status: 403,
                message: "Bạn không có quyền xuất kho",
            });
        }

        try {
            const response = await axiosInstance.post(
                endpoints.warehouse.export,
                data
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// Async thunk for retrieving inventory
export const getInventory = createAsyncThunk(
    "warehouse/inventory",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                endpoints.warehouse.inventory
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);
export const searchInventory = createAsyncThunk(
    "warehouse/searchinventory",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                `${endpoints.warehouse.inventory}?search=${data.search}&page=${data.page}&per_page=${data.per_page}`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);
export const getInventoryDetail = createAsyncThunk(
    "warehouse/getinventorydetail",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                endpoints.warehouse.getInventoryDetail(id)
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);
export const historyinventory = createAsyncThunk(
    "warehouse/historyinventory",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                endpoints.warehouse.historyinventory(id)
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// Async thunk for retrieving warehouse import history
export const getWarehouseImport = createAsyncThunk(
    "warehouse/getwarehouseimport",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                endpoints.warehouse.getImport
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// Async thunk for retrieving warehouse export history
export const getWarehouseExport = createAsyncThunk(
    "warehouse/getwarehouseexport",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                endpoints.warehouse.getExport
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);
export const searchWarehouseImport = createAsyncThunk(
    "warehouse/searchwarehouseimport",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                `${endpoints.warehouse.getImport}?search=${data.search}&page=${data.page}&per_page=${data.per_page}`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);
export const searchWarehouseExport = createAsyncThunk(
    "warehouse/searchwarehouseexport",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                `${endpoints.warehouse.getExport}?search=${data.search}&page=${data.page}&per_page=${data.per_page}`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);
export const getImportDetail = createAsyncThunk(
    "warehouse/getimportdetail",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                endpoints.warehouse.getImportDetail(id)
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);
export const getExportDetail = createAsyncThunk(
    "warehouse/getexportdetail",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                endpoints.warehouse.getExportDetail(id)
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);
export const updateImport = createAsyncThunk(
    "warehouse/updateimport",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(
                endpoints.warehouse.updateImport(data.id),
                data.data
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);
export const updateExport = createAsyncThunk(
    "warehouse/updateexport",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(
                endpoints.warehouse.updateExport(data.id),
                data.data
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// Error handling utility
const handleError = (error) => ({
    status: error.response?.status || 500,
    message: error.response?.data?.message || "Có lỗi xảy ra",
    errors: error.response?.data?.errors || [],
    error: error.response?.data.error || {},
});

// Initial state
const initialState = {
    import: {
        loading: false,
        error: null,
        data: null,
        detail: null,
    },
    export: {
        loading: false,
        error: null,
        data: null,
        detail: null,
    },
    inventory: {
        loading: false,
        error: null,
        data: [],
        detail: null,
        history: null,
    },
};

// Warehouse slice
const warehouseSlice = createSlice({
    name: "warehouse",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Warehouse Import
        builder.addCase(warehouseImport.pending, (state) => {
            state.import.loading = true;
            state.import.error = null;
        });
        builder.addCase(warehouseImport.fulfilled, (state, action) => {
            state.import.loading = false;
            state.import.data = action.payload;
        });
        builder.addCase(warehouseImport.rejected, (state, action) => {
            state.import.loading = false;
            state.import.error = action.payload;
        });

        // Warehouse Export
        builder.addCase(warehouseExport.pending, (state) => {
            state.export.loading = true;
            state.export.error = null;
        });
        builder.addCase(warehouseExport.fulfilled, (state, action) => {
            state.export.loading = false;
            state.export.data = action.payload;
        });
        builder.addCase(warehouseExport.rejected, (state, action) => {
            state.export.loading = false;
            state.export.error = action.payload;
        });

        // Inventory
        builder.addCase(getInventory.pending, (state) => {
            state.inventory.loading = true;
            state.inventory.error = null;
        });
        builder.addCase(getInventory.fulfilled, (state, action) => {
            state.inventory.loading = false;
            state.inventory.data = action.payload;
        });
        builder.addCase(getInventory.rejected, (state, action) => {
            state.inventory.loading = false;
            state.inventory.error = action.payload;
        });

        // Warehouse Import History
        builder.addCase(getWarehouseImport.pending, (state) => {
            state.import.loading = true;
            state.import.error = null;
        });
        builder.addCase(getWarehouseImport.fulfilled, (state, action) => {
            state.import.loading = false;
            state.import.data = action.payload;
        });
        builder.addCase(getWarehouseImport.rejected, (state, action) => {
            state.warehouse.loading = false;
            state.warehouse.error = action.payload;
        });

        // Warehouse Export History
        builder.addCase(getWarehouseExport.pending, (state) => {
            state.export.loading = true;
            state.export.error = null;
        });
        builder.addCase(getWarehouseExport.fulfilled, (state, action) => {
            state.export.loading = false;
            state.export.data = action.payload;
        });
        builder.addCase(getWarehouseExport.rejected, (state, action) => {
            state.export.loading = false;
            state.export.error = action.payload;
        });
        builder.addCase(searchWarehouseImport.pending, (state) => {
            state.import.loading = true;
            state.import.error = null;
        });
        builder.addCase(searchWarehouseImport.fulfilled, (state, action) => {
            state.import.loading = false;
            state.import.data = action.payload;
        });
        builder.addCase(searchWarehouseImport.rejected, (state, action) => {
            state.import.loading = false;
            state.import.error = action.payload;
        });
        builder.addCase(searchWarehouseExport.pending, (state) => {
            state.export.loading = true;
            state.export.error = null;
        });
        builder.addCase(searchWarehouseExport.fulfilled, (state, action) => {
            state.export.loading = false;
            state.export.data = action.payload;
        });
        builder.addCase(searchWarehouseExport.rejected, (state, action) => {
            state.export.loading = false;
            state.export.error = action.payload;
        });
        builder.addCase(getImportDetail.pending, (state) => {
            state.import.loading = true;
            state.import.error = null;
        });
        builder.addCase(getImportDetail.fulfilled, (state, action) => {
            state.import.loading = false;
            state.import.detail = action.payload;
        });
        builder.addCase(getImportDetail.rejected, (state, action) => {
            state.import.loading = false;
            state.import.error = action.payload;
        });
        builder.addCase(getExportDetail.pending, (state) => {
            state.export.loading = true;
            state.export.error = null;
        });
        builder.addCase(getExportDetail.fulfilled, (state, action) => {
            state.export.loading = false;
            state.export.detail = action.payload;
        });
        builder.addCase(getExportDetail.rejected, (state, action) => {
            state.export.loading = false;
            state.export.error = action.payload;
        });
        builder.addCase(updateImport.pending, (state) => {
            state.import.loading = true;
            state.import.error = null;
        });
        builder.addCase(updateImport.fulfilled, (state, action) => {
            state.import.loading = false;
            state.import.data = action.payload;
        });
        builder.addCase(updateImport.rejected, (state, action) => {
            state.import.loading = false;
            state.import.error = action.payload;
        });
        builder.addCase(updateExport.pending, (state) => {
            state.export.loading = true;
            state.export.error = null;
        });
        builder.addCase(updateExport.fulfilled, (state, action) => {
            state.export.loading = false;
            state.export.data = action.payload;
        });
        builder.addCase(updateExport.rejected, (state, action) => {
            state.export.loading = false;
            state.export.error = action.payload;
        });
        builder.addCase(searchInventory.pending, (state) => {
            state.inventory.loading = true;
            state.inventory.error = null;
        });
        builder.addCase(searchInventory.fulfilled, (state, action) => {
            state.inventory.loading = false;
            state.inventory.data = action.payload;
        });
        builder.addCase(searchInventory.rejected, (state, action) => {
            state.inventory.loading = false;
            state.inventory.error = action.payload;
        });
        builder.addCase(getInventoryDetail.pending, (state) => {
            state.inventory.loading = true;
            state.inventory.error = null;
        });
        builder.addCase(getInventoryDetail.fulfilled, (state, action) => {
            state.inventory.loading = false;
            state.inventory.detail = action.payload;
        });
        builder.addCase(getInventoryDetail.rejected, (state, action) => {
            state.inventory.loading = false;
            state.inventory.error = action.payload;
        });
        builder.addCase(historyinventory.pending, (state) => {
            state.inventory.loading = true;
            state.inventory.error = null;
        });
        builder.addCase(historyinventory.fulfilled, (state, action) => {
            state.inventory.loading = false;
            state.inventory.history = action.payload;
        });
        builder.addCase(historyinventory.rejected, (state, action) => {
            state.inventory.loading = false;
            state.inventory.error = action.payload;
        });
    },
});

export default warehouseSlice.reducer;
