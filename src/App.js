import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import CryptoDetail from "./components/CryptoDetail";
import NewsDetail from "./components/NewsDetail";
import BannedPage from "./components/BannedPage";

// User Components
import UserLogin from "./components/user/Login";
import UserSignup from "./components/user/Signup";
import UserForgetPassword from "./components/user/forgetpassword";

// Admin Components
import AdminLogin from "./components/admin/Login";
import AdminSignup from "./components/admin/Signup";
import AdminDashboard from "./components/admin/Dashboard";
import ManageUsers from "./components/admin/Dashboard";
import ManageNews from "./components/admin/ManageNews";

//Procted Route
import ProtectedRoute from "./components/Protected";

// Bootstrap for styling
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
    const location = useLocation();

    // Routes where the Navbar should not be visible
    const noNavbarRoutes = [
        "/user/login",
        "/user/signup",
        "/user/forgetpassword",
        "/admin/login",
        "/admin/signup",
    ];

    return (
        <>
            {/* Conditionally render the Navbar */}
            {!noNavbarRoutes.includes(location.pathname) && <Navbar />}
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/banned" element={<BannedPage />} />
                <Route path="/crypto/:id" element={<CryptoDetail />} />
                <Route path="/news/:id" element={<NewsDetail />} />

                {/* User Routes */}
                <Route path="/user/login" element={<UserLogin />} />
                <Route path="/user/signup" element={<UserSignup />} />
                <Route path="/user/forgetpassword" element={<UserForgetPassword />} />

                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/signup" element={<AdminSignup />} />
                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute role="admin">
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/manage-users"
                    element={
                        <ProtectedRoute role="admin">
                            <ManageUsers />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/news"
                    element={
                        <ProtectedRoute role="admin">
                            <ManageNews />
                        </ProtectedRoute>
                    }
                />
                {/* Redirect invalid paths to HomePage */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </>
    );
};

const RootApp = () => (
    <Router>
        <App />
    </Router>
);

export default RootApp;
