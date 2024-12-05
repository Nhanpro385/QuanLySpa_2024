// Product Slice
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
export const productGet = createAsyncThunk(
    "product/get",
    async (per_page, { rejectWithValue }) => {
        try {
            // Xây dựng query parameters chỉ với `per_page` nếu có
            const queryParams = per_page
                ? `?per_page=${per_page}&productImages=true`
                : "";

            // Gọi API
            const response = await axiosInstance.get(
                `${endpoints.Products.list}${queryParams}?productImages=true`
            );

            // Trả về dữ liệu response
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
    async (data, { dispatch, rejectWithValue }) => {
        const userRole = checkRoleAndLogout(dispatch);
        if (userRole !== "Quản trị viên") {
            return rejectWithValue({
                status: 403,
                message: "Bạn không có quyền thêm sản phẩm",
            });
        }

        try {
            const response = await axiosInstance.post(
                endpoints.Products.create,
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
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
    async (id, { dispatch, rejectWithValue }) => {
        const userRole = checkRoleAndLogout(dispatch);
        if (userRole !== "Quản trị viên") {
            return rejectWithValue({
                status: 403,
                message: "Bạn không có quyền xóa sản phẩm",
            });
        }

        try {
            const res = await axiosInstance.delete(
                endpoints.Products.delete(id)
            );
            return res.data;
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
    async (data, { dispatch, rejectWithValue }) => {
        const userRole = checkRoleAndLogout(dispatch);
        if (userRole !== "Quản trị viên") {
            return rejectWithValue({
                status: 403,
                message: "Bạn không có quyền cập nhật sản phẩm",
            });
        }

        try {
            const response = await axiosInstance.post(
                endpoints.Products.update(data.id),
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
            const response = await axiosInstance.get(
                endpoints.Products.detail(id)
            );
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
export const productSearch = createAsyncThunk(
    "product/search",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                `${endpoints.Products.search}?search=${data.search}&page=${data.page}&per_page=${data.per_page}`
            );

            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi tìm kiếm sản phẩm",
            });
        }
    }
);
const initialState = {
    products: {
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
                state.products = action.payload;
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
                if (!state.products.data) {
                    state.products.data = [];
                }
                state.products.data.push(action.payload.data);
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
                if (action.payload.status == "success") {
                    state.products.data = state.products.data.filter(
                        (prod) => prod.id !== action.payload
                    );
                } else {
                    state.error = action.payload.message;
                }
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
                state.products.data = state.products.data.map((prod) =>
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
                state.productsDetail = action.payload;
                state.loading = false;
            })
            .addCase(productGetById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(productSearch.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(productSearch.fulfilled, (state, action) => {
                if (action.payload.data == undefined) {
                    state.products = {
                        data: [],
                    };
                } else {
                    state.products = action.payload;
                }
                state.loading = false;
            })
            .addCase(productSearch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default productSlice.reducer;
