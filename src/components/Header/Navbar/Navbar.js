import React from "react";
import "./Navbar.css";
import logo from "../../../images/logo.png";
import { Link } from "react-router-dom";

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
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to="/home"
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/seedBank" className="nav-link" href="#">
                  Seed Bank
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/organicFood" className="nav-link" href="#">
                  Organic Food
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/forum" className="nav-link" href="#">
                  Forum
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link" href="#">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link to="contact" className="nav-link" href="#">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
