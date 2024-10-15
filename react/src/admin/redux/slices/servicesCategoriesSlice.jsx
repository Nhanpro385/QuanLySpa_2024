import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import endpoints from "../../config/appConfig";

export const ServiceCategoriesGet = createAsyncThunk(
    "ServiceCategories/get",
    async () => {
        const response = await axios.get(endpoints.ServiceCategories.list);
        return response.data;
    }
);

export const ServiceCategoriesAdd = createAsyncThunk(
    "ServiceCategories/add",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                endpoints.ServiceCategories.create,
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

export const ServiceCategoriesDelete = createAsyncThunk(
    "ServiceCategories/delete",
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(endpoints.ServiceCategories.delete(id));
            return id;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message || "Có lỗi xảy ra khi xóa",
            });
        }
    }
);

export const ServiceCategoriesUpdate = createAsyncThunk(
    "ServiceCategories/update",
    async (data, { rejectWithValue }) => {
        try {
            console.log("data", data);

            const response = await axios.put(
                endpoints.ServiceCategories.update(data.id),
                data
            );
            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi cập nhật",
            });
        }
    }
);
export const ServiceCategoriesGetById = createAsyncThunk(
    "ServiceCategories/getById",
    async (id) => {
        const response = await axios.get(
            endpoints.ServiceCategories.detail(id)
        );
        return response.data;
    }
);

const initialState = {
    ServiceCategories: [],
    category: {},
    loading: false,
    error: null,
};

const ServiceCategoriesSlice = createSlice({
    name: "ServiceCategories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(ServiceCategoriesGet.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(ServiceCategoriesGet.fulfilled, (state, action) => {
                state.ServiceCategories = action.payload;
                state.loading = false;
            })
            .addCase(ServiceCategoriesGet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(ServiceCategoriesAdd.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(ServiceCategoriesAdd.fulfilled, (state, action) => {
                state.ServiceCategories.data.push(action.payload.data);
                state.loading = false;
            })
            .addCase(ServiceCategoriesAdd.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(ServiceCategoriesDelete.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(ServiceCategoriesDelete.fulfilled, (state, action) => {
                console.log(action.payload);

                state.ServiceCategories.data =
                    state.ServiceCategories.data.filter(
                        (cate) => cate.id !== action.payload
                    );
                state.loading = false;
            })
            .addCase(ServiceCategoriesDelete.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message; // Nhận thông báo lỗi
            })
            .addCase(ServiceCategoriesUpdate.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(ServiceCategoriesUpdate.fulfilled, (state, action) => {
                console.log(action.payload.data.id);

                state.ServiceCategories.data = state.ServiceCategories.data.map(
                    (cate) =>
                        cate.id === action.payload.data.id
                            ? action.payload.data
                            : cate
                );
                state.loading = false;
            })
            .addCase(ServiceCategoriesUpdate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message; // Nhận thông báo lỗi
            })
            .addCase(ServiceCategoriesGetById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(ServiceCategoriesGetById.fulfilled, (state, action) => {
                state.category = action.payload;
                state.loading = false;
            })
            .addCase(ServiceCategoriesGetById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default ServiceCategoriesSlice.reducer;
