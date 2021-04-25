import { Grid } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import "./FirstPage.css";
import IamStudent from "../Components/IamStudent";
import IamaTeacher from "./../Components/IamaTeacher";
import StudentPage from "./StudentPage";
import { useHistory } from "react-router-dom";

function FirstPage() {
  const [switcher, setswitcher] = useState(false);
  const history = useHistory();
  return (
    <Grid className={`container  ${!switcher && "overflowhidden"}`}>
      <span className="FirstPage__Title" onClick={() => history.push("/")}>
        ProStudent
      </span>
      {!switcher ? (
        <div className="StudentPage__Choices">
          <IamaTeacher />
          <IamStudent setswitcher={setswitcher} />
        </div>
      ) : (
        <StudentPage />
      )}
    </Grid>
  );
}

export default FirstPage;
