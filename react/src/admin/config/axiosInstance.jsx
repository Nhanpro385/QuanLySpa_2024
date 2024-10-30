import axios from "axios";
import { API_BASE_URL } from "./appConfig";
import { notification } from "antd";
import { logout } from "../redux/slices/authSlice";

// Lấy CSRF token từ thẻ meta
const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    ?.getAttribute("content");

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    // withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-CSRF-TOKEN": csrfToken, // Thêm CSRF token vào header
    },
});

// Interceptor để thêm token vào mỗi yêu cầu
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        console.log(accessToken);
        
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor để xử lý lỗi
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
            window.location.href = "/admin/dangnhap";
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
