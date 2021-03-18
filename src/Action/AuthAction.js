import ApiFunction from "../helper/axios";
import instance from "../helper/axios";

import {
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  SIGNIN_FAILED,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
} from "./ActionType";
const jwt = require("jsonwebtoken");
export const signIn = (form) => (dispatch) => {
  dispatch({ type: SIGNIN_REQUEST });
  ApiFunction()
    .post("admin/signin", form)
    .then((res) => {
      const { token } = res.data;
      const { user } = jwt.decode(token);
      localStorage.setItem("token", token);

      dispatch({ type: SIGNIN_SUCCESS, payload: { user, token } });
    })
    .catch((err) => dispatch({ type: SIGNIN_FAILED }));
};

export const logut = () => (dispatch) => {
  dispatch({ type: LOGOUT_REQUEST });
  localStorage.clear();
  dispatch({ type: LOGOUT_SUCCESS });
  window.location.href = "./signin";
};

export const isUserLoggedIn = () => (dispatch) => {
  const token = localStorage.getItem("token");

  if (token) {
    const { user } = jwt.decode(token);
    dispatch({ type: SIGNIN_SUCCESS, payload: { user, token } });
  } else {
    dispatch({
      type: SIGNIN_FAILED,
      payload: { error: "Failed to login" },
    });
  }
};
