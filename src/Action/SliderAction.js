import ApiFunction from "../helper/axios";
import {
  GET_SLIDES_FAILURE,
  GET_SLIDES_REQUEST,
  GET_SLIDES_SUCCESS,
} from "./ActionType";
export const addSlide = (data) => (dispatch) => {
  ApiFunction()
    .post("slider/slide/add", { data })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export const getSlides = (data) => (dispatch) => {
  dispatch({ type: GET_SLIDES_REQUEST });
  ApiFunction()
    .get("slider/get")
    .then((res) => dispatch({ type: GET_SLIDES_SUCCESS, payload: res.data }))
    .catch((err) => dispatch({ type: GET_SLIDES_FAILURE }));
};
