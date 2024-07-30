import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import "./headerStyle.css";

const Header = ({ toggleTheme, theme }) => {
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
          <Link to="/login" className="nav-link">
            Login/Signup
          </Link>
          <ThemeToggle toggleTheme={toggleTheme} theme={theme} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
