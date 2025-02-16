import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [outputMsg, setOutputMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/password/forgotpassword",
        { mail: email }
      );
      setOutputMsg(response.data.message);
      setTimeout(() => {
        setOutputMsg("");
        window.location.href = "/login";
      }, 4000);
    } catch (error) {
      setOutputMsg("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setEmail("");
    }
  };

  return (
    <div
      style={{
        backgroundImage: "white",
        backgroundSize: "cover",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          padding: "20px",
          borderRadius: "8px",
          width: "80%",
          maxWidth: "400px",
          boxShadow: "2px 2px 8px 2px rgba(0, 0, 0, 0.5)",
        }}
      >
        {outputMsg && (
          <h3 style={{ color: "red", textAlign: "center" }}>{outputMsg}</h3>
        )}
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" style={{ color: "aliceblue", fontSize: "16px" }}>
            Email:
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              display: "block",
              width: "100%",
              height: "25px",
              margin: "10px 0",
              border: "none",
              borderRadius: "3px",
              backgroundColor: "#e5e5e5",
            }}
          />
          <button
            type="submit"
            style={{
              display: "block",
              width: "100%",
              height: "40px",
              fontSize: "large",
              color: "darkslategray",
              backgroundColor: "aqua",
              borderRadius: "8px",
              border: "none",
              marginTop: "20px",
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;