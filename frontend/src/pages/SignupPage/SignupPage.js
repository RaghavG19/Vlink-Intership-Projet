import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignupStyle.css";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate(); // Hook for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Send signup request to the backend
      const response = await axios.post(
        "http://localhost:5000/api/users/signup",
        {
          email,
          password,
          confirmPassword,
        }
      );

      if (response.status === 200) {
        // Redirect to login page with success message
        navigate("/login", {
          state: { message: "Signup successful! Please log in." },
        });
      }
    } catch (error) {
      console.error("There was an error signing up!", error);
      alert("There was an error signing up. Please try again.");
    }
  };

  return (
    <div className="signup-page">
      <h2>Sign Up</h2>
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
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
        <p>
          Already have an account? Click here to{" "}
          <Link to="/login" className="loginclick">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
