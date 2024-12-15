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
export const ServiceCategoriesGet = createAsyncThunk(
    "ServiceCategories/get",
    async (per_page) => {
        try {
            // Xây dựng query parameters chỉ với `per_page` nếu có
            const queryParams = per_page ? `?per_page=${per_page}` : "";

            // Gọi API
            const response = await axiosInstance.get(
                `${endpoints.ServiceCategories.list}${queryParams}`
            );

            // Trả về dữ liệu response
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const ServiceCategoriesAdd = createAsyncThunk(
    "ServiceCategories/add",
    async (data, { dispatch, rejectWithValue }) => {
        const userRole = checkRoleAndLogout(dispatch);
        if (userRole !== "Quản trị viên") {
            return rejectWithValue({
                status: 403,
                message: "Bạn không có quyền thêm danh mục dịch vụ",
            });
        }

        try {
            const response = await axiosInstance.post(
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
    async (id, { dispatch, rejectWithValue }) => {
        const userRole = checkRoleAndLogout(dispatch);
        if (userRole !== "Quản trị viên") {
            return rejectWithValue({
                status: 403,
                message: "Bạn không có quyền xóa danh mục dịch vụ",
            });
        }

        try {
            const res = await axiosInstance.delete(
                endpoints.ServiceCategories.delete(id)
            );
            return res.data;
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
    async (data, { dispatch, rejectWithValue }) => {
        const userRole = checkRoleAndLogout(dispatch);
        if (userRole !== "Quản trị viên") {
            return rejectWithValue({
                status: 403,
                message: "Bạn không có quyền cập nhật danh mục dịch vụ",
            });
        }

        try {
            const response = await axiosInstance.put(
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
                errors: error.response?.data?.errors || [],
                error: error.response?.data?.error || [],
            });
        }
    }
);
export const ServiceCategoriesSearch = createAsyncThunk(
    "ServiceCategories/search",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                `${endpoints.ServiceCategories.search}?search=${data.search}&page=${data.page}&per_page=${data.per_page}`
            );

            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi tìm kiếm",
            });
        }
    }
);

export const ServiceCategoriesGetById = createAsyncThunk(
    "ServiceCategories/getById",
    async (id) => {
        const response = await axiosInstance.get(
            endpoints.ServiceCategories.detail(id)
        );
        return response.data;
    }
);
export const ServiceCategoriesGetClient = createAsyncThunk(
    "ServiceCategories/getClient",
    async (per_page) => {
        const queryParams = per_page
            ? `?per_page=${per_page}&services=true`
            : "";
        const response = await axiosInstance.get(
            `${endpoints.ServiceCategories.listClient}${queryParams}`
        );
        return response.data;
    }
);
export const ServiceCategoriesGetClientById = createAsyncThunk(
    "ServiceCategories/getClientById",
    async (id) => {
        const response = await axiosInstance.get(
            endpoints.ServiceCategories.detailClient(id)
        );
        return response.data;
    }
);

const initialState = {
    ServiceCategories: {
        data: [],
    },
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
            })
            .addCase(ServiceCategoriesSearch.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(ServiceCategoriesSearch.fulfilled, (state, action) => {
                if (action.payload.data == undefined) {
                    state.ServiceCategories = {
                        data: [],
                    };
                } else {
                    state.ServiceCategories = action.payload;
                }
                state.loading = false;
            })
            .addCase(ServiceCategoriesSearch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(ServiceCategoriesGetClient.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(ServiceCategoriesGetClient.fulfilled, (state, action) => {
                state.ServiceCategories = action.payload;
                state.loading = false;
            })
            .addCase(ServiceCategoriesGetClient.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(ServiceCategoriesGetClientById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                ServiceCategoriesGetClientById.fulfilled,
                (state, action) => {
                    state.category = action.payload;
                    state.loading = false;
                }
            )
            .addCase(
                ServiceCategoriesGetClientById.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.error.message;
                }
            );
    },
});

export default ServiceCategoriesSlice.reducer;
