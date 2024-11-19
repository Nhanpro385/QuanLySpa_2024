// src/admin/api/endpoints.js

export const API_BASE_URL = "http://127.0.0.1:8000/api/v0.0.1/admin";

const API_AUTH_URL = "http://127.0.0.1:8000/api/auth"; // Thay đổi theo URL API của bạn
const API_AUTH_URL2 = "http://127.0.0.1:8000/api";
const endpoints = {
    ServiceCategories: {
        list: `${API_BASE_URL}/serviceCategories`,
        detail: (id) => `${API_BASE_URL}/serviceCategories/${id}`,
        create: `${API_BASE_URL}/serviceCategories`,
        update: (id) => `${API_BASE_URL}/serviceCategories/${id}`,
        delete: (id) => `${API_BASE_URL}/serviceCategories/${id}`,
        search: `${API_BASE_URL}/serviceCategories`,
    },
    Customers: {
        list: `${API_BASE_URL}/customer`,
        detail: (id) => `${API_BASE_URL}/customer/${id}`,
        create: `${API_BASE_URL}/customer`,
        update: (id) => `${API_BASE_URL}/customer/${id}`,
        delete: (id) => `${API_BASE_URL}/customer/${id}`,
        search: `${API_BASE_URL}/customer`,
    },
    ProductsCategories: {
        list: `${API_BASE_URL}/category`,
        detail: (id) => `${API_BASE_URL}/category/${id}`,
        create: `${API_BASE_URL}/category`,
        update: (id) => `${API_BASE_URL}/category/${id}`,
        delete: (id) => `${API_BASE_URL}/category/${id}`,
        search: `${API_BASE_URL}/category`,
    },
    Users: {
        list: `${API_BASE_URL}/users`,
        detail: (id) => `${API_BASE_URL}/users/${id}`,
        create: `${API_BASE_URL}/users`,
        update: (id) => `${API_BASE_URL}/users/${id}`,
        delete: (id) => `${API_BASE_URL}/users/${id}`,
        search: `${API_BASE_URL}/users`,
    },
    Positions: {
        list: `${API_BASE_URL}/positions`,
        detail: (id) => `${API_BASE_URL}/positions/${id}`,
        create: `${API_BASE_URL}/positions`,
        update: (id) => `${API_BASE_URL}/positions/${id}`,
        delete: (id) => `${API_BASE_URL}/positions/${id}`,
        search: `${API_BASE_URL}/positions`,
    },
    Suppliers: {
        list: `${API_BASE_URL}/supplier`,
        detail: (id) => `${API_BASE_URL}/supplier/${id}`,
        create: `${API_BASE_URL}/supplier`,
        update: (id) => `${API_BASE_URL}/supplier/${id}`,
        delete: (id) => `${API_BASE_URL}/supplier/${id}`,
        search: `${API_BASE_URL}/supplier`,
    },
    Auth: {
        login: `${API_AUTH_URL}/login`,
        logout: `${API_AUTH_URL}/logout`,
        refresh: `${API_AUTH_URL}/refresh`,
        me: `${API_AUTH_URL}/me`,
        forgotpassword: `${API_AUTH_URL2}/forgot-password`,
        resetpassword: `${API_AUTH_URL2}/reset-password`,
    },
    Products: {
        list: `${API_BASE_URL}/products`,
        detail: (id) => `${API_BASE_URL}/products/${id}`,
        create: `${API_BASE_URL}/products`,
        update: (id) => `${API_BASE_URL}/products/${id}`,
        delete: (id) => `${API_BASE_URL}/products/${id}`,
        search: `${API_BASE_URL}/products`,
    },
    comments: {
        list: `${API_BASE_URL}/comment`,
        detail: (id) => `${API_BASE_URL}/comment/${id}`,
        create: `${API_BASE_URL}/comment`,
        update: (id) => `${API_BASE_URL}/comment/${id}`,
        delete: (id) => `${API_BASE_URL}/comment/${id}`,
        reply: (id) => `${API_BASE_URL}/comment/${id}/reply`,
    },
    services: {
        list: `${API_BASE_URL}/services`,
        detail: (id) => `${API_BASE_URL}/services/${id}`,
        create: `${API_BASE_URL}/services`,
        update: (id) => `${API_BASE_URL}/services/${id}`,
        delete: (id) => `${API_BASE_URL}/services/${id}`,
        search: `${API_BASE_URL}/services`,
    },
    shifts: {
        list: `${API_BASE_URL}/shifts`,
        detail: (id) => `${API_BASE_URL}/shifts/${id}`,
        create: `${API_BASE_URL}/shifts`,
        update: (id) => `${API_BASE_URL}/shifts/${id}`,
        delete: (id) => `${API_BASE_URL}/shifts/${id}`,
        search: `${API_BASE_URL}/shifts`,
    },
    warehouse: {
        import: `${API_BASE_URL}/warehouse/import`,
        export: `${API_BASE_URL}/warehouse/export`,
        inventory: `${API_BASE_URL}/warehouse/inventory`,
        getwarehouse: `${API_BASE_URL}/warehouse`,
    },
    appointments: {
        list: `${API_BASE_URL}/appointments`,
        detail: (id) => `${API_BASE_URL}/appointments/${id}`,
        create: `${API_BASE_URL}/appointments`,
        update: (id) => `${API_BASE_URL}/appointments/${id}`,
        delete: (id) => `${API_BASE_URL}/appointments/${id}`,
        search: `${API_BASE_URL}/appointments`,
    },
};

export default endpoints;
