import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
import endpoints from "../../config/appConfig";

export const shiftsGet = createAsyncThunk("shifts/get", async () => {
    const response = await axiosInstance.get(endpoints.shifts.list);
    return response.data;
});

export const shiftsAdd = createAsyncThunk(
    "shifts/add",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(endpoints.shifts.create, data);
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
    async (id, { rejectWithValue }) => {
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
    async (data, { rejectWithValue }) => {
        try {
            console.log("data", data);

            const response = await axiosInstance.put(
                endpoints.shifts.update(data.id),
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
export const shiftsGetById = createAsyncThunk("shifts/getById", async (id) => {
    const response = await axiosInstance.get(endpoints.shifts.detail(id));
    return response.data;
});

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
                console.log(action.payload);

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
                console.log(action.payload.data.id);

                state.shifts.data = state.shifts.data.map((cate) =>
                    cate.id === action.payload.data.id
                        ? action.payload.data
                        : cate
                );
                state.loading = false;
            })
            .addCase(shiftsUpdate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message; // Nhận thông báo lỗi
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
            });
    },
});

export default shiftsSlice.reducer;
