import { configureStore } from "@reduxjs/toolkit";
import {
    appointmentsSlice,
    authSlice,
    categoriesSlice,
    commentsSlice,
    PositionsSlice,
    productSlice,
    ServiceCategoriesSlice,
    servicesSlice,
    shiftsSlice,
    SupplierSlice,
    userSlice,
    warehouseSlice,
    CustomerSlice,
    streatmentSlice,
    promotionsSlice,
    consulationslice,
    notificationSlice,
    paymentsSlice
} from "../slices";

const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
        shifts: shiftsSlice,
        positions: PositionsSlice,
        warehouse: warehouseSlice,
        supplier: SupplierSlice,
        categories: categoriesSlice,
        products: productSlice,
        services: servicesSlice,
        serviceCategories: ServiceCategoriesSlice,
        appointments: appointmentsSlice,
        comments: commentsSlice,
        customers: CustomerSlice,
        streatments: streatmentSlice,
        promotions: promotionsSlice,
        consulations: consulationslice,
        notification: notificationSlice,
        payments: paymentsSlice
    },
});

export default store;
