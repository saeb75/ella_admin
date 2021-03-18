import {
  DELETE_CATEGORY_FAILED,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  GET_LIST_CATEGORY_FAILED,
  GET_LIST_CATEGORY_REQUEST,
  GET_LIST_CATEGORY_SUCCESS,
} from "../Action/ActionType";

let initialState = {
  categories: [],
  loading: false,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_LIST_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };
    case GET_LIST_CATEGORY_FAILED:
      return {
        ...state,
        loading: false,
      };
    case DELETE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DELETE_CATEGORY_FAILED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default categoryReducer;
