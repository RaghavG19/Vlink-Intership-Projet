import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import "./themeToggleStyle.css";

const ThemeToggle = ({ toggleTheme, theme }) => {
  return (
    <button className="btn-ombre" onClick={toggleTheme}>
      {theme === "light" ? <FaSun /> : <FaMoon />}
    </button>
  );
};

export default ThemeToggle;
