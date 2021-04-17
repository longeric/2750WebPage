import axios from "axios";
import { setAlert } from "./alert.js";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS
} from "./types.js";

import setAuthToken from "../utils/setAuthToken.js";

// Load the user
export const loadUser = () => async dispatch => {
  //check if there is token, if yes, global header
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    console.log("important error", err);
    dispatch({
      type: AUTH_ERROR
    });
  }
};

//REGISTER THE USER

export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post("/api/users", body, config);
    
    console.log(res);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    // dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Login user

export const login = ( email, password ) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  console.log(email + password)
  
  const body = JSON.stringify({ email, password });

  console.log("body login", body);

  try {
    const res = await axios.post("/api/auth", body, config);

    console.log("res:" + res);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    // dispatch(loadUser());
    
    //the issue here
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: LOGIN_FAIL

    });
  }
};