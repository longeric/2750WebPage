import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
import logo from "./logo.svg";
import "./App.css";
import Home from './components/Home/home.js';
import Auth from './components/Home/auth.js';

const App = () => {
    <BrowserRouter>
    <Container maxWidth="lg">
      <Switch>
        
        Home>
      </Switch>
    </Container>
  </BrowserRouter>
};

export default App;

// <Route path="/" exact component={Home} />
// <Route path="/auth" exact component={Auth} />