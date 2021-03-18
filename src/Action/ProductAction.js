import ApiFunction from "../helper/axios";
import {
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAILED,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  DELETE_PRODUCT_REQUEST,
  ADD_PRODUCT_FAILED,
  DELETE_PRODUCT_FAILURE,
  DELETE_PRODUCT_SUCCESS,
  ADD_PRODUCT_TO_DISCOUNT_REQUEST,
  ADD_PRODUCT_TO_DISCOUNT_SUCCESS,
  ADD_PRODUCT_TO_DISCOUNT_FAILURE,
  GET_DISCOUNT_LIST_REQUEST,
  GET_DISCOUNT_LIST_SUCCESS,
  GET_DISCOUNT_LIST_FAILURE,
  DELETE_PRODUCT_FROM_DISCOUNT_REQUEST,
  DELETE_PRODUCT_FROM_DISCOUNT_SUCCESS,
  DELETE_PRODUCT_FROM_DISCOUNT_FAILURE,
} from "./ActionType";

export const addProducts = (form) => (dispatch) => {
  dispatch({ type: ADD_PRODUCT_REQUEST });
  ApiFunction()
    .post("product/add", form)
    .then((res) => dispatch({ type: ADD_PRODUCT_SUCCESS, payload: res.data }))
    .catch((err) => dispatch({ type: ADD_PRODUCT_FAILED }));
};

export const getProducts = (pageNum) => (dispatch) => {
  dispatch({ type: GET_PRODUCT_REQUEST });
  ApiFunction()
    .get(`product/get?page=${pageNum}`)
    .then((res) =>
      dispatch({
        type: GET_PRODUCT_SUCCESS,
        payload: { products: res.data.products, totalPage: res.data.totalPage },
      })
    )
    .catch((err) => dispatch({ type: GET_PRODUCT_FAILED }));
};

export const deleteSingleProduct = (_id) => (dispatch) => {
  dispatch({ type: DELETE_PRODUCT_REQUEST });
  ApiFunction()
    .post(`product/delete`, { _id })
    .then((res) =>
      dispatch({
        type: DELETE_PRODUCT_SUCCESS,
      })
    )
    .catch((err) => dispatch({ type: DELETE_PRODUCT_FAILURE }));
};

export const addProductToDiscountList = (name, id, discount) => (dispatch) => {
  dispatch({ type: ADD_PRODUCT_TO_DISCOUNT_REQUEST });
  ApiFunction()
    .post("feature/discount/add", {
      name,
      _id: id,
      discount,
    })
    .then((res) => dispatch({ type: ADD_PRODUCT_TO_DISCOUNT_SUCCESS }))
    .catch((err) => dispatch({ type: ADD_PRODUCT_TO_DISCOUNT_FAILURE }));
};

export const getDiscountList = (name, id, discount) => (dispatch) => {
  dispatch({ type: GET_DISCOUNT_LIST_REQUEST });
  ApiFunction()
    .get("feature/discount/get")
    .then((res) =>
      dispatch({ type: GET_DISCOUNT_LIST_SUCCESS, payload: res.data.list })
    )
    .catch((err) => dispatch({ type: GET_DISCOUNT_LIST_FAILURE }));
};

export const deleteProductFromDiscount = (id, name) => (dispatch) => {
  dispatch({ type: DELETE_PRODUCT_FROM_DISCOUNT_REQUEST });
  ApiFunction()
    .post("feature/discount/remove", { name, _id: id })
    .then((res) => {
      dispatch({ type: DELETE_PRODUCT_FROM_DISCOUNT_SUCCESS });
    })
    .catch((err) => dispatch({ type: DELETE_PRODUCT_FROM_DISCOUNT_FAILURE }));
};
