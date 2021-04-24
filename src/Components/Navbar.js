import React from "react";
import "./Navbar.css";
import { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { Button } from "@material-ui/core";
import * as actions from "../backend/actions";
import store from "../backend/store";
import { Link, useHistory } from "react-router-dom";
function Navbar() {
  //eslint-disable-next-line
  const [user, setuser] = useState(store.getState().user);
  const history = useHistory();
  store.subscribe(() => {
    setuser(store.getState().user);
    // console.log(user);
  });

  return (
    <div className="Navbar">
      {!user ? history.push("/login") : ""}
      <Link to="/teacher/profile">
        <Avatar
          alt={user?.displayName}
          src={user?.photoURL}
          className="Navbar__profilepicture"
        />
      </Link>
      <span className="Navbar__username">{user?.displayName}</span>
      <div className="Navbar_separator" />
      <span className="Navbar__speciality">{user?.speciality}</span>
      <Button
        id="Navbar__Singout"
        onClick={() => {
          store.dispatch({ type: actions.LOGOUT });
        }}
      >
        Sign Out
      </Button>
      {/* <img src= alt={`${user.displayname} pic`} className="Navbar__profilepicture"/> */}
    </div>
  );
}

export default Navbar;
