import React from "react";
import "./Loginpage.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import SigninForm from "./../Components/SigninForm";
import { useState } from "react";
import store from "../backend/store";
import { useHistory } from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#fff", //my primary color
    },
  },
});
function Loginpage() {
  const [user, setUser] = useState(store.getState().user);
  const history = useHistory();
  store.subscribe(() => {
    setUser(store.getState().user);
  });
  if (!(user === null)) {
    history.push("/teacher");
  }
  return (
    <ThemeProvider theme={theme}>
      <div className="Loginpage">
        <SigninForm />
      </div>
    </ThemeProvider>
  );
}

export default Loginpage;
