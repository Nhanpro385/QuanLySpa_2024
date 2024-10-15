import { configureStore } from "@reduxjs/toolkit";
import ServiceCategoriesSlice from "../slices/servicesCategoriesSlice";
import CustomerSlice from "../slices/CustomerSlice";
import categoriesSlice from "../slices/CategoriesProductSlice";
import userSlice from "../slices/UserSlice";
import PositionsSlice from "../slices/PositionsSlice";
import SuppliersSlice from "../slices/SupplierSlice";
import productSlice from "../slices/ProductSlice";
const store = configureStore({
    reducer: {
        ServiceCategories: ServiceCategoriesSlice,
        customers: CustomerSlice,
        categories: categoriesSlice,
        user: userSlice,
        Positions: PositionsSlice,
        Suppliers: SuppliersSlice,
        products: productSlice
    },
});

export default store;
