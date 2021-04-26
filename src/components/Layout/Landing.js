import React from "react";
import { Link } from "react-router-dom";

import { Jumbotron } from "react-bootstrap";
import { Button } from "react-bootstrap";
const Landing = () => {
  return (
    <Jumbotron>
      <section className="landing">
        <div
          className="dark-overlay"
          style={{
            backgroundImage: `url("https://cdn.glitch.com/b32b2bd2-2e97-4726-9fc6-3c049530080e%2Fa00556a1-611a-45b2-a684-f6ec0286ab2a.image.png?v=1619477524531")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
          }}
        >
          <div className="landing-inner">
            <h1 className="x-large">Welcome to our todo list</h1>
            <p className="lead">Help manage your time!</p>
            <div className="buttons">
              <Link to="/register" className="btn btn-primary">
                Sign Up
              </Link>
              <Link to="/login" className="btn btn-light">
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Jumbotron>
  );
};

export default Landing;
