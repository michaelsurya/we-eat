import axios from "axios";
import { GET_ERRORS, GET_NEW_PROFILE_PICT, GET_USER } from "./type";
import { toast } from "react-toastify";

export const changeProfilePict = (id, files) => (dispatch) => {
  let image = new FormData();

  image.append("imageName", `${id}${Date.now()}`);
  image.append("imageData", files[0]);

  axios
    .post(`/api/uploads/profile/${id}`, image)
    .then((result) => {
      dispatch({
        type: GET_NEW_PROFILE_PICT,
        payload: result.data,
      });
    })
    .catch((err) => {
      toast.error(err.response.data.error);
    });
};

export const editPhoneNumber = (id, phoneNumber) => async (dispatch) => {
  axios
    .patch(`/api/users/${id}`, phoneNumber)
    .then((res) => window.location.reload(false))
    .catch((err) => {
      toast.error(err.response.data.error);
    });
};

export const editProfile = (id, userData, history) => (dispatch) => {
  axios
    .patch(`/api/users/${id}`, userData)
    .then((res) => {
      history.push(`/profile/${id}`);
      toast.success("Profile saved");
    })
    .catch((err) => {
      toast.error(err.response.data.error);
    });
};

export const getUser = (id, history) => (dispatch) => {
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
      history.push("/error");
    });
};

export const getUserPrivate = (id, history) => (dispatch) => {
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
      history.push("/error");
    });
};

export const sendEmailVerification = (id) => (dispatch) => {
  axios
    .post(`/api/users/send/verification`, { id: id })
    .then((res) => {})
    .catch((err) => toast.error(err.response.data.error));
};

export const resendEmailVerification = (email, history) => () => {
  axios
    .post(`/api/users/resend/verification`, email)
    .then((res) => {
      history.push("/login");
      toast.success("Email verification has been sent.");
    })
    .catch((err) => {
      toast.error(err.response.data.error);
    });
};

export const writeReview = (user, target, review) => () => {
  axios
    .post(`/api/users/review`, { user: user, target: target, review: review })
    .then((res) => {
      toast.success("Thank you for writing a review.");
    })
    .catch((err) => {
      toast.error(err.response.data.error);
    });
};
