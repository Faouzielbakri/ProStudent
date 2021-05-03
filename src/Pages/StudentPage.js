import React, { useState, useEffect } from "react";
import Courses from "../Components/Courses";
import "./Studentpage.css";
import { useParams } from "react-router-dom";

function StudentPage() {
  const [code, setcode] = useState("");
  let { Course_code } = useParams();
  useEffect(() => {
    if (Course_code) {
      setcode(Course_code);
    }
  }, [Course_code]);
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
