import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Mainpage from "./Pages/Mainpage";
import Loginpage from "./Pages/Loginpage";
import { auth, googleProvider } from "./backend/firebase";
import store from "./backend/store";
import * as actions from "./backend/actions";
function App() {
  const [user, setuser] = useState(store.getState().user);
  store.subscribe(() => {
    setuser(store.getState().user);
  });

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        // const currentuser = auth.currentUser;
        console.log(user.providerData[0]);
        // User is signed in
        // setuser(user.providerData[0]);
        store.dispatch({
          type: actions.SIGNIN,
          payload: { user: user.providerData[0] },
        });
      } else {
        // User is signed out
        store.dispatch({
          type: actions.LOGOUT,
        });
      }
    });
    // console.log(user);
  }, []);
  // [END auth_state_listener]

  return (
    <Router>
      {!user ? (
        <Loginpage signup={createNewUser} SignWithGoogle={SignWithGoogle} />
      ) : (
        <Switch>
          <Route path="/">
            <Mainpage />
          </Route>
        </Switch>
      )}
    </Router>
  );
}
export default App;
export function SignWithGoogle() {
  auth.signInWithRedirect(googleProvider);
}
export function createNewUser(info) {
  console.error("hello");
  auth
    .createUserWithEmailAndPassword(info.email, info.SIGNINpass)
    .then(() => {
      console.error("hello");
      const currentuser = auth.currentUser;
      currentuser
        .updateProfile({
          displayName: info.name,
        })
        .then(function () {
          // Update successful.
          store.dispatch({
            type: actions.SIGNIN,
            payload: {
              user: {
                ...currentuser,
                displayName: info.name,
              },
            },
          });
        })
        .catch(function (error) {
          alert(error.message);
        });
    })
    .catch((error) => {
      console.error("hello");
      alert(error.message);
    });
}
