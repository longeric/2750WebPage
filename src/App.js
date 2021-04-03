import React, { useState , lazy, Suspense} from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Container } from "@material-ui/core";
import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home/home.js";
// import Auth from './components/Auth/auth.js';

//
const Auth = lazy( () => import("./components/Auth/auth.js"));

const App = () => {
  const [token, setToken] = useState();
  
  if(!token){
    return (<Auth setToken={setToken}/>)
  }
  
  return(
  <BrowserRouter>
    <Container maxWidth="lg">
      <Switch>
        <Suspense fallback={null}>
          <Route path="/home" exact component = {Auth} />
        </Suspense>
      </Switch>
    </Container>
  </BrowserRouter>);
};

export default App;


// <Route path="/" exact component={Auth} />
