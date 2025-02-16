import React, { useState } from "react";
import axios from "axios";
import "../UserEntry.css";

function SignUp() {
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
    });

    const [outputMsg, setOutputMsg] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const addToDatabase = async (event) => {
        event.preventDefault();
        const obj = {
            name: formData.userName,
            mail: formData.email,
            password: formData.password,
        };

        try {
            const response = await axios.post(
                "http://localhost:3000/user/SignUp",
                obj
            );
            console.log(response);

            if (response.data.message === "Created new user") {
                setOutputMsg("User created successfully! Redirecting...");
                setTimeout(() => {
                    window.location.href = "/login";
                }, 2000);
            }
        } catch (err) {
            console.error(err);
            if (err.response && err.response.data.message) {
                setOutputMsg(err.response.data.message);
            } else {
                setOutputMsg("An error occurred. Please try again.");
            }
        }

        setTimeout(() => {
            setOutputMsg(""); // Clear the message after 5 seconds
        }, 5000);

        // Clear input fields
        setFormData({
            userName: "",
            email: "",
            password: "",
        });
    };

    return (
        <div>
            <div className="signBody" id="signBody">
                <h1 className="title">Sign Up</h1>
                <h5 className="message">Welcome to our - Expense Tracker</h5>
                <h3 className="outputMsg">{outputMsg}</h3>
                <form onSubmit={addToDatabase}>
                    <div>
                        <p>
                            <label htmlFor="userName">User Name</label>
                        </p>
                        <input
                            type="text"
                            id="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div>
                        <p>
                            <label htmlFor="email">Email Address</label>
                        </p>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
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
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" id="btn">
                        Sign Up
                    </button>
                    <p className="para">
                        Already a member? <a href="/login">Log in</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
