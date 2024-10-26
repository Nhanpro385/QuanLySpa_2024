import axios from "axios";
import { API_BASE_URL } from "./appConfig";
import { notification } from "antd"; // Corrected import for notification

import { logout } from "../redux/slices/authSlice";
const axiosInstance = axios.create({
    baseURL: API_BASE_URL, // Set your base API URL here
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor to add token to each request if available
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token"); // Retrieve token if available
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle errors
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            notification.error({
                message: "Phiên đăng nhập hết hạn",
                description: "Vui lòng đăng nhập lại",
            });
            logout();
            localStorage.removeItem("token");
            window.location.href = "/dangnhap";
     
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
