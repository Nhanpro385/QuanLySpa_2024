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
export const commentsGet = createAsyncThunk("comments/get", async () => {
    const response = await axiosInstance.get(endpoints.comments.list);

    return response.data;
});

export const commentsAdd = createAsyncThunk(
    "comments/add",
    async (data, { dispatch, rejectWithValue }) => {
        const userRole = checkRoleAndLogout(dispatch);
        if (userRole !== "Quản trị viên") {
            return rejectWithValue({
                status: 403,
                message: "Bạn không có quyền thêm bình luận",
            });
        }

        try {
            const response = await axiosInstance.post(
                endpoints.comments.create,
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

export const commentsDelete = createAsyncThunk(
    "comments/delete",
    async (id, { dispatch, rejectWithValue }) => {
        const userRole = checkRoleAndLogout(dispatch);
        if (userRole !== "Quản trị viên") {
            return rejectWithValue({
                status: 403,
                message: "Bạn không có quyền xóa bình luận",
            });
        }

        try {
            await axiosInstance.delete(endpoints.comments.delete(id));
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

export const commentsUpdate = createAsyncThunk(
    "comments/update",
    async (data, { dispatch, rejectWithValue }) => {
        const userRole = checkRoleAndLogout(dispatch);
        if (userRole !== "Quản trị viên") {
            return rejectWithValue({
                status: 403,
                message: "Bạn không có quyền cập nhật bình luận",
            });
        }

        try {
            const response = await axiosInstance.put(
                endpoints.comments.update(data.id),
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
export const commentsGetById = createAsyncThunk(
    "comments/getById",
    async (id) => {
        const response = await axiosInstance.get(endpoints.comments.detail(id));
        return response.data;
    }
);
export const replyComment = createAsyncThunk(
    "comments/reply",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(
                endpoints.comments.reply(data.parent_comment_id),
                data
            );
            return response.data;
        } catch (error) {
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi trả lời",
            });
        }
    }
);
const initialState = {
    comments: {
        data: [],
    },
    comment: {},
    loading: false,
    error: null,
};

const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(commentsGet.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(commentsGet.fulfilled, (state, action) => {
                state.comments = action.payload;
                state.loading = false;
            })
            .addCase(commentsGet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(commentsAdd.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(commentsAdd.fulfilled, (state, action) => {
                state.comments.data.push(action.payload.data);
                state.loading = false;
            })
            .addCase(commentsAdd.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(commentsDelete.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(commentsDelete.fulfilled, (state, action) => {
                console.log(action.payload);

                state.comments.data = state.comments.data.filter(
                    (cate) => cate.id !== action.payload
                );
                state.loading = false;
            })
            .addCase(commentsDelete.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message; // Nhận thông báo lỗi
            })
            .addCase(commentsUpdate.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(commentsUpdate.fulfilled, (state, action) => {
                console.log(action.payload.data.id);

                state.comments.data = state.comments.data.map((cate) =>
                    cate.id === action.payload.data.id
                        ? action.payload.data
                        : cate
                );
                state.loading = false;
            })
            .addCase(commentsUpdate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message; // Nhận thông báo lỗi
            })
            .addCase(commentsGetById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(commentsGetById.fulfilled, (state, action) => {
                state.category = action.payload;
                state.loading = false;
            })
            .addCase(commentsGetById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(replyComment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(replyComment.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(replyComment.rejected, (state, action) => {
                state.loading = false;

                state.error = action;
            });
    },
});

export default commentsSlice.reducer;
