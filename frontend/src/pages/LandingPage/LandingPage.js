import React from "react";
import { Link } from "react-router-dom";
import "./LandingStyle.css";
import sampleResume from "./photos/SampleResume.png";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="info-section">
        <h1>Welcome to Resume Craft!</h1>
        <p>Create professional, ATS approved resumes easily...</p>
        <Link to="/login" className="get-started">
          Get Started
        </Link>
      </div>
      <div className="resume-section">
        {
          <img
            src={sampleResume}
            alt="Sample Resume"
            className="landing-page-image"
          />
        }
      </div>
    </div>
  );
};

export default LandingPage;
