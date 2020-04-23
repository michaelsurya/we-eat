import { GET_EVENT, GET_EVENTS } from "../actions/type";

const INTIIAL_STATE = {};

export default (state = INTIIAL_STATE, action) => {
  switch (action.type) {
    case GET_EVENT:
      return action.payload;
    case GET_EVENTS:
      return action.payload;
    default:
      return state;
  }
};
