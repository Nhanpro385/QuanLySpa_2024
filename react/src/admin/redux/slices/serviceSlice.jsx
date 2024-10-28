import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
import endpoints from "../../config/appConfig";

export const servicesGet = createAsyncThunk(
    "services/get",
    async () => {
        const response = await axiosInstance.get(endpoints.services.list);
        return response.data;
    }
);

export const servicesAdd = createAsyncThunk(
    "services/add",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(
                endpoints.services.create,
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

export const servicesDelete = createAsyncThunk(
    "services/delete",
    async (id, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(endpoints.services.delete(id));
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

export const servicesUpdate = createAsyncThunk(
    "services/update",
    async (data, { rejectWithValue }) => {
        try {
            console.log("data", data);

            const response = await axiosInstance.put(
                endpoints.services.update(data.id),
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
export const servicesGetById = createAsyncThunk(
    "services/getById",
    async (id) => {
        const response = await axiosInstance.get(
            endpoints.services.detail(id)
        );
        return response.data;
    }
);

const initialState = {
    services:  {
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
                console.log(action.payload);

                state.services.data =
                    state.services.data.filter(
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

                state.services.data = state.services.data.map(
                    (cate) =>
                        cate.id === action.payload.data.id
                            ? action.payload.data
                            : cate
                );
                state.loading = false;
            })
            .addCase(servicesUpdate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message; // Nhận thông báo lỗi
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
            });
    },
});

export default servicesSlice.reducer;
