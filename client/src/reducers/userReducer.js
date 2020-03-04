import { GET_USER } from "../actions/type";

const INTIIAL_STATE = {};

export default (state = INTIIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    default:
      return state;
  }
};
