import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
import endpoints from "../../config/appConfig";
import { logout } from "./authSlice";

// Centralized role check function
const checkRoleAndLogout = (dispatch) => {
    const userRole = localStorage.getItem("role");
    if (!userRole) {
        dispatch(logout());
    }
    return userRole;
};

// Centralized role validation logic
const roleValidation = (dispatch, roleRequired) => {
    const userRole = checkRoleAndLogout(dispatch);
    if (userRole !== roleRequired) {
        return {
            status: 403,
            message: `Bạn Không có quyền ${roleRequired}`,
        };
    }
    return null;
};

export const consulationsGet = createAsyncThunk(
    "consulations/get",
    async (per_page, { rejectWithValue }) => {
        try {
            const queryParams = per_page ? `?per_page=${per_page}` : "";
            const response = await axiosInstance.get(
                `${endpoints.consulations.list}${queryParams}`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Error fetching consultations",
            });
        }
    }
);

export const consulationsAdd = createAsyncThunk(
    "consulations/add",
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(
                endpoints.consulations.create,
                data
            );
            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Error adding consultation",
            });
        }
    }
);
// check role
export const consulationsDelete = createAsyncThunk(
    "consulations/delete",
    async (id, { dispatch, rejectWithValue }) => {
        const roleError = roleValidation(dispatch, "Quản trị viên");
        if (roleError) {
            return rejectWithValue(roleError);
        }

        try {
            await axiosInstance.delete(endpoints.consulations.delete(id));
            return id;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Error deleting consultation",
            });
        }
    }
);
// check role
export const consulationsUpdate = createAsyncThunk(
    "consulations/update",
    async (data, { dispatch, rejectWithValue }) => {
        const roleError = roleValidation(dispatch, "Quản trị viên");
        if (roleError) {
            return rejectWithValue(roleError);
        }

        try {
            const response = await axiosInstance.put(
                endpoints.consulations.update(data.id),
                data.data
            );
            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Error updating consultation",
            });
        }
    }
);

export const consulationsGetById = createAsyncThunk(
    "consulations/getById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                endpoints.consulations.detail(id)
            );
            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Error fetching consultation by ID",
            });
        }
    }
);

export const consulationsearch = createAsyncThunk(
    "consulations/search",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                `${endpoints.consulations.search}?search=${data.search}&page=${data.page}&per_page=${data.per_page}`
            );

            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Error searching consultations",
            });
        }
    }
);

export const consulationsaccept = createAsyncThunk(
    "consulations/accept",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(
                `${endpoints.consulations.accept(id)}`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Error accepting consultation",
            });
        }
    }
);

const initialState = {
    consulations: {
        data: [],
    },
    consulation: {},
    status: "idle",
    error: null,
    loading: false,
};

const consulationslice = createSlice({
    name: "consulations",
    initialState,
    reducers: {
        resetconsulationstate: (state) => {
            state.status = "idle";
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(consulationsGet.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(consulationsGet.fulfilled, (state, action) => {
                state.consulations = action.payload;
                state.loading = false;
            })
            .addCase(consulationsGet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(consulationsAdd.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(consulationsAdd.fulfilled, (state, action) => {
                if (!state.consulations.data) {
                    state.consulations.data = [];
                }
                state.consulations.data.push(action.payload.data);
                state.loading = false;
            })
            .addCase(consulationsAdd.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(consulationsDelete.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(consulationsDelete.fulfilled, (state, action) => {
                state.consulations.data = state.consulations.data.filter(
                    (cate) => cate.id !== action.payload
                );
                state.loading = false;
            })
            .addCase(consulationsDelete.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(consulationsUpdate.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(consulationsUpdate.fulfilled, (state, action) => {
                state.consulations.data = state.consulations.data.map((cate) =>
                    cate.id === action.payload.data.id
                        ? action.payload.data
                        : cate
                );
                state.loading = false;
            })
            .addCase(consulationsUpdate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(consulationsGetById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(consulationsGetById.fulfilled, (state, action) => {
                state.consulation = action.payload;
                state.loading = false;
            })
            .addCase(consulationsGetById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(consulationsearch.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(consulationsearch.fulfilled, (state, action) => {
                if (action.payload.data == undefined) {
                    state.consulations = { data: [] };
                } else {
                    state.consulations = action.payload;
                }

                state.loading = false;
            })
            .addCase(consulationsearch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(consulationsaccept.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(consulationsaccept.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(consulationsaccept.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default consulationslice.reducer;
