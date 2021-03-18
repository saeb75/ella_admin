import {
  DELETE_USER_FAILED,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  GET_USER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
} from "../Action/ActionType";

let initialState = {
  users: [],
  loading: false,
  msg: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return { ...state, loading: true };
    case GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case GET_USER_FAILED:
      return {
        ...state,
        loading: false,
      };
    case DELETE_USER_REQUEST:
      return { ...state, loading: true };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: action.payload,
      };
    case DELETE_USER_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default userReducer;
