// src/pages/LoginPage/LoginPage.js
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./LoginStyle.css";

const LOGIN_API_URL = "http://localhost:5000/api/users/login"; // Define your API endpoint

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showMessage, setShowMessage] = useState(false); // Manage message visibility
  const [loginError, setLoginError] = useState(""); // Manage login errors
  const [loading, setLoading] = useState(false); // Manage loading state
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const message = state?.message; // Get the success message from state if available

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

    // Basic client-side validation
    if (!email || !password) {
      setLoginError("Email and password are required.");
      return;
    }

    setLoading(true); // Set loading state to true

    try {
      const response = await fetch(LOGIN_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Successful login
        navigate("/resume-builder");
      } else {
        // Handle login error
        setLoginError(data.message || "Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("An error occurred. Please try again later.");
    } finally {
      setLoading(false); // Set loading state to false
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
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-required="true"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-required="true"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
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
