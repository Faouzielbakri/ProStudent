import React from "react";
import "./Iam.css";
function IamStudent({ setswitcher }) {
  return (
    <div
      className="Iam"
      onClick={() => {
        setswitcher(true);
      }}
    >
      <div class="perspective-text">
        <div class="perspective-line">
          <p></p>
          <p>I am</p>
        </div>
        <div class="perspective-line">
          <p>I am</p>
          <p>a</p>
        </div>
        <div class="perspective-line">
          <p>a</p>
          <p>Student</p>
        </div>
        <div class="perspective-line">
          <p>Student</p>
        </div>
      </div>
    </div>
  );
}

export default IamStudent;
