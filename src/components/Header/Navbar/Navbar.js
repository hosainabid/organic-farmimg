import React from "react";
import "./Navbar.css";
import logo from "../../../images/logo.png";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="bg-light">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/home" className="navbar-brand" href="#">
            <div className="logo">
              <img src={logo} alt="logo" />
            </div>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#headerMenu"
            aria-controls="headerMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="headerMenu">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  to="/home"
                  className="nav-link"
                  aria-current="page"
                  href="#"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/seedBank" className="nav-link" href="#">
                  Seed Bank
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/organicFood" className="nav-link" href="#">
                  Organic Food
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/forum" className="nav-link" href="#">
                  Forum
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/blogs" className="nav-link" href="#">
                  Blogs
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about" className="nav-link" href="#">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="contact" className="nav-link" href="#">
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
