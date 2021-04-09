import * as actions from "./actions";
// import { auth, googleProvider } from "../Api/firebase";
const initialState = { user: {},lastpassused: null};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.LOGINEMP:
      return { ...state, user: action.user };
    case actions.LOGOUT:
      return { user: {} };
    default:
      return state;
  }
}
