import axios from "axios";
import { GET_ERRORS, GET_RESERVATION } from "./type";
import { toast } from "react-toastify";

export const createReservation = (eventID, hostID, userID, history) => (
  dispatch
) => {
  axios
    .post(`/api/reservations/`, {
      event: eventID,
      host: hostID,
      user: userID,
    })
    .then((result) => {
      history.push(`/user/reservations`);
      toast.success("Reservation request has been sent to the host.");
    })
    .catch((err) => {
      toast.error(err.response.data.error);
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
      status: status,
    })
    .then((result) => window.location.reload())
    .catch((err) => {
      toast.error(err.response.data.error);
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
      toast.error(err.response.data.error);
    });
};
