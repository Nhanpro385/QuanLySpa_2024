import { configureStore } from "@reduxjs/toolkit";
import ServiceCategoriesSlice from "../slices/servicesCategoriesSlice";

const store = configureStore({
    reducer: {
        ServiceCategories: ServiceCategoriesSlice,
    },
});

export default store;
