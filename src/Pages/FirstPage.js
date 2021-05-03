import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import "./FirstPage.css";
import IamStudent from "../Components/IamStudent";
import IamaTeacher from "./../Components/IamaTeacher";
import StudentPage from "./StudentPage";

function FirstPage() {
  const [switcher, setswitcher] = useState(false);

  return (
    <Grid className={`container  ${!switcher && "overflowhidden"}`}>
      <span className="FirstPage__Title" onClick={() => setswitcher(false)}>
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
