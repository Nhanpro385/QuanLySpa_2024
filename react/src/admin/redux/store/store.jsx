import { configureStore } from "@reduxjs/toolkit";
import ServiceCategoriesSlice from "../slices/servicesCategoriesSlice";
import CustomerSlice from "../slices/CustomerSlice";
import categoriesSlice from "../slices/CategoriesProductSlice";
import userSlice from "../slices/UserSlice";
import PositionsSlice from "../slices/PositionsSlice";
import SuppliersSlice from "../slices/SupplierSlice";
import productSlice from "../slices/ProductSlice";
import commentsSlice from "../slices/CommentsSlice";
import ServiceSlice from "../slices/serviceSlice";
import authSlice from "../slices/authSlice";
import warehouseSlice from "../slices/warehouseSlice";
import appointmentsSlice from "../slices/appointmentsSlice";
import shiftsSlice from "../slices/ShiftSlice";
const store = configureStore({
    reducer: {
        ServiceCategories: ServiceCategoriesSlice,
        customers: CustomerSlice,
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
