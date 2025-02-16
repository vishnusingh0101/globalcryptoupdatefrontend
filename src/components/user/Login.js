import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../UserEntry.css";

function Login() {
    const navigate = useNavigate();

    async function validateUser(event) {
        event.preventDefault();
        const output = document.getElementById("outputMsg");
        const obj = {
            mail: document.getElementById("email").value,
            password: document.getElementById("password").value,
        };

        try {
            const user = await axios.post("http://localhost:3000/user/login", obj);
            console.log(user);
            if (user) {
                console.log(user);
                localStorage.setItem("token", user.data.token);
                localStorage.setItem("premium", user.data.ispremium);

                if (user.data.success === true) {

                    // Redirect to the homepage
                    navigate("/");
                }
            }
        } catch (err) {
            console.log(err);
            if (output) {
                output.innerText = "User Not Found";
            }
        }

        setTimeout(() => {
            if (output) {
                output.innerText = ""; 
            }
        }, 5000);
    }

    return (
        <div>
            <div className="signBody" id="signBody">
                <h1 className="title">Log In</h1>
                <h5 className="message">Welcome to our - Expense Tracker</h5>
                <h3 className="outputMsg" id="outputMsg"></h3>
                <form>
                    <div>
                        <p>
                            <label htmlFor="email">Email Address</label>
                        </p>
                        <input
                            type="email"
                            id="email"
                            name="email"
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
                            required
                        />
                    </div>
                    <button type="button" id="btn" onClick={validateUser}>
                        Log In
                    </button>
                    <p className="forgotPara">
                        <a href="/forgetpassword">Forgot Password</a>
                    </p>
                    <p className="para">
                        If You are a new Member <a href="/signup">Sign Up</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
