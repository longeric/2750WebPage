import axios from "axios";
import setAuthToken from "../utils/setAuthToken.js";


export const getSchdules = async ( email ) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  
  try {
    const res = await axios.get("/api/auth/" + email);
    console.log(res)
    return res;
  } catch (err) {
    console.log("show schedules error", err);
  }
  
}

export const createSchedule = async ( email, data ) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  
  console.log(JSON.stringify(data))
  
  try {
    const res = await axios.post("/api/users/createSchdule/" + email, JSON.stringify(data))
    // console.log(res)
    // return res;
  } catch (err) {
    console.log("show schedules error", err);
  }
}