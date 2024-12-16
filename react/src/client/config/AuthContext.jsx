import React, { createContext, useState, useContext, useEffect } from "react";

// Tạo Context
const AuthContext = createContext();
import useAuthActions from "../../admin/modules/authen/hooks/useAuth";

// Tạo Provider để cung cấp context cho toàn bộ ứng dụng
export const AuthProvider = ({ children }) => {
    const storedUser = localStorage.getItem("user");
    const [user, setUser] = useState(
        storedUser ? JSON.parse(storedUser) : null
    ); // Lấy user từ localStorage nếu có
    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem("tokenClient")
    );

    const { authGetmeClient } = useAuthActions();

    useEffect(() => {
        const token = localStorage.getItem("tokenClient");
        // Kiểm tra nếu không có token
        if (!token) {
            console.log("Chưa đăng nhập");
            return;
        }

        // Nếu có token, gọi API để lấy thông tin người dùng
        authGetmeClient()
            .then((userData) => {
               
                // Lưu thông tin người dùng vào state và localStorage
                const userInfo = {
                    name: userData?.payload?.data?.full_name,
                    id: userData?.payload?.data?.id,
                    phone: userData?.payload?.data?.phone,
                    email: userData?.payload?.data?.email,
                };

                setUser(userInfo);
                localStorage.setItem("user", JSON.stringify(userInfo));
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);

                // Nếu lỗi (ví dụ token không hợp lệ), thực hiện logout
                logout();
            });
    }, []);

    // Theo dõi sự thay đổi của token
    useEffect(() => {
        const interval = setInterval(() => {
            const token = localStorage.getItem("tokenClient");
            if (!token) {
                logout(); // Token bị xóa hoặc không hợp lệ, tự động logout
            }
        }, 1000); // Kiểm tra token mỗi giây

        return () => clearInterval(interval); // Dọn dẹp khi unmount
    }, []);

    const login = async (token) => {
        try {
            setIsLoggedIn(true);
            localStorage.setItem("tokenClient", token);

            // Lấy thông tin user sau khi đăng nhập thành công
            const user = await authGetmeClient();
            setUser(user.payload.data);
            localStorage.setItem(
                "user",
                JSON.stringify({
                    name: user.payload.data.full_name,
                    id: user.payload.data.id,
                    phone: user.payload.data.phone,
                    email: user.payload.data.email,
                })
            );
        } catch (e) {
            console.log(e);
        }
    };

    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem("tokenClient"); // Xóa token khi đăng xuất
        localStorage.removeItem("user"); // Xóa thông tin user khi đăng xuất
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
