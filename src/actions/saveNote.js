import axios from "axios";
import setAuthToken from "../utils/setAuthToken.js";

export const readNote = async(email) =>{
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  
  try {
    const res = await axios.get("/api/users/readNote/" + email);
    console.log("from action saveNote");
    console.log(res.data)
    return res.data;
  } 
  catch (err) {
    console.log("show schedules error", err);
  } 
}

export const saveNote = async(email, info) =>{
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  console.log("here is front action saveNote:")
  const json = JSON.parse(info);
  console.log({"unschedule": json});
  const pass = ({"unschedule": json});
  try {
    const res = await axios.put("/api/users/saveNote/" + email , pass );
    console.log(res);
    return res;
  } 
  catch (err) {
    console.log("can not save note", err);
  } 
}