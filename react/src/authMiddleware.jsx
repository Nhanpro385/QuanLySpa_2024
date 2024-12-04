import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Ensure correct import

// Function to check if the token is expired or valid
const isTokenValid = (token) => {
    if (!token) {
        console.error("Không tìm thấy token");
        return false;
    }

    try {
        const decodedToken = jwtDecode(token);
        const { sub: idStaff, exp } = decodedToken;

        localStorage.setItem("idStaff", idStaff);

        // Check if token has expired
        const currentTime = Math.floor(Date.now() / 1000);
   

        if (exp < currentTime) {
            console.warn("Token is expired");
            return false;
        }

        // Check if idStaff is valid
        if (!idStaff || idStaff.trim() === "") {
            console.error("Invalid idStaff");
            return false;
        }

        // Token is valid
        return true;
    } catch (error) {
        console.error("Invalid token:", error);
        return false;
    }
};

const AuthMiddleware = ({ children, requiredRole }) => {
    const type = requiredRole?.role === "Client" ? "tokenClient" : "tokenAdmin";

    const token = localStorage.getItem(type);

    // Validate the token
    const tokenValid = isTokenValid(token);

    // If the route is public, allow access regardless of token validity
    if (requiredRole?.requiredRole === "public") {
        return children;
    }

    // For private routes, redirect based on role if the token is invalid
    if (!tokenValid) {
        if (requiredRole?.role === "Client") {
            return <Navigate to="/dangnhap" />;
        } else if (requiredRole?.role === "Admin") {
            return <Navigate to="/admin/dangnhap" />;
        }

        return <Navigate to="/dangnhap" />;
    }

    // Validate idStaff (already checked in isTokenValid, but ensure it's consistent)
    const idStaff = localStorage.getItem("idStaff");
    if (!idStaff || idStaff.trim() === "") {
        console.error("Invalid idStaff detected");
        return <Navigate to="/dangnhap" />;
    }

   
    return children;
};

export default AuthMiddleware;
