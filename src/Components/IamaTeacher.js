import React from "react";
import "./Iam.css";
import { useHistory } from "react-router-dom";
function IamaTeacher() {
  const history = useHistory();
  return (
    <div
      className="Iam"
      onClick={() => {
        history.push("/login");
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
          <p>Teacher</p>
        </div>
        <div class="perspective-line">
          <p>Teacher</p>
        </div>
      </div>
    </div>
  );
}

export default IamaTeacher;
