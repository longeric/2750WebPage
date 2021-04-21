import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const closeMobileMenu = () => setClick(false);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
        <img
          src="https://cdn.glitch.com/b32b2bd2-2e97-4726-9fc6-3c049530080e%2Fstudy.png?v=1617467010836"
          style={{ width: "80px", height: "80px" }}
        ></img>
      </Link>

      <ul className={click ? "nav-menu active" : "nav-menu"}>
        <li className="nav-item">
          <Link to="/" className="nav-links" onClick={closeMobileMenu}>
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to="/userTaskBoard"
            className="nav-links"
            onClick={closeMobileMenu}
          >
            Board
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to="/login"
            className="nav-links"
            onClick={closeMobileMenu}
          >
            Login/Sign Up
          </Link>
        </li>
        
        <li className="nav-item">
          <Link
            to="/authentication"
            className="nav-links"
            
          >
            Profile
          </Link>
        </li>

        <li className="nav-item">
          <Link 
            to="/authentication"
            className="nav-links">Log Out</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
