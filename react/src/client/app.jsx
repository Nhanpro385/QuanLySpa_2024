import React from "react";
import { Routes, Route } from "react-router-dom";
import { PublicRoutes } from "./config/routes";
import "bootstrap/dist/css/bootstrap.min.css";
import GlobalStyles from "../admin/components/GlobalStyles/index";
import DefaultLayout from "./components/layout/DefaultLayout";
import AuthMiddleware from "@/authMiddleware";

const AppClient = () => {
    console.log(PublicRoutes);

    return (
        <GlobalStyles>
            <Routes>
                {PublicRoutes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            <AuthMiddleware requiredRole={route.requiredRole}>
                                <DefaultLayout>{route.element}</DefaultLayout>
                            </AuthMiddleware>
                        }
                    />
                ))}
                {/* Nếu bạn cần phải xử lý các route con khác, bạn có thể thêm ở đây */}
            </Routes>
        </GlobalStyles>
    );
};

export default AppClient;
