import React, { useState } from "react";
import "./signup.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { createNewUser, SignWithGoogle } from "./../App";
function SigninForm() {
  const [switcher, setswitcher] = useState(false);
  const [info, setInfo] = useState({});

  return (
    <div
      class="form"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div class="sign-in-section">
        <ArrowBackIcon
          id="arrow-back"
          onClick={() => {
            setswitcher(false);
          }}
        />
        <h1>Log in</h1>
        <ul>
          <li
            onClick={() => {
              SignWithGoogle();
            }}
          >
            <img
              src="https://img.icons8.com/fluent/48/000000/google-logo.png"
              width="36"
              height="36"
              alt="google logo"
            />
          </li>
        </ul>
        <p>or use your email</p>
        <form>
          <div class="form-field">
            <label for="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              required
              value={info.email || ""}
              onChange={(e) => {
                setInfo({ ...info, email: e.target.value });
              }}
            />
          </div>
          <div class="form-field">
            <label for="password">Password</label>
            <input
              id="password"
              type="password"
              required
              placeholder="Password"
              value={info.password || ""}
              onChange={(e) => {
                setInfo({ ...info, password: e.target.value });
              }}
            />
          </div>
          {switcher ? (
            <>
              <div class="form-field">
                <label for="name">Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Full Name"
                  required
                  value={info.name || ""}
                  onChange={(e) => {
                    setInfo({ ...info, name: e.target.value });
                  }}
                />
              </div>
              <div class="form-field">
                <label for="speciality">Speciality</label>
                <input
                  id="speciality"
                  type="text"
                  placeholder="Enter Your Speciality"
                  required
                  value={info.speciality || ""}
                  onChange={(e) => {
                    setInfo({ ...info, speciality: e.target.value });
                  }}
                />
              </div>
            </>
          ) : (
            ""
          )}
          <div class="form-field btns">
            <button
              class="btn btn-signup"
              onClick={() => {
                if (info.password && info.email) {
                  if (!switcher) {
                    setswitcher(true);
                  } else {
                    createNewUser(info);
                  }
                }
              }}
            >
              Sign Up
            </button>
            <button type="submit" class="btn btn-signin" disabled>
              Log In{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SigninForm;
