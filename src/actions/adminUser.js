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
    console.log("show all users error", err);
  }
};

export const userChart = async () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/admin/userChart");
    // console.log(res.datares.data)
    return res.data;
  } catch (err) {
    console.log("show chart error", err);
  }
};

export const deleteUser = async (email) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  
  try {
    await axios.delete("/api/admin/delete/" + email);
    // console.log(res.datares.data)
  } catch (err) {
    console.log("delete user error", err);
  }
};
  