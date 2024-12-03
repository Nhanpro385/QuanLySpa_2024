import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
import endpoints from "../../config/appConfig";

// Async thunk to get notifications
export const notificationsGet = createAsyncThunk(
    "notifications/get",
    async (per_page, { rejectWithValue }) => {
        try {
            // Get notifications from the server
            const queryParams = per_page ? `?per_page=${per_page}` : "";
            const response = await axiosInstance.get(
                `${endpoints.Notification.list}${queryParams}`
            );

            // Return response data
            return response.data;
        } catch (error) {
            // Return the error with rejectWithValue
            return rejectWithValue({
                status: error.response?.status || 500,
                message:
                    error.response?.data?.message ||
                    "Có lỗi xảy ra khi lấy danh sách thông báo",
            });
        }
    }
);

// Initial state for the notifications slice
const initialState = {
    notifications: {
        data: [],
    },
    notification: {},
    status: "idle",
    error: null,
    loading: false,
};

// Notification slice with reducers and extraReducers to handle async actions
const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        // Reset notification state
        resetNotificationState: (state) => {
            state.status = "idle";
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(notificationsGet.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(notificationsGet.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.notifications.data = action.payload;
            })
            .addCase(notificationsGet.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export const { resetNotificationState } = notificationSlice.actions;
export default notificationSlice.reducer;
