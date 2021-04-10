import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Mainpage from "./Pages/Mainpage";
import Loginpage from "./Pages/Loginpage";
import { auth, googleProvider } from "./backend/firebase";
import store from "./backend/store";

function App() {
  const [user, setuser] = useState(store.getState());
  const signin = () => {
    auth.signInWithRedirect(googleProvider);
  };
  const singout = () => {
    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        store.dispatch({
          type: "",
          payload: {
            user: {},
          },
        });
        // ...
      } else {
        // User is signed out
        // ...
        setuser(null);
      }
    });
    // console.log(user);
  }, []);
  // [END auth_state_listener]

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Loginpage />
          <button
            onClick={() => {
              signin();
            }}
          >
            login
          </button>
          <button
            onClick={() => {
              singout();
            }}
          >
            singout
          </button>
        </Route>
        <Route path="/">
          <Mainpage />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
