// src/pages/LoginPage/LoginPage.js
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./LoginStyle.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showMessage, setShowMessage] = useState(false); // State to manage message visibility
  const [loginError, setLoginError] = useState(""); // State to manage login errors
  const navigate = useNavigate();

  // Access location state
  const location = useLocation();
  const { state } = location;
  const message = state?.message; // Get the success message from state if available

  // Use effect to set a timeout for hiding the message
  useEffect(() => {
    if (message) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 3000); // Hide message after 3 seconds
      return () => clearTimeout(timer); // Clean up the timer on component unmount
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your API call here
    try {
      const response = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.success) {
        navigate("/resume-builder");
      } else {
        setLoginError(data.message || "Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      {showMessage && <p className="success-message">{message}</p>}{" "}
      {/* Display success message */}
      {loginError && <p className="error-message">{loginError}</p>}{" "}
      {/* Display login error message */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <p className="signupLink">
          New User? Click here to{" "}
          <Link to="/signup" className="signupclick">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
