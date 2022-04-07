import React from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../../../hooks/useAuth";

export default function Sidebar() {
  const { user, userLogout } = useAuth();
  return (
    <div className="bg-light pb-3 vh-100">
      <div className="container ">
        <nav className="navbar ps-3 pt-4 flex-column align-items-start navbar-light navbar-expand-lg bg-light">
          <div className="d-flex">
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
            <Link to="/myAccount" className="navbar-brand ms-3" href="#">
              <div className="logo text-capitalize">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="bi bi-person-fill me-2"
                  viewBox="0 0 16 16"
                >
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </svg>
                {user.name}
              </div>
            </Link>
          </div>
          <div className="collapse navbar-collapse" id="sidebarMenu">
            <ul className="navbar-nav flex-column ms-auto mb-2 mb-lg-0 ps-3">
              {user.role === "admin" ? (
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
              {user.role === "admin" ? (
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
              {user.role === "farmar" ? (
                <li className="nav-item my-2">
                  <NavLink
                    to="/myAccount/cropUpload"
                    className="nav-link"
                    aria-current="page"
                  >
                    Crop Upload
                  </NavLink>
                </li>
              ) : (
                ""
              )}
              {user.role === "farmar" ? (
                <li className="nav-item my-2">
                  <NavLink
                    to="/myAccount/upcomingProductUpload"
                    className="nav-link"
                    aria-current="page"
                  >
                    Upcoming Product Upload
                  </NavLink>
                </li>
              ) : (
                ""
              )}
              <li className="nav-item my-2">
                <NavLink
                  to="/myAccount/forumPost"
                  className="nav-link"
                  aria-current="page"
                >
                  Post on Forum
                </NavLink>
              </li>
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
