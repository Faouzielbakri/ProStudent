import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Mainpage from "./Pages/Mainpage";
import Loginpage from "./Pages/Loginpage";
import { auth, googleProvider } from "./backend/firebase";
import store from "./backend/store";
import * as actions from "./backend/actions";
import Profilepage from "./Pages/Profilepage";
function App() {
  const [user, setuser] = useState(store.getState().user);

  store.subscribe(() => {
    setuser(store.getState().user);
  });

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        // const currentuser = auth.currentUser;

        // console.log(isfetching, user.providerData[0]);
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
    //eslint-disable-next-line
  }, []);
  // [END auth_state_listener]
  console.log(user);
  return (
    // <>Hello</>
    <Router>
      {!user ? (
        <Loginpage signup={createNewUser} SignWithGoogle={SignWithGoogle} />
      ) : (
        <Switch>
          <Route path="/profile" exact>
            <Profilepage />
          </Route>
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
  auth.signInWithPopup(googleProvider);
}
export function createNewUser(info) {
  // console.error("hello");
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
