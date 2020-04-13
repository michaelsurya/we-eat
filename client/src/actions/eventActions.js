import axios from "axios";
import { GET_ERRORS, GET_EVENT } from "./type";

export const createEvent = (id, formData, history) => async (dispatch) => {
  //Prepare event data
  const eventData = Object.assign({}, formData);

  // Set date to correct format
  eventData.date = `${formData.date} ${formData.time}`;
  eventData.host = id;
  delete eventData.time;

  // Initialise the form data
  let fd = new FormData();
  // Populate the form data based on the redux form value
  for (let [key, value] of Object.entries(eventData)) {
    // Convert array to proper form data
    if (Array.isArray(value)) {
      // value.forEach((item, index) => {
      //   fd.append(`${key}[${index}]`, item);
      // });
      fd.append(key, JSON.stringify(value));
    }
    // Convert object (uploaded files) to proper form data
    else if (typeof value === "object" && value !== null) {
      for (let [index, value] of Object.entries(value)) {
        fd.append(`${key}[${index}]`, value);
      }
    } else {
      fd.append(key, value);
    }
  }

  axios
    .post(`/api/events/`, fd)
    .then((result) => history.push(`/event/${result.data._id}`))
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getEvent = (id, history) => async (dispatch) => {
  axios
    .get(`/api/events/${id}`)
    .then((res) => {
      dispatch({
        type: GET_EVENT,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
      history.push("/error")
    });
};
