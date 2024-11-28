import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// Function to check if the token is expired or valid
const isTokenValid = (token) => {
    if (!token) {
        return false; // If no token is present, it's invalid
    }

    try {
        // Decode the token
        const decodedToken = jwtDecode(token);

        // Get the current time in seconds
        const currentTime = Date.now() / 1000; // convert to seconds

        // Check if token has expired
        if (decodedToken.exp < currentTime) {
            return false; // Token is expired
        }

        // If the token is not expired
        return true;
    } catch (error) {
        console.error("Invalid token:", error);
        return false; // If decoding fails, the token is invalid
    }
};

const AuthMiddleware = ({ children, requiredRole }) => {
    const token = localStorage.getItem("token");

    // Check if the token is valid
    if (!isTokenValid(token)) {
        // Token is invalid or expired, redirect based on requiredRole
        if (requiredRole.requiredRole === "private") {
            if (requiredRole.role === "Client") {
                console.log(requiredRole.requiredRole);

                return <Navigate to="/dangnhap" />;
            } else {
                return <Navigate to="/admin/dangnhap" />;
            }
        } else {
            // If public route, allow access
            return children;
        }
    }

    console.log(requiredRole);

    return children;
};

export default AuthMiddleware;
