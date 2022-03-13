import React from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../../../hooks/useAuth";

export default function Sidebar() {
  const { user, userLogout } = useAuth();
  return (
    <div className="bg-light">
      <div className="container">
        <nav className="navbar navbar-light bg-light">
          <Link to="/myAccount" className="navbar-brand" href="#">
            <div className="logo">{user.name}</div>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#sidebarMenu"
            aria-controls="sidebarMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="sidebarMenu">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {user.role == "admin" ? (
                <li className="nav-item my-2">
                  <NavLink
                    to="/myAccount/uploadSeed"
                    className="nav-link"
                    aria-current="page"
                  >
                    Upload Seed
                  </NavLink>
                </li>
              ) : (
                ""
              )}
              {user.role == "admin" ? (
                <li className="nav-item my-2">
                  <NavLink
                    to="/myAccount/allUser"
                    className="nav-link"
                    aria-current="page"
                  >
                    All User
                  </NavLink>
                </li>
              ) : (
                ""
              )}
              <li className="nav-item my-2">
                <NavLink
                  to="/login"
                  className="nav-link"
                  aria-current="page"
                  onClick={userLogout}
                >
                  Log Out
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
