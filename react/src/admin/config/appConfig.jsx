// src/admin/api/endpoints.js

const API_BASE_URL = "http://127.0.0.1:8000/api/v0.0.1/admin"; // Thay đổi theo URL API của bạn
const API_AUTH_URL = "http://127.0.0.1:8000/api/auth"; // Thay đổi theo URL API của bạn

const endpoints = {
    ServiceCategories: {
        list: `${API_BASE_URL}/serviceCategories`,
        detail: (id) => `${API_BASE_URL}/serviceCategories/${id}`,
        create: `${API_BASE_URL}/serviceCategories`,
        update: (id) => `${API_BASE_URL}/serviceCategories/${id}`,
        delete: (id) => `${API_BASE_URL}/serviceCategories/${id}`,
    },
    Customers: {
        list: `${API_BASE_URL}/customer`,
        detail: (id) => `${API_BASE_URL}/customer/${id}`,
        create: `${API_BASE_URL}/customer`,
        update: (id) => `${API_BASE_URL}/customer/${id}`,
        delete: (id) => `${API_BASE_URL}/customer/${id}`,
    },
    ProductsCategories: {
        list: `${API_BASE_URL}/category`,
        detail: (id) => `${API_BASE_URL}/category/${id}`,
        create: `${API_BASE_URL}/category`,
        update: (id) => `${API_BASE_URL}/category/${id}`,
        delete: (id) => `${API_BASE_URL}/category/${id}`,
    },
    Users: {
        list: `${API_BASE_URL}/users`,
        detail: (id) => `${API_BASE_URL}/users/${id}`,
        create: `${API_BASE_URL}/users`,
        update: (id) => `${API_BASE_URL}/users/${id}`,
        delete: (id) => `${API_BASE_URL}/users/${id}`,
    },
    Positions: {
        list: `${API_BASE_URL}/positions`,
        detail: (id) => `${API_BASE_URL}/positions/${id}`,
        create: `${API_BASE_URL}/positions`,
        update: (id) => `${API_BASE_URL}/positions/${id}`,
        delete: (id) => `${API_BASE_URL}/positions/${id}`,
    },
    Suppliers: {
        list: `${API_BASE_URL}/supplier`,
        detail: (id) => `${API_BASE_URL}/supplier/${id}`,
        create: `${API_BASE_URL}/supplier`,
        update: (id) => `${API_BASE_URL}/supplier/${id}`,
        delete: (id) => `${API_BASE_URL}/supplier/${id}`,
    },
    Auth: {
        login: `${API_AUTH_URL}/login`,
        logout: `${API_AUTH_URL}/logout`,
        refresh: `${API_AUTH_URL}/refresh`,
        me: `${API_AUTH_URL}/me`,
        resetPassword: `${API_AUTH_URL}/me/resetPassword`,
    },
};

export default endpoints;
