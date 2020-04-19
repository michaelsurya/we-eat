import axios from "axios";
import { GET_ERRORS, GET_RESERVATION } from "./type";

export const createReservation = (eventID, hostID, userID, history) => (
  dispatch
) => {
  axios
    .post(`/api/reservations/`, {
      event: eventID,
      host: hostID,
      user: userID,
    })
    .then((result) => history.push(`/user/reservations`))
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const editReservation = (eventID, hostID, userID, status) => (
  dispatch
) => {
  axios
    .patch(`/api/reservations/`, {
      event: eventID,
      host: hostID,
      user: userID,
      status: status
    })
    .then((result) => window.location.reload())
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getMyReservations = (id) => (dispatch) => {
  axios
    .get(`/api/myreservations/${id}`)
    .then((res) => {
      dispatch({
        type: GET_RESERVATION,
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


