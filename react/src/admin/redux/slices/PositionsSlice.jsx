import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
import endpoints from "../../config/appConfig";

const checkRoleAndLogout = (dispatch) => {
    const userRole = localStorage.getItem("role");

    if (!userRole) {
        dispatch(logout());
    }

    return userRole;
};
export const PositionsGet = createAsyncThunk(
    "Positions/get",
    async (per_page) => {
        const param = per_page ? `?per_page=${per_page}` : "";

        const response = await axiosInstance.get(
            `${endpoints.Positions.list}${param}`
        );

        return response.data;
    }
);

export const PositionsAdd = createAsyncThunk(
    "Positions/add",
    async (data, { dispatch, rejectWithValue }) => {
        const userRole = checkRoleAndLogout(dispatch);
        if (userRole !== "Quản trị viên") {
            return rejectWithValue({
                status: 403,
                message: "Bạn không có quyền thêm vị trí",
            });
        }

        try {
            const response = await axiosInstance.post(
                endpoints.Positions.create,
                data
            );
            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi tìm kiếm",
                errors: error.response?.data?.errors || [],
                error: error.response?.data?.error || {},
            });
        }
    }
);

export const PositionsDelete = createAsyncThunk(
    "Positions/delete",
    async (id, { dispatch, rejectWithValue }) => {
        const userRole = checkRoleAndLogout(dispatch);
        if (userRole !== "Quản trị viên") {
            return rejectWithValue({
                status: 403,
                message: "Bạn không có quyền xóa vị trí",
            });
        }
        console.log(userRole);

        try {
            await axiosInstance.delete(endpoints.Positions.delete(id));
            return id;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi tìm kiếm",
                errors: error.response?.data?.errors || [],
                error: error.response?.data?.error || {},
            });
        }
    }
);

export const PositionsUpdate = createAsyncThunk(
    "Positions/update",
    async (data, { dispatch, rejectWithValue }) => {
        const userRole = checkRoleAndLogout(dispatch);
        if (userRole !== "Quản trị viên") {
            return rejectWithValue({
                status: 403,
                message: "Bạn không có quyền cập nhật vị trí",
            });
        }
        try {
            const response = await axiosInstance.put(
                endpoints.Positions.update(data.id),
                data
            );
            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi tìm kiếm",
                errors: error.response?.data?.errors || [],
                error: error.response?.data?.error || {},
            });
        }
    }
);
export const PositionsGetById = createAsyncThunk(
    "Positions/getById",
    async (id) => {
        const response = await axiosInstance.get(
            endpoints.Positions.detail(id)
        );
        return response.data;
    }
);

export const PositionsSearch = createAsyncThunk(
    "Positions/search",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                `${endpoints.Positions.search}?search=${data.search}&page=${data.page}&per_page=${data.per_page}`
            );

            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi tìm kiếm",
                errors: error.response?.data?.errors || [],
                error: error.response?.data?.error || {},
            });
        }
    }
);

const initialState = {
    Positions: {
        data: [],
    },
    Position: {},
    loading: false,
    error: null,
};

const PositionsSlice = createSlice({
    name: "Positions",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(PositionsGet.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(PositionsGet.fulfilled, (state, action) => {
                state.Positions = action.payload;
                state.loading = false;
            })
            .addCase(PositionsGet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(PositionsAdd.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(PositionsAdd.fulfilled, (state, action) => {
                state.Positions.data.push(action.payload.data);
                state.loading = false;
            })
            .addCase(PositionsAdd.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(PositionsDelete.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(PositionsDelete.fulfilled, (state, action) => {
                state.Positions.data = state.Positions.data.filter(
                    (cate) => cate.id !== action.payload
                );
                state.loading = false;
            })
            .addCase(PositionsDelete.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message; // Nhận thông báo lỗi
            })
            .addCase(PositionsUpdate.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(PositionsUpdate.fulfilled, (state, action) => {
                state.Positions.data = state.Positions.data.map((cate) =>
                    cate.id === action.payload.data.id
                        ? action.payload.data
                        : cate
                );
                state.loading = false;
            })
            .addCase(PositionsUpdate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Có lỗi xảy ra";
            })
            .addCase(PositionsGetById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(PositionsGetById.fulfilled, (state, action) => {
                state.Position = action.payload;
                state.loading = false;
            })
            .addCase(PositionsGetById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(PositionsSearch.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(PositionsSearch.fulfilled, (state, action) => {
                if (action.payload.data == undefined) {
                    state.Positions = {
                        data: [],
                    };
                } else {
                    state.Positions = action.payload;
                }
                state.loading = false;
            })
            .addCase(PositionsSearch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default PositionsSlice.reducer;
