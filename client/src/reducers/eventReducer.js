import { GET_EVENT } from "../actions/type";

const INTIIAL_STATE = {};

export default (state = INTIIAL_STATE, action) => {
  switch (action.type) {
    case GET_EVENT:
      return action.payload;
    default:
      return state;
  }
};
