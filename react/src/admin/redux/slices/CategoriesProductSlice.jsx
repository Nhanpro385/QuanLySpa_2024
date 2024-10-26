import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import endpoints from "../../config/appConfig";

export const categoriesGet = createAsyncThunk("categories/get", async () => {
    const response = await axios.get(endpoints.ProductsCategories.list);
    return response.data;
});

export const categoriesAdd = createAsyncThunk(
    "categories/add",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                endpoints.ProductsCategories.create,
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

export const categoriesDelete = createAsyncThunk(
    "categories/delete",
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(endpoints.ProductsCategories.delete(id));
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

export const categoriesUpdate = createAsyncThunk(
    "categories/update",
    async (data, { rejectWithValue }) => {
        try {
            console.log("data", data);

            const response = await axios.put(
                endpoints.ProductsCategories.update(data.id),
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
export const categoriesGetById = createAsyncThunk(
    "categories/getById",
    async (id) => {
        const response = await axios.get(
            endpoints.ProductsCategories.detail(id)
        );
        return response.data;
    }
);

const initialState = {
    categories: {
        data: [],
    },
    category: {},
    loading: false,
    error: null,
};

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(categoriesGet.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(categoriesGet.fulfilled, (state, action) => {
                state.categories = action.payload;
                state.loading = false;
            })
            .addCase(categoriesGet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(categoriesAdd.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(categoriesAdd.fulfilled, (state, action) => {
                state.categories.data.push(action.payload.data);
                state.loading = false;
            })
            .addCase(categoriesAdd.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(categoriesDelete.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(categoriesDelete.fulfilled, (state, action) => {
                console.log(action.payload);

                state.categories.data = state.categories.data.filter(
                    (cate) => cate.id !== action.payload
                );
                state.loading = false;
            })
            .addCase(categoriesDelete.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message; // Nhận thông báo lỗi
            })
            .addCase(categoriesUpdate.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(categoriesUpdate.fulfilled, (state, action) => {
                console.log(action.payload.data.id);

                state.categories.data = state.categories.data.map((cate) =>
                    cate.id === action.payload.data.id
                        ? action.payload.data
                        : cate
                );
                state.loading = false;
            })
            .addCase(categoriesUpdate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message; // Nhận thông báo lỗi
            })
            .addCase(categoriesGetById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(categoriesGetById.fulfilled, (state, action) => {
                state.category = action.payload;
                state.loading = false;
            })
            .addCase(categoriesGetById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default categoriesSlice.reducer;
