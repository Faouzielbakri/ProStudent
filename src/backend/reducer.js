import * as actions from "./actions";
import { auth, db } from "./firebase";

const initialState = { user: null, lastCodeUsed: null };

//eslint-disable-next-line
const getspeciality = async (temporaryStore) => {
  const ts = (
    await db.collection("Prof").doc(temporaryStore.user.uid).get()
  ).data();
  if (ts?.hasOwnProperty("speciality")) {
    return ts.speciality;
  } else {
    return null;
  }
};
const setspeacility = async (speciality, profuid) => {
  console.log(speciality, profuid);
  await db.collection("Prof").doc(profuid).set({
    speciality: speciality,
  });
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.SIGNIN:
      let temp = { ...state, user: { ...state.user, ...action.payload.user } };
      if (!temp.user.hasOwnProperty("speciality")) {
        getspeciality(temp).then((params) => {
          if (params) {
            temp.user.speciality = params;
          }
          return temp;
        });
      }
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
