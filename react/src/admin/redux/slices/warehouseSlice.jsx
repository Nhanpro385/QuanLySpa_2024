import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import endpoints from "../../config/appConfig";
import axiosInstance from "../../config/axiosInstance";
export const warehouseImport = createAsyncThunk(
    "warehouse/import",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(
                endpoints.warehouse.import,
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
export const warehouseExport = createAsyncThunk(
    "warehouse/export",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(
                endpoints.warehouse.export,
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
export const getInventory = createAsyncThunk(
    "warehouse/inventory",
    async () => {
        const response = await axiosInstance.get(endpoints.warehouse.inventory);
        return response.data;
    }
);
export const getWarehouse = createAsyncThunk(
    "warehouse/getwarehouse",
    async () => {
        const response = await axiosInstance.get(
            endpoints.warehouse.getwarehouse
        );
        return response.data;
    }
);

const initialState = {
    import: {
        loading: false,
        error: null,
        data: null,
    },
    export: {
        loading: false,
        error: null,
        data: null,
    },
    inventory: {
        data: [],
    },
    warehouse: {
        data: [],
    },
};

const warehouseSlice = createSlice({
    name: "warehouse",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder;
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
        builder.addCase(getWarehouse.pending, (state) => {
            state.warehouse.loading = true;
            state.warehouse.error = null;
        });
        builder.addCase(getWarehouse.fulfilled, (state, action) => {
            state.warehouse.loading = false;
            state.warehouse.data = action.payload;
        });
        builder.addCase(getWarehouse.rejected, (state, action) => {
            state.warehouse.loading = false;
            state.warehouse.error = action.payload;
        });
    },
});

export default warehouseSlice.reducer;
