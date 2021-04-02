import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Container } from "@material-ui/core";
import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home/home.js";
import Auth from './components/Auth/auth.js';

const App = () => {
  
  if(!token){
    return (<>)
  }
  
  return(
  <BrowserRouter>
    <Container maxWidth="lg">
      <Switch>
        <Route path="/home" exact component={Home} />
        <Route path="/" exact component={Auth} />
      </Switch>
    </Container>
  </BrowserRouter>);
};

export default App;


