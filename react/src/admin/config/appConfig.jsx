// src/admin/api/endpoints.js

export const API_BASE_URL = "http://127.0.0.1:8000/api/v0.0.1/admin";

const API_AUTH_URL = "http://127.0.0.1:8000/api/auth"; // Thay đổi theo URL API của bạn
const API_AUTHCUSTOMER_URL = "http://127.0.0.1:8000/api/authCustomer"; // Thay đổi theo URL API của bạn
const API_AUTH_URL2 = "http://127.0.0.1:8000/api";
const API_AUTH_URL3 = "http://127.0.0.1:8000/api/v0.0.1/client";
export const URL_IMAGE = "http://127.0.0.1:8000/storage/uploads";
export const URL_IMAGE_2 = "http://127.0.0.1:8000/storage";
const endpoints = {
    ServiceCategories: {
        list: `${API_BASE_URL}/serviceCategories`,
        detail: (id) => `${API_BASE_URL}/serviceCategories/${id}`,
        create: `${API_BASE_URL}/serviceCategories`,
        update: (id) => `${API_BASE_URL}/serviceCategories/${id}`,
        delete: (id) => `${API_BASE_URL}/serviceCategories/${id}`,
        search: `${API_BASE_URL}/serviceCategories`,
        listClient: `${API_AUTH_URL3}/serviceCategories`,
        detailClient: (id) => `${API_AUTH_URL3}/serviceCategories/${id}?services=true`,
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
        detail: (id) =>
            `${API_BASE_URL}/users/${id}?shifts=true&shifts_after=true&shifts_before=true&appointments=true&cosulations=true&treatmentHistories=true`,
        create: `${API_BASE_URL}/users`,
        update: (id) => `${API_BASE_URL}/users/${id}`,
        delete: (id) => `${API_BASE_URL}/users/${id}`,
        search: `${API_BASE_URL}/users`,
        getstaffshift: `${API_BASE_URL}/users?shifts=true&shifts_after=true&shifts_before=true`,
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
        me:(day) => `${API_AUTH_URL}/me?shifts=true&shifts_after=true&shifts_before=true&appointments=true&cosulations=true?treatmentHistories=true&day=${day}`,
        forgotpassword: `${API_AUTH_URL2}/forgot-password`,
        resetpassword: `${API_AUTH_URL2}/reset-password`,
        changepassword: `${API_AUTH_URL}/me/resetPassword`,
        EditProfile: (id) => `${API_AUTH_URL}/me/${id}`,
    },
    AuthClient: {
        register: `${API_AUTHCUSTOMER_URL}/register`,
        login: `${API_AUTHCUSTOMER_URL}/login`,
        logout: `${API_AUTHCUSTOMER_URL}/logout`,
        refresh: `${API_AUTHCUSTOMER_URL}/refresh`,
        me: `${API_AUTHCUSTOMER_URL}/me`,
        forgotpassword: `${API_AUTHCUSTOMER_URL}/forgot-password`,
        resetpassword: `${API_AUTHCUSTOMER_URL}/reset-password`,
        changepassword: (id) => `${API_AUTH_URL3}/customer/${id}`,
        EditProfile: (id) => `${API_AUTH_URL3}/customer/${id}`,
    },
    Products: {
        list: `${API_BASE_URL}/products`,
        detail: (id) =>
            `${API_BASE_URL}/products/${id}?inventories=true&productImages=true`,
        create: `${API_BASE_URL}/products`,
        update: (id) => `${API_BASE_URL}/products/${id}`,
        delete: (id) => `${API_BASE_URL}/products/${id}`,
        search: `${API_BASE_URL}/products`,
    },
    comments: {
        list: `${API_BASE_URL}/comment?sort_by=created_at&sort_order=desc`,
        detail: (id) => `${API_BASE_URL}/comment/${id}`,
        create: `${API_BASE_URL}/comment`,
        update: (id) => `${API_BASE_URL}/comment/${id}`,
        delete: (id) => `${API_BASE_URL}/comment/${id}`,
        reply: (id) => `${API_BASE_URL}/comment/${id}/reply`,
        search: `${API_BASE_URL}/comment`,
        createClient: `${API_AUTH_URL3}/comment`,
        updateClient: (id) => `${API_AUTH_URL3}/comment/${id}`,
        deleteClient: (id) => `${API_AUTH_URL3}/comment/${id}`,
        replyClient: (id) => `${API_AUTH_URL3}/comment/${id}/reply`,
    },
    services: {
        list: `${API_BASE_URL}/services`,
        detail: (id) => `${API_BASE_URL}/services/${id}?products=true`,
        create: `${API_BASE_URL}/services`,
        update: (id) => `${API_BASE_URL}/services/${id}`,
        delete: (id) => `${API_BASE_URL}/services/${id}`,
        search: `${API_BASE_URL}/services`,
        addProduct: (id) => `${API_BASE_URL}/services/products/${id}`,
        updateProduct: (id) => `${API_BASE_URL}/services/products/${id}`,
        listClient: `${API_AUTH_URL3}/services`,
        detailClient: (id) =>
            `${API_AUTH_URL3}/services/${id}?products=true&serviceImages=true&comments=true&image_url=true`,
    },
    shifts: {
        list: `${API_BASE_URL}/shifts`,
        detail: (id) => `${API_BASE_URL}/shifts/${id}`,
        create: `${API_BASE_URL}/shifts`,
        update: (id) => `${API_BASE_URL}/shifts/${id}`,
        delete: (id) => `${API_BASE_URL}/shifts/${id}`,
        search: `${API_BASE_URL}/shifts`,
        addstaff: `${API_BASE_URL}/staff-shifts`,
        listClient: `${API_AUTH_URL3}/shifts`,
        DetailClient: (id) => `${API_AUTH_URL3}/shifts/${id}`,
    },
    warehouse: {
        import: `${API_BASE_URL}/inbound-invoices`,
        getImport: `${API_BASE_URL}/inbound-invoices`,
        export: `${API_BASE_URL}/outbound-invoices`,
        getExport: `${API_BASE_URL}/outbound-invoices`,
        inventory: `${API_BASE_URL}/inventory`,
        getInventoryDetail: (id) => `${API_BASE_URL}/inventory/${id}`,
        getImportDetail: (id) => `${API_BASE_URL}/inbound-invoices/${id}`,
        getExportDetail: (id) => `${API_BASE_URL}/outbound-invoices/${id}`,
        updateImport: (id) => `${API_BASE_URL}/inbound-invoices/${id}`,
        updateExport: (id) => `${API_BASE_URL}/outbound-invoices/${id}`,
        historyinventory: (id) => `${API_BASE_URL}/inventory/history/${id}`,
    },
    appointments: {
        list: `${API_BASE_URL}/appointments`,
        detail: (id) => `${API_BASE_URL}/appointments/${id}`,
        create: `${API_BASE_URL}/appointments`,
        update: (id) => `${API_BASE_URL}/appointments/${id}`,
        delete: (id) => `${API_BASE_URL}/appointments/${id}`,
        search: `${API_BASE_URL}/appointments`,
        CreateClient: `${API_AUTH_URL3}/appointments`,
    },
    streatments: {
        list: `${API_BASE_URL}/treatment-history`,
        detail: (id) => `${API_BASE_URL}/treatment-history/${id}`,
        create: `${API_BASE_URL}/treatment-history`,
        update: (id) => `${API_BASE_URL}/treatment-history/${id}`,
        delete: (id) => `${API_BASE_URL}/treatment-history/${id}`,
        search: `${API_BASE_URL}/treatment-history`,
        byCustomer: (id) => `${API_BASE_URL}/customers/${id}/treatment-history`,
    },
    promotions: {
        list: `${API_BASE_URL}/promotion`,
        detail: (id) => `${API_BASE_URL}/promotion/${id}`,
        create: `${API_BASE_URL}/promotion`,
        update: (id) => `${API_BASE_URL}/promotion/${id}`,
        delete: (id) => `${API_BASE_URL}/promotion/${id}`,
        search: `${API_BASE_URL}/promotion`,
        listClient: `${API_AUTH_URL3}/promotion`,

    },
    consulations: {
        list: `${API_BASE_URL}/consulations`,
        detail: (id) => `${API_BASE_URL}/consulations/${id}`,
        create: `${API_AUTH_URL3}/consulations`,
        update: (id) => `${API_BASE_URL}/consulations/${id}`,
        delete: (id) => `${API_BASE_URL}/consulations/${id}`,
        search: `${API_BASE_URL}/consulations`,
        accept: (id) => `${API_BASE_URL}/consulations/${id}/browse`,
    },
    Notification: {
        list: `${API_BASE_URL}/notifications`,
    },
    Payments: {
        list: `${API_BASE_URL}/payments`,
        detail: (id) => `${API_BASE_URL}/payments/${id}`,
        create: `${API_BASE_URL}/payments`,
        update: (id) => `${API_BASE_URL}/payments/${id}`,
        delete: (id) => `${API_BASE_URL}/payments/${id}`,
        search: `${API_BASE_URL}/payments`,
    },
    statistical: {
        monthlyRevenues: (data) =>
            `${API_BASE_URL}/statistical/monthlyRevenues?year=${data.year}&month=${data.month}`,
        weeklyRevenues: (data) =>
            `${API_BASE_URL}/statistical/weeklyRevenues?year=${data.year}&week=${data.week}`,
        dailyRevenues: (data) =>
            `${API_BASE_URL}/statistical/dailyRevenues?day=${data.day}`,
        revenueAppointment: (data) =>
            `${API_BASE_URL}/statistical/appointments?day=${data.day}`,
        revenueConsulation: (data) =>
            `${API_BASE_URL}/statistical/consulations?day=${data.day}`,
        staffConsulations: (data) =>
            `${API_BASE_URL}/statistical/staffConsulations?day=${data.day}`,
        staffAppoiments: (data) =>
            `${API_BASE_URL}/statistical/staffAppoiments?day=${data.day}`,
        
    },
    contacts: {
        list: `${API_BASE_URL}/contacts`,
        detail: (id) => `${API_BASE_URL}/contacts/${id}`,
        create: `${API_BASE_URL}/contacts`,
        update: (id) => `${API_BASE_URL}/contacts/${id}`,
        delete: (id) => `${API_BASE_URL}/contacts/${id}`,
        search: `${API_BASE_URL}/contacts`,
        listClient: `${API_AUTH_URL3}/contacts`,
        createClient: `${API_AUTH_URL3}/contacts`,
        
    },
};

export default endpoints;
