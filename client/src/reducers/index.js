import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import eventReducer from "./eventReducer";
import reservationReducer from "./reservationReducer";
import userReducer from "./userReducer";

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  event: eventReducer,
  form: formReducer,
  reservation :reservationReducer,
  user: userReducer,
});
