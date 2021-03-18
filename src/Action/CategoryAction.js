import axios from "axios";
import ApiFunction from "../helper/axios";
import instance from "../helper/axios";
import {
  GET_LIST_CATEGORY_REQUEST,
  GET_LIST_CATEGORY_SUCCESS,
  GET_LIST_CATEGORY_FAILED,
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAILED,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAILED,
} from "./ActionType";

export const getListCategory = () => (dispatch) => {
  dispatch({ type: GET_LIST_CATEGORY_REQUEST });
  ApiFunction()
    .get("category/listcategory")
    .then((res) => {
      dispatch({
        type: GET_LIST_CATEGORY_SUCCESS,
        payload: res.data.categories,
      });
    })
    .catch((err) => {
      dispatch({ type: GET_LIST_CATEGORY_FAILED });
    });
};

export const addCategory = (form) => (dispatch) => {
  dispatch({ type: ADD_CATEGORY_REQUEST });
  ApiFunction()
    .post("category/addcategory", form)
    .then((res) => {
      dispatch({
        type: ADD_CATEGORY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({ type: ADD_CATEGORY_FAILED });
    });
};

export const deletedCategory = (_id) => (dispatch) => {
  dispatch({ type: DELETE_CATEGORY_REQUEST });
  ApiFunction()
    .post("category/delete", { _id })
    .then((res) => {
      dispatch({
        type: DELETE_CATEGORY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({ type: DELETE_CATEGORY_FAILED });
    });
};
