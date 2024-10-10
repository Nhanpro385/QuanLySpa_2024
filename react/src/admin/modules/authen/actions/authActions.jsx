// src/actions/authActions.js
import { API_login, API_logout } from "../../../api/auth";

// Action đăng nhập
export const loginAction = async (email, password) => {
    try {
        const data = await API_login(email, password);
        if (data && data.access_token) {
            localStorage.setItem("token", data.access_token); // Lưu token vào localStorage
            return { success: true, token: data.access_token };
        } else {
            return { success: false, message: "Đăng nhập thất bại" };
        }
    } catch (error) {
        console.error("Login action error:", error);
        return { success: false, message: "Có lỗi xảy ra" , error: error};
    }
};

// Action đăng xuất
export const logoutAction = async () => {
    try {
        await API_logout();
        localStorage.removeItem("token"); // Xóa token khỏi localStorage
        return { success: true };
    } catch (error) {
        console.error("Logout action error:", error);
        return { success: false, message: "Đăng xuất thất bại" };
    }
};
