import { configureStore } from "@reduxjs/toolkit";
import ServiceCategoriesSlice from "../slices/servicesCategoriesSlice"; // slice liên quan đến sản phẩm
import CustomerSlice from "../slices/CustomerSlice"; // slice khách hàng
import categoriesSlice from "../slices/CategoriesProductSlice"; // slice danh mục sản phẩm
import userSlice from "../slices/UserSlice"; // slice quản lý người dùng
import PositionsSlice from "../slices/PositionsSlice"; // slice về vị trí công việc
import SuppliersSlice from "../slices/SupplierSlice"; // slice về nhà cung cấp
import productSlice from "../slices/ProductSlice"; // slice sản phẩm
import commentsSlice from "../slices/CommentsSlice"; // slice quản lý bình luận
import ServiceSlice from "../slices/serviceSlice"; // slice dịch vụ
import authSlice from "../slices/authSlice"; // slice xác thực
import warehouseSlice from "../slices/warehouseSlice"; // slice kho hàng
import appointmentsSlice from "../slices/appointmentsSlice"; // slice lịch hẹn
import shiftsSlice from "../slices/ShiftSlice"; // slice ca làm việc

const store = configureStore({
    reducer: {
        ServiceCategories: ServiceCategoriesSlice,
        // customers: CustomerSlice,
        categories: categoriesSlice,
        user: userSlice,
        Positions: PositionsSlice,
        Suppliers: SuppliersSlice,
        products: productSlice,
        comments: commentsSlice,
        services: ServiceSlice,
        auth: authSlice,
        warehouse: warehouseSlice,
        appointments: appointmentsSlice,
        shifts: shiftsSlice,
    },
});

export default store;
