import React, { useState, Fragment, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "@material-ui/core";
import Register from "./components/Auth/Register.js";
import Login from "./components/Auth/Login.js";
import Alert from "./components/Layout/Alert.js";
import { loadUser } from "./actions/auth.js";
import setAuthToken from "./utils/setAuthToken.js";
import Navbar from "./components/Layout/Navbar";
import Scheduler from "./components/Scheduler/Scheduler.js";
import Profile from "./components/Profile/Profile.js";
import Pomodora from "./components/Home/Pomodora/pomodora.js";
import StickyNotes from "./components/Home/StickyNotes/stickynotes.js";
import Landing from "./components/Layout/Landing.js";
import PrivateRoute from "./components/routing/PrivateRoute";


//redux
import { Provider } from "react-redux";
import store from "./store.js";

import "./App.css";
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  // useEffect(() => {
  //   store.dispatch(loadUser());
  //   //only run once: []
  // }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register}></Route>
              <Route exact path="/login" component={Login}></Route>
              <PrivateRoute exact path="/home" component={Scheduler} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute exact path="/stickyNotes" component={StickyNotes} />
              <PrivateRoute exact path="/pomodora" component={Pomodora} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
