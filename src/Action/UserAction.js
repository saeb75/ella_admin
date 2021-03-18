import ApiFunction from "../helper/axios";
import instance from "../helper/axios";
import {
  DELETE_USER_FAILED,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  GET_USER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  UPDATE_USER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
} from "./ActionType";

export const getUsers = () => (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  ApiFunction()
    .get("getusers")
    .then((res) => {
      let users = res.data;
      return dispatch({ type: GET_USER_SUCCESS, payload: users });
    })
    .catch((err) => {
      return dispatch({ type: GET_USER_FAILED });
    });
};

export const deleteUser = (id) => (dispatch) => {
  dispatch({ type: DELETE_USER_REQUEST });
  ApiFunction()
    .post("admin/deleteuser", id)
    .then((res) => {
      return dispatch({ type: DELETE_USER_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      return dispatch({ type: DELETE_USER_FAILED });
    });
};

export const updateUser = (form) => (dispatch) => {
  dispatch({ type: UPDATE_USER_REQUEST });
  ApiFunction()
    .post("admin/updateuser", form)
    .then((res) => {
      return dispatch({ type: UPDATE_USER_SUCCESS });
    })
    .catch((err) => {
      return dispatch({ type: UPDATE_USER_FAILED });
    });
};
