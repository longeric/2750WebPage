import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const closeMobileMenu = () => setClick(false);

  return (
    <nav className="navbar">
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
            to="/authentication"
            className="nav-links"
            onClick={closeMobileMenu}
          >
            Login/Sign Up
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-links">Log Out</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
