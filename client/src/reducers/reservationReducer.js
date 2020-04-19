import { GET_RESERVATION } from "../actions/type";

const INTIIAL_STATE = {};

export default (state = INTIIAL_STATE, action) => {
  switch (action.type) {
    case GET_RESERVATION:
      return action.payload;
    default:
      return state;
  }
};
