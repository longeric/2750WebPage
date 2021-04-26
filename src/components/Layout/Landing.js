import React from "react";
import { Link } from "react-router-dom";

import { Jumbotron } from "react-bootstrap";

const Landing = () => {
  return (
    <Jumbotron>
      <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">Welcome to our todo list</h1>
            <p className="lead">
              Create a developer profile/portfolio, share posts and get help
              from other developers
            </p>
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
