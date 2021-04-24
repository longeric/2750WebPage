import axios from "axios";
import setAuthToken from "../utils/setAuthToken.js";

export const readAllUser = async email => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/admin/All");
    // console.log(res.datares.data)
    return res.data;
  } catch (err) {
    console.log("show schedules error", err);
  }
};