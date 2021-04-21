import * as actions from "./actions";
import { auth, db } from "./firebase";
import store from "./store";

const initialState = { user: null, lastCodeUsed: null };

const getspeciality = async (temporaryStore) => {
  const ts = (
    await db.collection("Prof").doc(temporaryStore.user.uid).get()
  ).data();
  if (ts?.hasOwnProperty("speciality")) {
    // console.log(ts.hasOwnProperty("speciality"));
    store.dispatch({
      type: actions.UPDATESTORE,
      payload: {
        ...temporaryStore,
        user: { ...temporaryStore.user, speciality: ts.speciality },
      },
    });
  } else {
    //not yet
  }
};
export default function reducer(state = initialState, action) {
  // console.log("user info ", state);
  switch (action.type) {
    case actions.SIGNIN:
      let temp = { ...state, user: { ...state.user, ...action.payload.user } };
      if (!temp.user.hasOwnProperty("speciality")) {
        getspeciality(temp);
        break;
      }
      return temp;
    case actions.UPDATESTORE:
      return action.payload;
    case actions.LOGOUT:
      auth.signOut();
      return { ...state, user: null };
    default:
      return state;
  }
}
