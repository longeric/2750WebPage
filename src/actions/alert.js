import { SET_ALERT, REMOVE_ALERT } from "./types.js";
// import uuid from "uuid";

import { v4 as uuid } from "uuid";

export const setAlert = (msg, alertType, timeout = 3000) => dispatch => {
  const id = uuid();
  console.log(alertType);
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });

  //remove_alert timeout

  setTimeout(
    () =>
      dispatch({
        type: REMOVE_ALERT,
        payload: id
      }),
    timeout
  );
};
