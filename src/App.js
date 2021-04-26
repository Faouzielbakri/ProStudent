import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Mainpage from "./Pages/Mainpage";
import Loginpage from "./Pages/Loginpage";
import { auth, googleProvider } from "./backend/firebase";
import store from "./backend/store";
import * as actions from "./backend/actions";
import Profilepage from "./Pages/Profilepage";
import StudentPage from "./Pages/StudentPage";
import FirstPage from "./Pages/FirstPage";

function App() {
  //eslint-disable-next-line
  const [user, setuser] = useState(store.getState().user);
  //eslint-disable-next-line
  const [teacher, setteacher] = useState();
  store.subscribe(() => {
    setuser(store.getState().user);
  });
  // console.log(user);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed In
        store.dispatch({
          type: actions.SIGNIN,
          payload: { user: user.providerData[0] },
        });
        setteacher(true);
      } else {
        // User is signed out
        store.dispatch({
          type: actions.LOGOUT,
        });
      }
    });
    //eslint-disable-next-line
  }, []);
  useEffect(() => {
    // console.log(user);
  }, [user]);
  return (
    <Router>
      {/* {console.log(user)} */}
      {user && <Redirect to={"/teacher"} />}
      <Switch>
        <Route exact path="/teacher/profile">
          <Profilepage />
        </Route>
        <Route exact path="/teacher">
          <Mainpage />
        </Route>
        <Route exact path="/student">
          <StudentPage />
        </Route>
        <Route exact path="/login">
          <Loginpage />
        </Route>
        <Route path="/">
          <FirstPage />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
export function SignWithGoogle() {
  auth
    .signInWithPopup(googleProvider)
    .then((result) => {
      // /** @type {firebase.auth.OAuthCredential} */
      // The signed-in user info.
      var user = result.user.providerData[0];
      store.dispatch({ type: actions.SIGNIN, payload: user });
    })
    .catch((error) => {
      alert(error.message);
    });
}
export function createNewUser(info) {
  auth
    .createUserWithEmailAndPassword(info.email, info.password)
    .then(() => {
      console.error("new user");
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
      console.error("error");
      alert(error.message);
    });
}
export function SignWithEmail(info) {
  auth.signInWithEmailAndPassword(info.email, info.password).catch((error) => {
    console.error("withemail");
    alert(error.message);
  });
}
