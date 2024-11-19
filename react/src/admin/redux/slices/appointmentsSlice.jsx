import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import endpoints from "../../config/appConfig";
import axiosInstance from "../../config/axiosInstance";
import { logout } from "./authSlice";

const checkRoleAndLogout = (dispatch) => {
    const userRole = localStorage.getItem("role");

    if (!userRole) {
        dispatch(logout());
    }

    return userRole;
};
export const appointmentsGet = createAsyncThunk(
    "appointments/get",
    async () => {
        const response = await axiosInstance.get(endpoints.appointments.list);
        return response.data;
    }
);

export const appointmentsAdd = createAsyncThunk(
    "appointments/add",
    async (data, { dispatch, rejectWithValue }) => {
        const userRole = checkRoleAndLogout(dispatch);
        if (userRole !== "Quản trị viên") {
            return rejectWithValue({
                status: 403,
                message: "Bạn không có quyền thêm lịch hẹn",
            });
        }

        try {
            const response = await axiosInstance.post(
                endpoints.appointments.create,
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

export const appointmentsDelete = createAsyncThunk(
    "appointments/delete",
    async (id, { dispatch, rejectWithValue }) => {
        const userRole = checkRoleAndLogout(dispatch);
        if (userRole !== "Quản trị viên") {
            return rejectWithValue({
                status: 403,
                message: "Bạn không có quyền xóa lịch hẹn",
            });
        }

        try {
            await axiosInstance.delete(endpoints.appointments.delete(id));
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

export const appointmentsUpdate = createAsyncThunk(
    "appointments/update",
    async (data, { dispatch, rejectWithValue }) => {
        const userRole = checkRoleAndLogout(dispatch);
        if (userRole !== "Quản trị viên") {
            return rejectWithValue({
                status: 403,
                message: "Bạn không có quyền cập nhật lịch hẹn",
            });
        }

        try {
            const response = await axiosInstance.put(
                endpoints.appointments.update(data.id),
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
export const appointmentsGetById = createAsyncThunk(
    "appointments/getById",
    async (id) => {
        const response = await axiosInstance.get(
            endpoints.appointments.detail(id)
        );
        return response.data;
    }
);
export const appointmentsSearch = createAsyncThunk(
    "appointments/search",
    async (data, { rejectWithValue }) => {
        try {
            console.log("data", data);

            const response = await axiosInstance.get(
                `${endpoints.appointments.search}?search=${data.search}&page=${data.page}&per_page=${data.per_page}`
            );

            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi tìm kiếm lịch hẹn",
            });
        }
    }
);
const initialState = {
    appointments: {
        data: [],
    },
    appointment: {},
    loading: false,
    error: null,
};

const appointmentsSlice = createSlice({
    name: "appointments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(appointmentsGet.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(appointmentsGet.fulfilled, (state, action) => {
                state.appointments = action.payload;
                state.loading = false;
            })
            .addCase(appointmentsGet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(appointmentsAdd.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(appointmentsAdd.fulfilled, (state, action) => {
                state.appointments.data.push(action.payload.data);
                state.loading = false;
            })
            .addCase(appointmentsAdd.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(appointmentsDelete.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(appointmentsDelete.fulfilled, (state, action) => {
                console.log(action.payload);

                state.appointments.data = state.appointments.data.filter(
                    (cate) => cate.id !== action.payload
                );
                state.loading = false;
            })
            .addCase(appointmentsDelete.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message; // Nhận thông báo lỗi
            })
            .addCase(appointmentsUpdate.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(appointmentsUpdate.fulfilled, (state, action) => {
                console.log(action.payload.data.id);

                state.appointments.data = state.appointments.data.map((cate) =>
                    cate.id === action.payload.data.id
                        ? action.payload.data
                        : cate
                );
                state.loading = false;
            })
            .addCase(appointmentsUpdate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message; // Nhận thông báo lỗi
            })
            .addCase(appointmentsGetById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(appointmentsGetById.fulfilled, (state, action) => {
                state.appointment = action.payload;
                state.loading = false;
            })
            .addCase(appointmentsGetById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(appointmentsSearch.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(appointmentsSearch.fulfilled, (state, action) => {
                if (action.payload.data == undefined) {
                    state.appointments = {
                        data: [],
                    };
                } else {
                    state.appointments = action.payload;
                }
                state.loading = false;
            })
            .addCase(appointmentsSearch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default appointmentsSlice.reducer;
