import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";

const isTokenValid = (token) => {
    if (!token) return false;
    try {
        const decoded = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);

        return decoded.exp > currentTime;
    } catch (error) {
        return false;
    }
};

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

    // Kiểm tra token có hợp lệ không
    // if (!isTokenValid(token)) {
    //     return <Navigate to="/admin/dangnhap" state={{ from: location }} />;
    // }

    return children;
};

export default AuthMiddleware;
