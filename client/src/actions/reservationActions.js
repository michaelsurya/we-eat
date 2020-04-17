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
