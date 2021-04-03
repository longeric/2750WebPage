import React, { useState, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "@material-ui/core";
// import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home/home.js";
import Auth from "./components/Auth/auth.js";
import Navbar from "./components/Layout/Navbar";
import Landing from "./components/Layout/Landing";

const App = () => {
  const [token, setToken] = useState();

  {
    // if(!token){
    //   return (<Auth setToken={setToken}/>)
    // }
  }

  return (
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container">
          <switch>
            <Route exact path="/authentication" component={Auth} />
          </switch>
        </section>
      </Fragment>
    </Router>
  );
};

export default App;

// <Route path="/" exact component={Auth} />
