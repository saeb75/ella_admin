import {
  LOGOUT_SUCCESS,
  SIGNIN_FAILED,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
} from "../Action/ActionType";
let initialState = {
  token: "",
  user: {
    firstName: "",
    lastName: "",
    email: "",
    profilePicture: "",
  },
  authenticate: false,
  authenticating: false,
  loading: false,
  error: null,
  message: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_REQUEST:
      return { ...state, authenticating: true };
    case SIGNIN_SUCCESS:
      return {
        ...state,
        authenticating: false,
        user: action.payload.user,
        token: action.payload.token,
        authenticate: true,
      };
    case SIGNIN_FAILED:
      return {
        ...state,
        authenticating: false,
        authenticate: false,
      };
    case LOGOUT_SUCCESS:
      return {
        token: "",
        user: {
          firstName: "",
          lastName: "",
          email: "",
          profilePicture: "",
        },
        authenticate: false,
        authenticating: false,
        loading: false,
        error: null,
        message: "",
      };
    default:
      return state;
  }
};

export default authReducer;
