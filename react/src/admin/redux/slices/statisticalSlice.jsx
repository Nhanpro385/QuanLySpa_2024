// User Slice
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

export const monthlyRevenuesGet = createAsyncThunk(
    "statistical/getmonthlyRevenues",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                endpoints.statistical.monthlyRevenues(data)
            );

            return response.data;
        } catch (error) {
            // Trả về lỗi với rejectWithValue
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi lấy danh sách doanh thu",
                errors: error.response?.data?.errors || [],
            });
        }
    }
);
export const weeklyRevenuesGet = createAsyncThunk(
    "statistical/getweeklyRevenues",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                endpoints.statistical.weeklyRevenues(data)
            );

            return response.data;
        } catch (error) {
            // Trả về lỗi với rejectWithValue
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi lấy danh sách doanh thu",
                errors: error.response?.data?.errors || [],
            });
        }
    }
);
export const dailyRevenuesGet = createAsyncThunk(
    "statistical/getdailyRevenues",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                endpoints.statistical.dailyRevenues(data)
            );

            return response.data;
        } catch (error) {
            // Trả về lỗi với rejectWithValue
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi lấy danh sách doanh thu",
                errors: error.response?.data?.errors || [],
            });
        }
    }
);
export const revenueAppointmentGet = createAsyncThunk(
    "statistical/getrevenueAppointment",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                endpoints.statistical.revenueAppointment(data)
            );

            return response.data;
        } catch (error) {
            // Trả về lỗi với rejectWithValue
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi lấy danh sách doanh thu",
                errors: error.response?.data?.errors || [],
            });
        }
    }
);
export const revenueConsulationGet = createAsyncThunk(
    "statistical/getrevenueConsulation",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                endpoints.statistical.revenueConsulation(data)
            );

            return response.data;
        } catch (error) {
            // Trả về lỗi với rejectWithValue
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi lấy danh sách doanh thu",
                errors: error.response?.data?.errors || [],
            });
        }
    }
);
export const staffConsulationsGet = createAsyncThunk(
    "statistical/getstaffConsulations",
    async (data, { rejectWithValue, dispatch }) => {
        try {
            const response = await axiosInstance.get(
                endpoints.statistical.staffConsulations(data)
            );

            return response.data;
        } catch (error) {
            // Trả về lỗi với rejectWithValue
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi lấy danh sách doanh thu",
                errors: error.response?.data?.errors || [],
            });
        }
    }
);
export const staffAppoimentsGet = createAsyncThunk(
    "statistical/getstaffAppoiments",
    async (data, { rejectWithValue, dispatch }) => {
        try {
            const response = await axiosInstance.get(
                endpoints.statistical.staffAppoiments(data)
            );

            return response.data;
        } catch (error) {
            // Trả về lỗi với rejectWithValue
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi lấy danh sách doanh thu",
                errors: error.response?.data?.errors || [],
            });
        }
    }
);

const initialState = {
    monthlyRevenues: [],
    weeklyRevenues: [],
    dailyRevenues: [],
    revenueAppointment: [],
    revenueConsulation: [],
    staffConsulations: [],
    staffAppoiments: [],

    status: "idle",
    error: null,
    loading: false,
};

const statisticalSlice = createSlice({
    name: "statistical",

    initialState,

    extraReducers: (builder) => {
        builder
            .addCase(monthlyRevenuesGet.pending, (state) => {
                state.status = "loading";
                state.loading = true;
            })
            .addCase(monthlyRevenuesGet.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.monthlyRevenues = action.payload;
                state.loading = false;
            })
            .addCase(monthlyRevenuesGet.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(weeklyRevenuesGet.pending, (state) => {
                state.status = "loading";
                state.loading = true;
            })
            .addCase(weeklyRevenuesGet.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.weeklyRevenues = action.payload;
                state.loading = false;
            })
            .addCase(weeklyRevenuesGet.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(dailyRevenuesGet.pending, (state) => {
                state.status = "loading";
                state.loading = true;
            })
            .addCase(dailyRevenuesGet.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.dailyRevenues = action.payload;
                state.loading = false;
            })
            .addCase(dailyRevenuesGet.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(revenueAppointmentGet.pending, (state) => {
                state.status = "loading";
                state.loading = true;
            })
            .addCase(revenueAppointmentGet.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.revenueAppointment = action.payload;
                state.loading = false;
            })
            .addCase(revenueAppointmentGet.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(revenueConsulationGet.pending, (state) => {
                state.status = "loading";
                state.loading = true;
            })
            .addCase(revenueConsulationGet.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.revenueConsulation = action.payload;
                state.loading = false;
            })
            .addCase(revenueConsulationGet.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(staffConsulationsGet.pending, (state) => {
                state.status = "loading";
                state.loading = true;
            })
            .addCase(staffConsulationsGet.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.staffConsulations = action.payload;
                state.loading = false;
            })
            .addCase(staffConsulationsGet.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(staffAppoimentsGet.pending, (state) => {
                state.status = "loading";
                state.loading = true;
            })
            .addCase(staffAppoimentsGet.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.staffAppoiments = action.payload;
                state.loading = false;
            })
            .addCase(staffAppoimentsGet.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
                state.loading = false;
            })
            
    },
});
export default statisticalSlice.reducer;
