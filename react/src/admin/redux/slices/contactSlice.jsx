import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
import endpoints from "../../config/appConfig";
import axios from "axios";
const checkRoleAndLogout = (dispatch) => {
    const userRole = localStorage.getItem("role");

    if (!userRole) {
        dispatch(logout());
    }

    return userRole;
};
export const getContactAdmin = createAsyncThunk(
    "contact/getContactAdmin",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(endpoints.contacts.list);
            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi lấy danh sách liên hệ",
                error:
                    error.response?.data?.error ||
                    "Có lỗi xảy ra khi lấy danh sách liên hệ",

                errors:
                    error.response?.data?.errors ||
                    "Có lỗi xảy ra khi lấy danh sách liên hệ",
            });
        }
    }
);
export const getContactDetail = createAsyncThunk(
    "contact/getContactDetail",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                endpoints.contacts.detail(id)
            );
            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi lấy chi tiết liên hệ",
                error:
                    error.response?.data?.error ||
                    "Có lỗi xảy ra khi lấy chi tiết liên hệ",
                errors:
                    error.response?.data?.errors ||
                    "Có lỗi xảy ra khi lấy chi tiết liên hệ",
            });
        }
    }
);
export const createContactAdmin = createAsyncThunk(
    "contact/createContactAdmin",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(
                endpoints.contacts.create,
                data
            );
            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi tạo liên hệ",
                error:
                    error.response?.data?.error ||
                    "Có lỗi xảy ra khi tạo liên hệ",
                errors:
                    error.response?.data?.errors ||
                    "Có lỗi xảy ra khi tạo liên hệ",
            });
        }
    }
);
export const createContactClient = createAsyncThunk(
    "contact/createContactClient",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                endpoints.contacts.createClient,
                data
            );
            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi tạo liên hệ",
                error:
                    error.response?.data?.error ||
                    "Có lỗi xảy ra khi tạo liên hệ",
                errors:
                    error.response?.data?.errors ||
                    "Có lỗi xảy ra khi tạo liên hệ",
            });
        }
    }
);
export const updateContactAdmin = createAsyncThunk(
    "contact/updateContactAdmin",
    async (data, { dispatch, rejectWithValue }) => {
        const roleError = checkRoleAndLogout(dispatch);
        if (roleError !== "Quản trị viên") {
            return rejectWithValue({
                status: 403,
                message: "Bạn không có quyền cập nhật liên hệ",
            });
        }

        try {
            const response = await axiosInstance.put(
                endpoints.contacts.update(data.id),
                data.data
            );
            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi cập nhật liên hệ",
                error:
                    error.response?.data?.error ||
                    "Có lỗi xảy ra khi cập nhật liên hệ",
                errors:
                    error.response?.data?.errors ||
                    "Có lỗi xảy ra khi cập nhật liên hệ",
            });
        }
    }
);
export const searchContactAdmin = createAsyncThunk(
    "contact/searchContactAdmin",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                `${endpoints.contacts.search}?search=${data.search}&per_page=${data.per_page}&page=${data.page}`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi tìm kiếm liên hệ",
                error:
                    error.response?.data?.error ||
                    "Có lỗi xảy ra khi tìm kiếm liên hệ",
                errors:
                    error.response?.data?.errors ||
                    "Có lỗi xảy ra khi tìm kiếm liên hệ",
            });
        }
    }
);

const initialState = {
    contacts: {
        data: [],
    },
    contactDetail: {},
    loading: false,
    error: {},
};

const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {
        clearContactDetail: (state) => {
            state.contactDetail = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getContactAdmin.pending, (state) => {
                state.loading = true;
            })
            .addCase(getContactAdmin.fulfilled, (state, action) => {
                state.contacts = action.payload;
                state.loading = false;
            })
            .addCase(getContactAdmin.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(getContactDetail.pending, (state) => {
                state.loading = true;
            })
            .addCase(getContactDetail.fulfilled, (state, action) => {
                state.contactDetail = action.payload;
                state.loading = false;
            })
            .addCase(getContactDetail.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(createContactAdmin.pending, (state) => {
                state.loading = true;
            })
            .addCase(createContactAdmin.fulfilled, (state, action) => {
                state.contacts.data.push(action.payload);
                state.loading = false;
            })
            .addCase(createContactAdmin.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(createContactClient.pending, (state) => {
                state.loading = true;
            })
            .addCase(createContactClient.fulfilled, (state, action) => {
                state.contacts.data.push(action.payload);
                state.loading = false;
            })
            .addCase(createContactClient.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(updateContactAdmin.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateContactAdmin.fulfilled, (state, action) => {
                console.log(action.payload);

                state.contactDetail = action.payload;
                state.loading = false;
            })
            .addCase(updateContactAdmin.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(searchContactAdmin.pending, (state) => {
                state.loading = true;
            })
            .addCase(searchContactAdmin.fulfilled, (state, action) => {
                state.contacts = action.payload;
                state.loading = false;
            })
            .addCase(searchContactAdmin.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    },
});
export const { clearContactDetail } = contactSlice.actions;
export default contactSlice.reducer;
