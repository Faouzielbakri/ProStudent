import React from "react";
import { useState } from "react";
import Courses from "../Components/Courses";
import "./Studentpage.css";
function StudentPage() {
  const [code, setcode] = useState("");
  return (
    <>
      <span className="FirstPage__login">
        You're a Teacher ? <a href="/login">Login</a>
      </span>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="text"
          value={code}
          onChange={(e) => setcode(e.target.value)}
          className="FirstPage__Codeinput"
          placeholder="type in the code(case-Sensitive)"
        />
      </form>

      <Courses isTeacher={false} code={code.toString()} />
    </>
  );
}

export default StudentPage;
