import { configureStore } from "@reduxjs/toolkit";
import ServiceCategoriesSlice from "../slices/servicesCategoriesSlice";
import CustomerSlice from "../slices/CustomerSlice";
import categoriesSlice from "../slices/CategoriesProductSlice";
const store = configureStore({
    reducer: {
        ServiceCategories: ServiceCategoriesSlice,
        customers: CustomerSlice,
        categories: categoriesSlice,
    },
});

export default store;
