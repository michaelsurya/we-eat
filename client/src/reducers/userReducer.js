import { GET_USER, GET_NEW_PROFILE_PICT } from "../actions/type";

const INTIIAL_STATE = {};

export default (state = INTIIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    case GET_NEW_PROFILE_PICT:
      return {
        ...state,
        isFetching: false,
        profilePict: action.payload,
      };
    default:
      return state;
  }
};
