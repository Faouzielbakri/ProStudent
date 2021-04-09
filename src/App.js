import "./App.css";
import { BrowserRouter as Router, Switch, Route,  } from "react-router-dom";
// import { useEffect, useState } from "react";
import Mainpage from "./Pages/Mainpage";
import Loginpage from "./Pages/Loginpage";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
            <Loginpage />
        </Route>
        <Route path="/" >
            <Mainpage />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
