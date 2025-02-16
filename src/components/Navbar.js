import React from "react";
import { Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import "./Navbar.css"

function Navbar() {
    // const clientId = "process.env.REACT_APP_GOOGLE_CLIENT_ID"; // Replace with Google Client ID

    const onSuccess = (response) => {
      console.log("Login Success: Current User:", response.profileObj);
      // Send the token to your backend for verification
      // Or store it locally to access user info
    };
  
    const onFailure = (error) => {
      console.error("Login Failed:", error);
    };
  
    // const { signIn } = useGoogleLogin({
    //   clientId,
    //   onSuccess,
    //   onFailure,
    //   isSignedIn: true,
    // });
    return (
        <nav className="navbar">
            <div className="logo">Global Crypto Update</div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/">News</Link></li>
                <li><a href="#" onClick='#' className="google-login-btn">Login</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;
