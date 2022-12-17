import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

import "./HealthBar.css";

const HealthBar = function ({ value }) {
  return (
    <div className="health-bar">
      <ProgressBar now={value} label={`${value}%`} />
    </div>
  );
};

export default HealthBar;
