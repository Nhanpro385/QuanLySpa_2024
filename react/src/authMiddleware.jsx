import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

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
    const location = useLocation();
    const token = localStorage.getItem("token");

    // Kiểm tra token có hợp lệ không
    if (!isTokenValid(token)) {
        return <Navigate to="/admin/dangnhap" state={{ from: location }} />;
    }

    // const user = jwtDecode(token);
    //   console.log(user);
      
    // if (requiredRole && user.role !== requiredRole) {
    //     return <Navigate to="/unauthorized" />;
    // }

    return children;
};

export default AuthMiddleware;
