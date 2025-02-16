import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../UserEntry.css";

function Login() {
    const [email, setEmail] = useState(""); // Controlled input for email
    const [password, setPassword] = useState(""); // Controlled input for password
    const [error, setError] = useState(""); // Error message state
    const navigate = useNavigate();

    const validateUser = async (event) => {
        event.preventDefault();

        // Reset error message
        setError("");

        // Basic client-side validation
        if (!email || !password) {
            setError("Email and password are required");
            return;
        }

        try {
            // Send login request to backend
            const response = await axios.post("http://localhost:3000/admin/signin", {
                mail: email,
                password: password,
            });

            // Save token in localStorage
            localStorage.setItem("token", response.data.token);

            if (response.data.success) {
                console.log(response.data.success);
                // Redirect to the dashboard based on user role or default
                navigate("/admin/dashboard"); 
            }
        } catch (err) {
            console.error(err);
            // Handle error based on response or default message
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("Something went wrong. Please try again.");
            }
            // Clear error message after 5 seconds
            setTimeout(() => setError(""), 5000);
        }
    };

    return (
        <div className="login-container">
            <div className="signBody">
                <h1 className="title">Log In</h1>
                <h5 className="message">Welcome to our - Globalcryptoupdate</h5>
                {error && <h3 className="outputMsg">{error}</h3>} {/* Display error message */}
                <form onSubmit={validateUser}>
                    <div>
                        <p>
                            <label htmlFor="email">Email Address</label>
                        </p>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // Controlled input
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div>
                        <p>
                            <label htmlFor="password">Password</label>
                        </p>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Controlled input
                            required
                        />
                    </div>
                    <button type="submit" id="btn">
                        Log In
                    </button>
                    <p className="forgotPara">
                        <a href="/forgetpassword">Forgot Password</a>
                    </p>
                    <p className="para">
                        If You are a new Member <a href="/admin/signup">Sign Up</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
