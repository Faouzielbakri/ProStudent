import * as actions from "./actions";
import { auth, db } from "./firebase";
import store from "./store";

const initialState = { user: null, lastCodeUsed: null };

//eslint-disable-next-line
const getspeciality = async (temporaryStore) => {
  const ts = (
    await db.collection("Prof").doc(temporaryStore.user.uid).get()
  ).data();
  if (ts?.hasOwnProperty("speciality")) {
    store.dispatch({
      type: actions.UPDATESTORE,
      payload: {
        ...temporaryStore,
        user: { ...temporaryStore.user, speciality: ts.speciality },
      },
    });
  } else {
    store.dispatch({
      type: actions.UPDATESTORE,
      payload: {
        ...temporaryStore,
      },
    });
  }
};
const setspeacility = async (speaciality, profuid) => {
  console.log(speaciality, typeof speaciality);
  await db.collection("Prof").doc(profuid).update({
    speaciality: speaciality,
  });
};
export default function reducer(state = initialState, action) {
  // console.log("user info ", state);
  switch (action.type) {
    case actions.SIGNIN:
      let temp = { ...state, user: { ...state.user, ...action.payload.user } };
      console.log(temp);
      if (!temp.user.hasOwnProperty("speciality")) {
        getspeciality(temp);
        break;
      }
      console.log(temp);
      return temp;
    case actions.UPDATESTORE:
      return action.payload;
    case actions.SETSPEACILITY:
      setspeacility(action.payload.speciality, state.user.uid);
      return { ...state, user: { ...state.user, ...action.payload } };
    case actions.LOGOUT:
      auth.signOut();
      return { ...state, user: null };
    default:
      return state;
  }
}
