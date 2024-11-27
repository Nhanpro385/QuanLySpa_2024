import React, { createContext, useState, useContext, useEffect } from "react";

// Tạo Context
const AuthContext = createContext();
import useAuthActions from "../../admin/modules/authen/hooks/useAuth";
// Tạo Provider để cung cấp context cho toàn bộ ứng dụng
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { authGetmeClient } = useAuthActions();
    // Kiểm tra thông tin user từ localStorage hoặc bất kỳ nơi nào lưu trữ
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const login = async (token) => {
        try {
            setUser(user);
            setIsLoggedIn(true);
            localStorage.setItem("token", token);

            if (token) {
                const user = await authGetmeClient();
                setUser(user.payload.data);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem("token"); // Xóa token khi đăng xuất
    };

    return (
        <AuthContext.Provider
            value={{ user, isLoggedIn, login, logout, setIsLoggedIn }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Tạo custom hook để sử dụng context
export const useAuth = () => {
    return useContext(AuthContext);
};
