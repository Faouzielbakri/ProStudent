import React from "react";
import "./Loginpage.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import SigninForm from "./../Components/SigninForm";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#fff", //my primary color
    },
  },
});
function Loginpage() {
  return (
    <ThemeProvider theme={theme}>
      <div className="Loginpage">
        <SigninForm />
      </div>
    </ThemeProvider>
  );
}

export default Loginpage;
