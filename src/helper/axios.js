import { useDispatch, useSelector } from "react-redux";
import { LOGOUT_SUCCESS } from "../Action/ActionType";
import { logut, userIsLogin } from "../Action/AuthAction";
import store from "./../store";
const jwt = require("jsonwebtoken");
const { default: axios } = require("axios");
/* const token = localStorage.getItem("token"); */

const ApiFunction = () => {
  let BaseUrl =
    /*  location.hostname === "localhost"
      ? "http://localhost:5000/api/"
      : */ "https://saeb-mern-ecommerce-server.herokuapp.com/api/";
  const token = localStorage.getItem("token");
  const instance = axios.create({
    baseURL: BaseUrl,
    headers: {
      Authorization: token ? `Bearer ${token} ` : "",
    },
  });

  instance.interceptors.request.use(
    function (config) {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response && error.response.status === 500) {
        localStorage.clear();
        store.dispatch(logut());
        window.location.href = "./signin";
      }
      return Promise.reject(error);
    }
  );
  return instance;
};

export default ApiFunction;
