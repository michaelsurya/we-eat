import axios from "axios";
import { GET_USER, GET_ERRORS } from "./type";

export const getUser = id => async dispatch => {
  axios
    .get(`/api/users/${id}`)
    .then(res => {
      dispatch({
        type: GET_USER,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
