import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import endpoints from "../../config/appConfig";

export const PositionsGet = createAsyncThunk("Positions/get", async () => {
    const response = await axios.get(endpoints.Positions.list);
    return response.data;
});

export const PositionsAdd = createAsyncThunk(
    "Positions/add",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(endpoints.Positions.create, data);
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

export const PositionsDelete = createAsyncThunk(
    "Positions/delete",
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(endpoints.Positions.delete(id));
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

export const PositionsUpdate = createAsyncThunk(
    "Positions/update",
    async (data, { rejectWithValue }) => {
        try {
            console.log("data", data);

            const response = await axios.put(
                endpoints.Positions.update(data.id),
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
export const PositionsGetById = createAsyncThunk(
    "Positions/getById",
    async (id) => {
        const response = await axios.get(endpoints.Positions.detail(id));
        return response.data;
    }
);

const initialState = {
    Positions: [],
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
                console.log(action.payload);

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
                console.log(action.payload.data.id);

                state.Positions.data = state.Positions.data.map((cate) =>
                    cate.id === action.payload.data.id
                        ? action.payload.data
                        : cate
                );
                state.loading = false;
            })
            .addCase(PositionsUpdate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message; // Nhận thông báo lỗi
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
            });
    },
});

export default PositionsSlice.reducer;
