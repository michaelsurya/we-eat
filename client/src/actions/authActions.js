import axios from "axios";
import setAuthToken from "../apis/setAuthToken";
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER, USER_LOADING } from "./type";
import { toast } from "react-toastify";

// Register User
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("/api/users/register", userData)
    .then((res) =>
      // re-direct to login on successful register
      {
        history.push("/login");
        toast.success(
          "Email verification has been sent. Please check your email"
        );
      }
    )
    .catch((err) => {
      toast.error(err.response.data.error);
    });
};

// Login - get user token
export const loginUser = (userData) => (dispatch) => {
  axios
    .post("/api/users/login", userData)
    .then((res) => {
      // Save to localStorage
      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
      toast.success(`Welcome, ${decoded.firstName}`);
    })
    .catch((err) => toast.error(err.response.data.error));
};

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

// Log user out
export const logoutUser = (history) => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isSignedIn to false
  dispatch(setCurrentUser({}));
  // Redirec to homepage
  history.push("/");
};
