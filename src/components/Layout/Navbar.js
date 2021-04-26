import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
// import "./Navbar.css";
import { Button } from "react-bootstrap";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  //   const [isAuth, setNav] = useState(isAuthenticated);

  //   console.log(isAuthenticated)

  //   if(localStorage.token != undefined || localStorage.token != null){

  //     console.log(isAuthenticated)
  //     setNav(true)
  //     // isAuthenticated = true;
  //     console.log(isAuthenticated)
  //   }

  //   console.log(isAuthenticated)

  const authLinks = (
    
    <div>
      <Button variant="light">
          <Link to="/scheduler" className="nav-links">
            Scheduler
          </Link>
        </Button>
      
              <Button variant="light">
          <Link to="/stickyNotes" className="nav-links">
            Sticky Notes
          </Link>
        </Button>
      
      
              <Button variant="light">
          <Link to="/pomodora" className="nav-links">
            Pomodoro
          </Link>
        </Button>
              <Button variant="light">
          <Link to="/profile" className="nav-links">
            Profile
          </Link>
        </Button>
      
              <Button variant="light">
          <Link onClick={logout} to="/login">
            Logout
          </Link>
        </Button>
    
      
    </div>
            
    


  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> easyToDo
        </Link>
      </h1>

      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateTpProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateTpProps,
  { logout }
)(Navbar);

// <li>
//   <a href="#!">Developers</a>
// </li>
