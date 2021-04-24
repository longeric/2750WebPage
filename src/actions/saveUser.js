import axios from "axios";
import setAuthToken from "../utils/setAuthToken.js";

export const readUser = async email => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth/readUser/" + email);
    // console.log(res.datares.data)
    return res.data;
  } catch (err) {
    console.log("show schedules error", err);
  }
};

export const updateProfile = async userinfo => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  console.log("action / saveUser / update");
  console.log(JSON.stringify(userinfo));
  const body = JSON.stringify(userinfo);
  try {
    const res = axios.put("/api/auth/updateProfile", userinfo);
    // console.log(res);
  } catch (err) {
    console.log("error from updateProfile", err);
  }
};
