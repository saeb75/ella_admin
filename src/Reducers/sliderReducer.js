import {
  GET_SLIDES_FAILURE,
  GET_SLIDES_REQUEST,
  GET_SLIDES_SUCCESS,
} from "../Action/ActionType";

let initialState = {
  loading: false,
  slider: "",
};

export const sliderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SLIDES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_SLIDES_SUCCESS:
      return {
        ...state,
        loading: false,
        slider: action.payload,
      };

    case GET_SLIDES_FAILURE:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
