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
export const categoriesGet = createAsyncThunk(
    "categories/get",
    async (per_page) => {
        try {
            // Xây dựng query parameters chỉ với `per_page` nếu có
            const queryParams = per_page ? `?per_page=${per_page}` : "";

            // Gọi API
            const response = await axiosInstance.get(
                `${endpoints.ProductsCategories.list}${queryParams}`
            );

            // Trả về dữ liệu response
            return response.data;
        } catch (error) {
            // Trả về lỗi với rejectWithValue
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi lấy danh sách người dùng",
            });
        }
    }
);

// check role
export const categoriesAdd = createAsyncThunk(
    "categories/add",
    async (data, { dispatch, rejectWithValue }) => {
        const userRole = checkRoleAndLogout(dispatch);
        if (userRole !== "Quản trị viên") {
            return rejectWithValue({
                status: 403,
                message: "Bạn không có quyền thêm danh mục",
            });
        }

        try {
            const response = await axiosInstance.post(
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
// check role
export const categoriesDelete = createAsyncThunk(
    "categories/delete",
    async (id, { dispatch, rejectWithValue }) => {
        const userRole = checkRoleAndLogout(dispatch);
        if (userRole !== "Quản trị viên") {
            return rejectWithValue({
                status: 403,
                message: "Bạn không có quyền xóa danh mục",
            });
        }

        try {
            await axiosInstance.delete(endpoints.ProductsCategories.delete(id));
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
// check role
export const categoriesUpdate = createAsyncThunk(
    "categories/update",
    async (data, { dispatch, rejectWithValue }) => {
        const userRole = checkRoleAndLogout(dispatch);
        if (userRole !== "Quản trị viên") {
            return rejectWithValue({
                status: 403,
                message: "Bạn không có quyền cập nhật danh mục",
            });
        }

        try {
            const response = await axiosInstance.put(
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
        const response = await axiosInstance.get(
            endpoints.ProductsCategories.detail(id)
        );
        return response.data;
    }
);
export const categoriesSearch = createAsyncThunk(
    "categories/search",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                `${endpoints.ProductsCategories.search}?search=${data.search}&page=${data.page}&per_page=${data.per_page}`
            );

            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi tìm kiếm danh mục",
            });
        }
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
            })
            .addCase(categoriesSearch.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(categoriesSearch.fulfilled, (state, action) => {
                if (action.payload.data == undefined) {
                    state.categories = {
                        data: [],
                    };
                } else {
                    state.categories = action.payload;
                }
                state.loading = false;
            })
            .addCase(categoriesSearch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            });
    },
});

export default categoriesSlice.reducer;
