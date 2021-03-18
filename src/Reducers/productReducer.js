import {
  ADD_PRODUCT_FAILED,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  GET_DISCOUNT_LIST_FAILURE,
  GET_DISCOUNT_LIST_REQUEST,
  GET_DISCOUNT_LIST_SUCCESS,
  GET_PRODUCT_FAILED,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
} from "../Action/ActionType";

let initialState = {
  products: [],
  loading: false,
  product: "",
  totalPage: "",
  discount: "",
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: true,
        product: action.payload,
      };
    case ADD_PRODUCT_FAILED:
      return {
        ...state,
        loading: false,
      };
    case GET_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        totalPage: action.payload.totalPage,
      };
    case GET_PRODUCT_FAILED:
      return {
        ...state,
        loading: false,
      };
    case GET_DISCOUNT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_DISCOUNT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        discount: action.payload,
      };
    case GET_DISCOUNT_LIST_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default productReducer;
