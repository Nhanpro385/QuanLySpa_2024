// Product Slice
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import endpoints from "../../config/appConfig";

export const productGet = createAsyncThunk(
    "product/get",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(endpoints.Products.list);
            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi lấy danh sách sản phẩm",
            });
        }
    }
);
export const productAdd = createAsyncThunk(
    "product/add",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(endpoints.Products.create, data,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response);
            
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
export const productDelete = createAsyncThunk(
    "product/delete",
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(endpoints.Products.delete(id));
            return id;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi xóa sản phẩm",
            });
        }
    }
);
export const productUpdate = createAsyncThunk(
    "product/update",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                endpoints.Products.update(data.id),
                data
            );
            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi cập nhật sản phẩm",
                errors: error.response?.data?.errors || [],
            });
        }
    }
);
export const productGetById = createAsyncThunk(
    "product/getById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(endpoints.Products.detail(id));
            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi lấy thông tin sản phẩm",
            });
        }
    }
);
const initialState = {
    product: {
        data: [],
    },
    productDetail: {},
    status: "idle",
    error: null,
    loading: false,
};

const productSlice = createSlice({
    name: "product",

    initialState,
    reducers: {
        resetProductState: (state) => {
            state.status = "idle";
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(productGet.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(productGet.fulfilled, (state, action) => {
                

                state.product = action.payload;
                state.loading = false;
            })
            .addCase(productGet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(productAdd.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(productAdd.fulfilled, (state, action) => {
                if (!state.product.data) {
                    state.product.data = [];
                }
                state.product.data.push(action.payload.data);
                state.loading = false;
            })
            .addCase(productAdd.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(productDelete.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(productDelete.fulfilled, (state, action) => {

                state.product.data = state.product.data.filter(
                    (prod) => prod.id !== action.payload
                );
                state.loading = false;
            })
            .addCase(productDelete.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message; // Nhận thông báo lỗi
            })
            .addCase(productUpdate.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(productUpdate.fulfilled, (state, action) => {
               

                state.product.data = state.product.data.map((prod) =>
                    prod.id === action.payload.data.id
                        ? action.payload.data
                        : prod
                );
                state.loading = false;
            })
            .addCase(productUpdate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message; // Nhận thông báo lỗi
            })
            .addCase(productGetById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(productGetById.fulfilled, (state, action) => {
                state.productDetail = action.payload;
                state.loading = false;
            })
            .addCase(productGetById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default productSlice.reducer;
