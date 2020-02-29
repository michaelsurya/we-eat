import { SET_CURRENT_USER, USER_LOADING } from "../actions/type";

import isEmpty from "lodash/isEmpty";

const INTIIAL_STATE = {
  isSignedIn: false,
  user: {},
  loading: false
};

export default (state = INTIIAL_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isSignedIn: !isEmpty(action.payload),
        user: action.payload
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
