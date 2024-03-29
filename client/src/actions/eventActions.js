import axios from "../apis/axios";
import moment from "moment";
import { GET_ERRORS, GET_EVENT, GET_EVENTS } from "./type";
import { toast } from "react-toastify";

export const createEvent = (id, formData, history) => (dispatch) => {
  //Prepare event data
  const eventData = Object.assign({}, formData);

  // Set date to correct format
  eventData.date = `${formData.date} ${formData.time}`;
  eventData.time = moment
    .utc(formData.time, "HH:mm")
    .diff(moment.utc().startOf("day"), "seconds");
  eventData.host = id;

  // Initialise the form data
  let fd = new FormData();
  // Populate the form data based on the redux form value
  for (let [key, value] of Object.entries(eventData)) {
    // Convert array to proper form data
    if (
      (Array.isArray(value) || typeof value === "object") &&
      key !== "pictures"
    ) {
      // value.forEach((item, index) => {
      //   fd.append(`${key}[${index}]`, item);
      // });
      fd.append(key, JSON.stringify(value));
    }
    // Convert object (uploaded files) to proper form data
    else if (
      key === "pictures" &&
      typeof value === "object" &&
      value !== null
    ) {
      for (let [index, value] of Object.entries(value)) {
        fd.append(`${key}[${index}]`, value);
      }
    } else {
      fd.append(key, value);
    }
  }

  axios
    .post(`/api/events/`, fd)
    .then((result) => {
      history.push(`/event/${result.data._id}`);
      toast.success("Event created");
    })
    .catch((err) => {
      toast.error(err.response.data.error);
    });
};

export const getEvent = (id, history) => (dispatch) => {
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
      history.push("/error");
    });
};

export const getMyEvents = (id) => (dispatch) => {
  axios
    .get(`/api/myevents/${id}`)
    .then((res) => {
      dispatch({
        type: GET_EVENT,
        payload: res.data,
      });
    })
    .catch((err) => {
      toast.error(err.response.data.error);
    });
};

export const searchEvent = (searchQuery) => (dispatch) => {
  axios
    .get(`/api/events/${searchQuery}`)
    .then((res) => {
      dispatch({
        type: GET_EVENTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      toast.error(err.response.data.error);
    });
};
