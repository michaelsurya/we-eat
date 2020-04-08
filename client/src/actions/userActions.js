import axios from "axios";
import { GET_ERRORS, GET_NEW_PROFILE_PICT, GET_USER  } from "./type";

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

export const changeProfilePict = (id, files) => async (dispatch) => {
  let image = new FormData();

  image.append("imageName", `${id}${Date.now()}`);
  image.append("imageData", files[0]);

  axios
    .post(`/api/uploads/profile/${id}`, image)
    .then((result) => {
      dispatch({
        type: GET_NEW_PROFILE_PICT,
        payload: result.data
      })
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};
