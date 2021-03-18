import {
  ADD_BANNER_FAILURE,
  ADD_BANNER_REQUEST,
  ADD_BANNER_SUCCESS,
  GET_BANNER_FAILURE,
  GET_BANNER_REQUEST,
  GET_BANNER_SUCCESS,
} from "../Action/ActionType";

let initialState = {
  loading: false,
  bestCategory: "",
  bigBanner: "",
  collection: "",
};

const bannerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BANNER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_BANNER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case ADD_BANNER_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case GET_BANNER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_BANNER_SUCCESS:
      return {
        ...state,
        loading: false,
        bestCategory: action.payload.bestCategory,
        bigBanner: action.payload.bigBanner,
        collection: action.payload.collection,
      };
    case GET_BANNER_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default bannerReducer;
