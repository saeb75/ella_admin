import {
  ADD_CATEGORY_FAILED,
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_SUCCESS,
  ADD_COLOR_FAILED,
  ADD_COLOR_REQUEST,
  ADD_COLOR_SUCCESS,
  GET_COLOR_FAILED,
  GET_COLOR_REQUEST,
  GET_COLOR_SUCCESS,
} from "../Action/ActionType";

let initialState = {
  colors: [],
  loading: false,
  color: "",
};

const colorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COLOR_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_COLOR_SUCCESS:
      return {
        ...state,
        loading: true,
        color: action.payload,
      };
    case ADD_COLOR_FAILED:
      return {
        ...state,
        loading: false,
      };
    case GET_COLOR_REQUEST:
      return {
        ...state,
        loading: false,
      };
    case GET_COLOR_SUCCESS:
      return {
        ...state,
        loading: true,
        colors: action.payload,
      };
    case GET_COLOR_FAILED:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};

export default colorReducer;
