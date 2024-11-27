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
// nếu token hết hạn thì tự động logout
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            const currentPath = window.location.pathname;

            // Kiểm tra xem đường dẫn hiện tại có chứa "/admin" hay không
            if (currentPath.startsWith("/admin")) {
                notification.error({
                    message: "Phiên đăng nhập hết hạn",
                    description: "Vui lòng đăng nhập lại",
                });
                localStorage.removeItem("token");
                // window.location.href = "/admin/dangnhap";
            } else {
                notification.error({
                    message: "Phiên đăng nhập hết hạn",
                    description: "Vui lòng đăng nhập lại",
                });
                localStorage.removeItem("token");
                // window.location.href = "/dangnhap";
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
