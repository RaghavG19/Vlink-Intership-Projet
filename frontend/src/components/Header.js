import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import "./headerStyle.css";

const Header = ({ toggleTheme, theme }) => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token on logout
    navigate("/"); // Redirect to home or any other page
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/">Resume Craft</Link>
        </div>
        <div className="navbar-nav">
          <Link to="/" className="nav-link">
            Home
          </Link>
          {isAuthenticated ? (
            <button className="nav-link" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/login" className="nav-link">
              Login/Signup
            </Link>
          )}
          <ThemeToggle toggleTheme={toggleTheme} theme={theme} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
