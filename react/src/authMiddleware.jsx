import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const AuthMiddleware = ({ children, requiredRole }) => {
    const token = localStorage.getItem("token");
    if (!token) {
        if (requiredRole.requiredRole === "private") {
            if (requiredRole.role === "Client") {
                return <Navigate to="/dangnhap" />;
            } else {
                return <Navigate to="/admin/dangnhap" />;
            }
        } else {
            return children;
        }
    }

  

    return children;
};

export default AuthMiddleware;
