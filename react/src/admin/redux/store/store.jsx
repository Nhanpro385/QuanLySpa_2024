import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';

// Cấu hình store bằng Redux Toolkit
const store = configureStore({
  reducer: {
    users: userReducer,  // Thêm slice quản lý users vào store
    // Bạn có thể thêm các slice khác ở đây nếu có
  },
});

// Xuất store để sử dụng trong ứng dụng
export default store;
