import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import eventReducer from "./eventReducer";
import userReducer from "./userReducer";

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  event: eventReducer,
  form: formReducer,
  user: userReducer,
});
