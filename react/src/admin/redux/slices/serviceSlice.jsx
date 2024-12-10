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

export const servicesGet = createAsyncThunk(
    "services/get",
    async (per_page, { rejectWithValue }) => {
        try {
            // Xây dựng query parameters chỉ với `per_page` nếu có
            const queryParams = per_page
                ? `?per_page=${per_page}&products=true`
                : "?products=true";

            // Gọi API
            const response = await axiosInstance.get(
                `${endpoints.services.list}${queryParams}`
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

export const servicesAdd = createAsyncThunk(
    "services/add",
    async (data, { dispatch, rejectWithValue }) => {
        const userRole = checkRoleAndLogout(dispatch);
        if (userRole !== "Quản trị viên") {
            return rejectWithValue({
                status: 403,
                message: "Bạn không có quyền thêm dịch vụ",
            });
        }

        try {
            console.log("data", data);

            const response = await axiosInstance.post(
                endpoints.services.create,
                data,
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
                message: error.response?.data?.message || "Có lỗi xảy ra",
                errors: error.response?.data?.errors || [],
            });
        }
    }
);

export const servicesDelete = createAsyncThunk(
    "services/delete",
    async (id, { dispatch, rejectWithValue }) => {
        const userRole = checkRoleAndLogout(dispatch);
        if (userRole !== "Quản trị viên") {
            return rejectWithValue({
                status: 403,
                message: "Bạn không có quyền xóa dịch vụ",
            });
        }
        try {
            const res = await axiosInstance.delete(
                endpoints.services.delete(id)
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

export const servicesUpdate = createAsyncThunk(
    "services/update",
    async ({ data, id }, { dispatch, rejectWithValue }) => {
        const userRole = checkRoleAndLogout(dispatch);
        if (userRole !== "Quản trị viên") {
            return rejectWithValue({
                status: 403,
                message: "Bạn không có quyền cập nhật dịch vụ",
            });
        }

        try {
            const response = await axiosInstance.post(
                endpoints.services.update(id),
                data,
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
                    "Có lỗi xảy ra khi cập nhật",
                errors: error.response?.data?.errors || [],
                error: error.response?.data?.error || {},
            });
        }
    }
);
export const servicesGetById = createAsyncThunk(
    "services/getById",
    async (id) => {
        const response = await axiosInstance.get(endpoints.services.detail(id));
        return response.data;
    }
);
export const servicesSearch = createAsyncThunk(
    "services/search",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                `${endpoints.services.search}?search=${data.search}&page=${data.page}&per_page=${data.per_page}`
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
export const servicesAddProduct = createAsyncThunk(
    "services/addProduct",
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(
                endpoints.services.addProduct(data.id),
                data.data
            );
            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi thêm sản phẩm",
            });
        }
    }
);
export const servicesUpdateProduct = createAsyncThunk(
    "services/updateProduct",
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(
                endpoints.services.updateProduct(data.id),
                data.data
            );
            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi cập nhật sản phẩm",
            });
        }
    }
);
export const servicesDetailClient = createAsyncThunk(
    "services/detailClient",
    async (id) => {
        const response = await axiosInstance.get(
            endpoints.services.detailClient(id)
        );
        return response.data;
    }
);
export const GetservicesClient = createAsyncThunk(
    "services/getservicesClient",
    async (per_page) => {
        const queryParams = per_page ? `?per_page=${per_page}` : "";
        const response = await axiosInstance.get(
            `${endpoints.services.listClient}${queryParams}`
        );

        return response.data;
    }
);

const initialState = {
    services: {
        data: [],
    },
    service: {},
    loading: false,
    error: null,
};

const servicesSlice = createSlice({
    name: "services",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(servicesGet.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(servicesGet.fulfilled, (state, action) => {
                state.services = action.payload;
                state.loading = false;
            })
            .addCase(servicesGet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(servicesAdd.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(servicesAdd.fulfilled, (state, action) => {
                state.services.data.push(action.payload.data);
                state.loading = false;
            })
            .addCase(servicesAdd.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(servicesDelete.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(servicesDelete.fulfilled, (state, action) => {
                state.services.data = state.services.data.filter(
                    (cate) => cate.id !== action.payload
                );
                state.loading = false;
            })
            .addCase(servicesDelete.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message; // Nhận thông báo lỗi
            })
            .addCase(servicesUpdate.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(servicesUpdate.fulfilled, (state, action) => {
                console.log(action.payload.data.id);

                state.services.data = state.services.data.map((cate) =>
                    cate.id === action.payload.data.id
                        ? action.payload.data
                        : cate
                );
                state.loading = false;
            })
            .addCase(servicesUpdate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(servicesGetById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(servicesGetById.fulfilled, (state, action) => {
                state.service = action.payload;
                state.loading = false;
            })
            .addCase(servicesGetById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(servicesSearch.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(servicesSearch.fulfilled, (state, action) => {
                if (action.payload.data == undefined) {
                    state.services = {
                        data: [],
                    };
                } else {
                    state.services = action.payload;
                }
                state.loading = false;
            })
            .addCase(servicesSearch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(servicesAddProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(servicesAddProduct.fulfilled, (state, action) => {
                state.service = action.payload;
                state.loading = false;
            })
            .addCase(servicesAddProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(servicesUpdateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(servicesUpdateProduct.fulfilled, (state, action) => {
                state.service = action.payload;
                state.loading = false;
            })
            .addCase(servicesUpdateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(servicesDetailClient.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(servicesDetailClient.fulfilled, (state, action) => {
                state.service = action.payload;
                state.loading = false;
            })
            .addCase(servicesDetailClient.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(GetservicesClient.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetservicesClient.fulfilled, (state, action) => {
                state.services = action.payload;
                state.loading = false;
            })
            .addCase(GetservicesClient.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default servicesSlice.reducer;
