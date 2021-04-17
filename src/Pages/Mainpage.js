import { Grid } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import store from "../backend/store";
import Addcours from "../Components/Addcours";
import Courses from "../Components/Courses";
import Navbar from "../Components/Navbar";
import "./Mainpage.css";
function Mainpage() {
  const [user, setuser] = useState(store.getState().user);
  store.subscribe(() => {
    setuser(store.getState().user);
  });
  return (
    <div className="Mainpage">
      <Navbar />
      <Grid className="Mainpage__body">
        <Addcours user={user} setuser={setuser} />
        <Courses user={user} setuser={setuser} />
      </Grid>
    </div>
  );
}

export default Mainpage;
