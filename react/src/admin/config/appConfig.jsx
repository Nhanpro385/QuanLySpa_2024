const API_BASE_URL = "http://127.0.0.1:8000/api/v0.0.1/admin"; // Thay đổi theo URL API của bạn

const endpoints = {
    ServiceCategories: {
        list: `${API_BASE_URL}/serviceCategories`,
        detail: (id) => `${API_BASE_URL}/serviceCategories/${id}`,
        create: `${API_BASE_URL}/serviceCategories`,
        update: (id) => `${API_BASE_URL}/serviceCategories/${id}`,
        detail: (id) => `${API_BASE_URL}/serviceCategories/${id}`,
        delete: (id) => `${API_BASE_URL}/serviceCategories/${id}`,
    },
    
};

export default endpoints;
