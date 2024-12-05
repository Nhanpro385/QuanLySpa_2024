import axios from "axios";
import { API_BASE_URL } from "./appConfig";
import { notification } from "antd";
import { useLocation } from "react-router-dom";

// Lấy CSRF token từ thẻ meta
const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    ?.getAttribute("content");

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-CSRF-TOKEN": csrfToken, // Thêm CSRF token vào header
    },
});

// Interceptor để thêm token vào mỗi yêu cầu
axiosInstance.interceptors.request.use(
    (config) => {
        const currentPath = window.location.pathname;
        if (currentPath.startsWith("/admin")) {
            const accessToken = localStorage.getItem("tokenAdmin");
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
            return config;
        } else {
            const accessToken = localStorage.getItem("tokenClient");
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
            return config;
        }
    },
    (error) => Promise.reject(error)
);

// Interceptor để xử lý khi token hết hạn và không reload trang
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log(error);
        
        if (
            error.response &&
            error.response.data.message === "Vui lòng đăng nhập tài khoản."
        ) {
            const currentPath = window.location.pathname;

            // Kiểm tra xem đường dẫn hiện tại có chứa "/admin" hay không
            if (currentPath.startsWith("/admin")) {
                notification.error({
                    message: "Phiên đăng nhập hết hạn",
                    description: "Vui lòng đăng nhập lại",
                });
                localStorage.removeItem("tokenAdmin");
            } else {
                notification.error({
                    message: "Phiên đăng nhập hết hạn",
                    description: "Vui lòng đăng nhập lại",
                });
                localStorage.removeItem("tokenClient");
                
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
