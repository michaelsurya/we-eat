import axios from "axios";
import { GET_ERRORS } from "./type";

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


