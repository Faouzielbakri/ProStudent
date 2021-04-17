import React from "react";
// import { useState } from "react";
// import store from "./../backend/store";
import "./Loginpage.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
// import { auth, googleProvider } from "../backend/firebase";
import SigninForm from "./../Components/SigninForm";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#fff", //your color
    },
  },
});
function Loginpage() {
  // const [user, setuser] = useState(store.getState().user);
  // store.subscribe(() => {
  //   setuser(store.getState().user);
  // });
  return (
    <ThemeProvider theme={theme}>
      <div className="Loginpage">
        <SigninForm />
      </div>
    </ThemeProvider>
  );
}

export default Loginpage;
