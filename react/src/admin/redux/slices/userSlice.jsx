import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import endpoints from "../../config/appConfig";

// Thunk bất đồng bộ để lấy danh sách users từ API (Đọc dữ liệu - Read)
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(endpoints.user.list);
  return response.data; // Trả về dữ liệu người dùng sau khi gọi API
});

// Thunk bất đồng bộ để thêm một user mới (Tạo dữ liệu - Create)
export const addUser = createAsyncThunk("users/addUser", async (user) => {
  const response = await axios.post(endpoints.user.create, user);
  return response.data; // Trả về dữ liệu user sau khi thêm thành công
});

// Thunk bất đồng bộ để cập nhật thông tin user (Cập nhật dữ liệu - Update)
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, user }) => {
    const response = await axios.put(endpoints.user.update(id), user);
    return { id, data: response.data }; // Trả về ID và dữ liệu user đã cập nhật
  }
);

// Thunk bất đồng bộ để xóa một user (Xóa dữ liệu - Delete)
export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  await axios.delete(endpoints.user.delete(id));
  return id; // Trả về ID của user đã xóa
});

// Tạo Slice cho quản lý users
const userSlice = createSlice({
  name: "users", // Tên của slice
  initialState: {
    users: [], // Danh sách người dùng
    loading: false, // Trạng thái loading (đang tải dữ liệu)
    error: null, // Trạng thái lỗi nếu có
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true; // Bắt đầu tải dữ liệu
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false; // Đã tải xong
        state.users = action.payload; // Gán dữ liệu người dùng vào state
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false; // Dừng trạng thái loading nếu lỗi
        state.error = action.error.message; // Lưu thông tin lỗi vào state
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload); // Thêm user mới vào danh sách
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) {
          state.users[index] = action.payload.data; // Cập nhật user theo ID
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload); // Loại bỏ user đã xóa
      });
  },
});

// Xuất reducer để kết nối vào store
export default userSlice.reducer;
