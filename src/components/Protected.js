import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const ProtectedRoute = ({ children, role }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/admin/login" />;
    }

    const decoded = jwtDecode(token);
    console.log(decoded);

    // Check role if provided
    if (role && decoded.userRole !== role) {
        return <Navigate to="/admin/login" />;
    }

    return children;
};

export default ProtectedRoute;
