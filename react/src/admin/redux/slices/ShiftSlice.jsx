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
export const shiftsGet = createAsyncThunk("shifts/get", async (per_page) => {
    // Xây dựng query parameters chỉ với `per_page` nếu có
    const queryParams = per_page ? `?per_page=${per_page}` : "";
    // Gọi API
    const response = await axiosInstance.get(
        `${endpoints.shifts.list}${queryParams}`
    );

    // Trả về dữ liệu response
    return response.data;
});

export const shiftsAdd = createAsyncThunk(
    "shifts/add",
    async (data, { dispatch, rejectWithValue }) => {
        const userRole = checkRoleAndLogout(dispatch);
        if (userRole !== "Quản trị viên") {
            return rejectWithValue({
                status: 403,
                message: "Bạn không có quyền thêm ca làm việc",
            });
        }

        try {
            const response = await axiosInstance.post(
                endpoints.shifts.create,
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

export const shiftsDelete = createAsyncThunk(
    "shifts/delete",
    async (id, { dispatch, rejectWithValue }) => {
        const userRole = checkRoleAndLogout(dispatch);
        if (userRole !== "Quản trị viên") {
            return rejectWithValue({
                status: 403,
                message: "Bạn không có quyền xóa ca làm việc",
            });
        }

        try {
            await axiosInstance.delete(endpoints.shifts.delete(id));
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

export const shiftsUpdate = createAsyncThunk(
    "shifts/update",
    async (data, { dispatch, rejectWithValue }) => {
        const userRole = checkRoleAndLogout(dispatch);
        if (userRole !== "Quản trị viên") {
            return rejectWithValue({
                status: 403,
                message: "Bạn không có quyền cập nhật ca làm việc",
            });
        }

        try {
            const response = await axiosInstance.put(
                endpoints.shifts.update(data.id),
                data
            );
            return response.data;
        } catch (error) {
            console.log("error", error);

            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi cập nhật",
                errors: error.response?.data?.errors || [],
            });
        }
    }
);
export const shiftsGetById = createAsyncThunk("shifts/getById", async (id) => {
    const response = await axiosInstance.get(endpoints.shifts.detail(id));
    return response.data;
});

export const shiftsSearch = createAsyncThunk(
    "shifts/search",
    async (data, { rejectWithValue }) => {
        try {
            if (data.search == "") {
                const response = await axiosInstance.get(
                    `${endpoints.shifts.search}?page=${data.page}&per_page=${data.per_page}`
                );
                return response.data;
            }
            const response = await axiosInstance.get(
                `${endpoints.shifts.search}?shift_date[like]=${data.search}&page=${data.page}&per_page=${data.per_page}`
            );

            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi tìm kiếm ca làm việc",
            });
        }
    }
);
export const addShiftStaff = createAsyncThunk(
    "shifts/addShiftStaff",
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(
                `${endpoints.shifts.addstaff}`,
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
export const getShiftClient = createAsyncThunk(
    "shifts/getShiftClient",
    async (per_page) => {
        const queryParams = per_page ? `?per_page=${per_page}` : "";
        const response = await axiosInstance.get(
            `${endpoints.shifts.listClient}${queryParams}`
        );
        
        return response.data;
    }
);
export const getShiftbyidClient = createAsyncThunk(
    "shifts/getShiftbyidClient",
    async (data) => {
        const response = await axiosInstance.get(
            `${endpoints.shifts.DetailClient(data)}`
        );
        return response.data;
    }
);
const initialState = {
    shifts: {
        data: [],
    },
    shift: {},
    loading: false,
    error: null,
};

const shiftsSlice = createSlice({
    name: "shifts",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(shiftsGet.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(shiftsGet.fulfilled, (state, action) => {
                state.shifts = action.payload;
                state.loading = false;
            })
            .addCase(shiftsGet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(shiftsAdd.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(shiftsAdd.fulfilled, (state, action) => {
                state.shifts.data.push(action.payload.data);
                state.loading = false;
            })
            .addCase(shiftsAdd.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(shiftsDelete.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(shiftsDelete.fulfilled, (state, action) => {
                state.shifts.data = state.shifts.data.filter(
                    (cate) => cate.id !== action.payload
                );
                state.loading = false;
            })
            .addCase(shiftsDelete.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message; // Nhận thông báo lỗi
            })
            .addCase(shiftsUpdate.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(shiftsUpdate.fulfilled, (state, action) => {
                state.shifts.data = state.shifts.data.map((cate) =>
                    cate.id === action.payload.data.id
                        ? action.payload.data
                        : cate
                );
                state.loading = false;
            })
            .addCase(shiftsUpdate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(shiftsGetById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(shiftsGetById.fulfilled, (state, action) => {
                state.shift = action.payload;
                state.loading = false;
            })
            .addCase(shiftsGetById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(shiftsSearch.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(shiftsSearch.fulfilled, (state, action) => {
                if (action.payload.data == undefined) {
                    state.shifts = {
                        data: [],
                    };
                } else {
                    state.shifts = action.payload;
                }
                state.loading = false;
            })
            .addCase(shiftsSearch.rejected, (state, action) => {
                state.loading = false;
                state.shifts = {
                    data: [],
                };

                state.error = action.payload.message;
            })
            .addCase(addShiftStaff.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addShiftStaff.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(addShiftStaff.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getShiftClient.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getShiftClient.fulfilled, (state, action) => {
                state.shifts = action.payload;
                state.loading = false;
            })
            .addCase(getShiftClient.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getShiftbyidClient.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getShiftbyidClient.fulfilled, (state, action) => {
                state.shift = action.payload;
                state.loading = false;
            })
            .addCase(getShiftbyidClient.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default shiftsSlice.reducer;
