import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Make sure to import correctly

// Function to check if the token is expired or valid
const isTokenValid = (token) => {
    if (!token) {
        return false; // If no token is present, it's invalid
    }

    try {
        // Decode the token
        const decodedToken = jwtDecode(token);
        const idStaff = decodedToken.sub;
        console.log("idStaff", idStaff);
        
        // Save idStaff to localStorage for further use
        localStorage.setItem("idStaff", idStaff);

        // Get the current time in seconds
        const currentTime = Date.now() / 1000; // Convert to seconds

        // Check if token has expired
        if (decodedToken.exp < currentTime) {
            return false; // Token is expired
        }

        // Validate the idStaff
        if (!idStaff || idStaff.trim() === "") {
            console.error("Invalid idStaff");
            return false;
        }

        // If the token is not expired and idStaff is valid
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

    // Additional validation for idStaff (Optional based on your requirements)
    const idStaff = localStorage.getItem("idStaff");
    if (!idStaff || idStaff.trim() === "") {
        console.error("Invalid idStaff detected");
        return <Navigate to="/dangnhap" />;
    }

    console.log("Access granted:", requiredRole);

    return children;
};

export default AuthMiddleware;
