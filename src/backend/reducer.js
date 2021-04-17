import * as actions from "./actions";
import { auth } from "./firebase";

const initialState = { user: null, lastCodeUsed: null };

export default function reducer(state = initialState, action) {
  // console.log("user info ", state);
  switch (action.type) {
    case actions.SIGNIN:
      return { ...state, user: { ...state.user, ...action.payload.user } };
    case actions.LOGOUT:
      auth.signOut();
      return { ...state, user: null };
    default:
      return state;
  }
}
