const API_BASE_URL = 'https://api.example.com'; // Thay đổi theo URL API của bạn

const endpoints = {
    customer: {
        list: `${API_BASE_URL}/customers`,
        detail: (id) => `${API_BASE_URL}/customers/${id}`,
        create: `${API_BASE_URL}/customers`,
        update: (id) => `${API_BASE_URL}/customers/${id}`,
        delete: (id) => `${API_BASE_URL}/customers/${id}`,
    },
    appointment: {
        list: `${API_BASE_URL}/appointments`,
        detail: (id) => `${API_BASE_URL}/appointments/${id}`,
        create: `${API_BASE_URL}/appointments`,
        update: (id) => `${API_BASE_URL}/appointments/${id}`,
        delete: (id) => `${API_BASE_URL}/appointments/${id}`,
    },
    staff: {
        list: `${API_BASE_URL}/staff`,
        detail: (id) => `${API_BASE_URL}/staff/${id}`,
        create: `${API_BASE_URL}/staff`,
        update: (id) => `${API_BASE_URL}/staff/${id}`,
        delete: (id) => `${API_BASE_URL}/staff/${id}`,
    },
    service: {
        list: `${API_BASE_URL}/services`,
        detail: (id) => `${API_BASE_URL}/services/${id}`,
        create: `${API_BASE_URL}/services`,
        update: (id) => `${API_BASE_URL}/services/${id}`,
        delete: (id) => `${API_BASE_URL}/services/${id}`,
    },
    product: {
        list: `${API_BASE_URL}/products`,
        detail: (id) => `${API_BASE_URL}/products/${id}`,
        create: `${API_BASE_URL}/products`,
        update: (id) => `${API_BASE_URL}/products/${id}`,
        delete: (id) => `${API_BASE_URL}/products/${id}`,
    },
    promotion: {
        list: `${API_BASE_URL}/promotions`,
        detail: (id) => `${API_BASE_URL}/promotions/${id}`,
        create: `${API_BASE_URL}/promotions`,
        update: (id) => `${API_BASE_URL}/promotions/${id}`,
        delete: (id) => `${API_BASE_URL}/promotions/${id}`,
    },
    inventory: {
        list: `${API_BASE_URL}/inventory`,
        detail: (id) => `${API_BASE_URL}/inventory/${id}`,
        create: `${API_BASE_URL}/inventory`,
        update: (id) => `${API_BASE_URL}/inventory/${id}`,
        delete: (id) => `${API_BASE_URL}/inventory/${id}`,
    },
    shift: {
        list: `${API_BASE_URL}/shifts`,
        detail: (id) => `${API_BASE_URL}/shifts/${id}`,
        create: `${API_BASE_URL}/shifts`,
        update: (id) => `${API_BASE_URL}/shifts/${id}`,
        delete: (id) => `${API_BASE_URL}/shifts/${id}`,
    },
};

export default endpoints;
