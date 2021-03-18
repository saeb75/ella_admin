import ApiFunction from "../helper/axios";
import {
  ADD_IMAGE_FAILED,
  ADD_IMAGE_REQUEST,
  ADD_IMAGE_SUCCESS,
  GET_IMAGE_FAILED,
  GET_IMAGE_REQUEST,
  GET_IMAGE_SUCCESS,
} from "./ActionType";

export const addImage = (form) => (dispatch) => {
  dispatch({ type: ADD_IMAGE_REQUEST });
  ApiFunction()
    .post("image/add", form)
    .then((res) => dispatch({ type: ADD_IMAGE_SUCCESS, payload: res.data }))
    .catch((err) => dispatch({ type: ADD_IMAGE_FAILED }));
};

export const getImage = (pageNum) => (dispatch) => {
  dispatch({ type: GET_IMAGE_REQUEST });
  ApiFunction()
    .get(`image/get?page=${pageNum}`)
    .then((res) => dispatch({ type: GET_IMAGE_SUCCESS, payload: res.data }))
    .catch((err) => dispatch({ type: GET_IMAGE_FAILED }));
};
