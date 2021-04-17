import axios from "axios";

const setAuthToken = token => {
  // if there is token in localstorage or not
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
