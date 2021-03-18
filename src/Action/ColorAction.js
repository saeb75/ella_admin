import ApiFunction from "../helper/axios";
import {
  ADD_COLOR_FAILED,
  ADD_COLOR_REQUEST,
  ADD_COLOR_SUCCESS,
  GET_COLOR_FAILED,
  GET_COLOR_REQUEST,
  GET_COLOR_SUCCESS,
} from "./ActionType";

export const addColor = (data) => (dispatch) => {
  dispatch({ type: ADD_COLOR_REQUEST });
  ApiFunction()
    .post("color/add", data)
    .then((res) => dispatch({ type: ADD_COLOR_SUCCESS, payload: res.data }))
    .catch((err) => dispatch({ type: ADD_COLOR_FAILED }));
};

export const getColors = () => (dispatch) => {
  dispatch({ type: GET_COLOR_REQUEST });
  ApiFunction()
    .get("color/get")
    .then((res) => dispatch({ type: GET_COLOR_SUCCESS, payload: res.data }))
    .catch((err) => dispatch({ type: GET_COLOR_FAILED }));
};
