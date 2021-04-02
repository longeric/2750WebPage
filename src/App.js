import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Container } from "@material-ui/core";
import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home/home.js";
import Auth from './components/Auth/auth.js';

const App = () => {
  const [token, setToken] = useState();
  
  if(!token){
    return (<Auth setToken={setToken}/>)
  }
  
  return(
  <BrowserRouter>
    <Container maxWidth="lg">
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        
      </Switch>
    </Container>
  </BrowserRouter>);
};

export default App;


// <Route path="/" exact component={Auth} />