import axios from "axios";
import { GET_USER, GET_ERRORS } from "./type";

export const editPhoneNumber = (id, phoneNumber) => async (dispatch) => {
  axios
    .patch(`/api/users/${id}`, phoneNumber)
    .then((res) => window.location.reload(false))
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const editProfile = (id, userData, history) => async (dispatch) => {
  axios
    .patch(`/api/users/${id}`, userData)
    .then((res) => history.push(`/profile/${id}`))
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getUser = (id) => async (dispatch) => {
  axios
    .get(`/api/users/${id}`)
    .then((res) => {
      dispatch({
        type: GET_USER,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getUserPrivate = (id) => async (dispatch) => {
  axios
    .get(`/api/users/private/${id}`)
    .then((res) => {
      dispatch({
        type: GET_USER,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const sendEmailVerification = (id) => async (dispatch) => {
  axios
    .post(`/api/users/send/verification`, { id: id })
    .then((res) => {})
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};
