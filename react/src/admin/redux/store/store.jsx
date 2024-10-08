import { configureStore } from "@reduxjs/toolkit";
import ServiceCategoriesSlice from "../slices/servicesCategoriesSlice";
import CustomerSlice from "../slices/CustomerSlice";
import categoriesSlice from "../slices/CategoriesProductSlice";
import userSlice from "../slices/UserSlice";
import PositionsSlice from "../slices/PositionsSlice";
const store = configureStore({
    reducer: {
        ServiceCategories: ServiceCategoriesSlice,
        customers: CustomerSlice,
        categories: categoriesSlice,
        user: userSlice,
        Positions: PositionsSlice,
    },
});

export default store;
