import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { PublicRoutes } from "./config/routes";
import { Provider } from "react-redux";
import store from "@admin/redux/store/store.jsx";
import AuthMiddleware from "@/authMiddleware";
import AdminLayout from "@admin/components/layout/AdminLayout";
import { Button, Result } from "antd";
import LoginPage from "./pages/authen/loginPage";
import ForgotPage from "./modules/authen/compoment/forgotPage";
import Newpassword from "./modules/authen/compoment/newpassPage";
const AppAdmin = () => {
    return (
        <Provider store={store}>
            <Routes>
                {PublicRoutes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            <AuthMiddleware requiredRole="admin">
                                <AdminLayout>{route.element}</AdminLayout>
                            </AuthMiddleware>
                        }
                    />
                ))}

                {/* Route 404 */}
                <Route path="*" element={<NotFound />} />
                <Route path="/dangnhap" element={<LoginPage />} />
                <Route path="/quenmatkhau" element={<ForgotPage />} />
                <Route path="/matkhaumoi" element={<Newpassword />} />
            </Routes>
        </Provider>
    );
};

// Component hiển thị cho trang 404
const NotFound = () => {
    const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

    return (
        <Result
            status="404"
            title="404"
            subTitle="Xin lỗi, trang bạn truy cập không tồn tại."
            extra={
                <Button
                    type="primary"
                    onClick={() => navigate("/admin")} // Sử dụng navigate để điều hướng
                >
                    Trở về trang chủ
                </Button>
            }
        />
    );
};

export default AppAdmin;
