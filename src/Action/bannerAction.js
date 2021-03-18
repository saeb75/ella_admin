import ApiFunction from "../helper/axios";
import {
  ADD_BANNER_FAILURE,
  ADD_BANNER_REQUEST,
  ADD_BANNER_SUCCESS,
  GET_BANNER_FAILURE,
  GET_BANNER_REQUEST,
  GET_BANNER_SUCCESS,
} from "./ActionType";

export const addBanner = (data, name) => (dispatch) => {
  dispatch({ type: ADD_BANNER_REQUEST });
  ApiFunction()
    .post("banner/add", { data, name })
    .then((res) => dispatch({ type: ADD_BANNER_SUCCESS }))
    .catch((err) => dispatch({ type: ADD_BANNER_FAILURE }));
};
export const getBanner = () => (dispatch) => {
  dispatch({ type: GET_BANNER_REQUEST });
  ApiFunction()
    .get("banner/get")
    .then((res) => dispatch({ type: GET_BANNER_SUCCESS, payload: res.data }))
    .catch((err) => dispatch({ type: GET_BANNER_FAILURE }));
};
