import React from "react";
import { useState } from "react";
import store from "../backend/store";
import * as actions from "../backend/actions";
import Navbar from "../Components/Navbar";
import "./Profilepage.css";
import { Link } from "react-router-dom";

function Profilepage() {
  const [user, setuser] = useState(store.getState().user);

  const temp__Image =
    "https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png";
  store.subscribe(() => {
    setuser(store.getState().user);
  });
  return (
    <div className="profilescreen">
      <Navbar />
      <div className="profileScreen__body">
        <h1>
          <Link to="/teacher">
            <img
              src="https://img.icons8.com/nolan/64/back.png"
              alt="back arrow"
              height="48"
            />
          </Link>
          Profile Info :
        </h1>
        <div className="profileScreen__info">
          <div className="profilescreen__image">
            <img src={user?.photoURL || temp__Image} alt="profileScreen__img" />
          </div>

          <div className="profileScreen__details">
            <h2>
              name : <span>{user?.displayName}</span>
            </h2>
            {user?.speciality ? (
              <h2>
                speciality :<span>{`${user?.speciality}`}</span>{" "}
              </h2>
            ) : (
              ""
            )}
            <h2>
              email : <span>{user?.email}</span>
            </h2>
            <div className="profileScreen__plans">
              <button
                onClick={() => {
                  store.dispatch({ type: actions.LOGOUT });
                }}
                className="profileScreen__signout"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profilepage;
