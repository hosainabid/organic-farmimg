import React from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../../../hooks/useAuth";

export default function Sidebar() {
  const { user, userLogout } = useAuth();
  return (
    <div className="bg-light pb-3 h-100">
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
                    className="nav-link d-flex align-items-center"
                    aria-current="page"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="currentColor"
                      className="bi bi-file-arrow-up-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM7.5 6.707 6.354 7.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707z" />
                    </svg>
                    <span className="ms-2">Crop Upload</span>
                  </NavLink>
                </li>
              ) : (
                ""
              )}
              {user.role === "farmar" ? (
                <li className="nav-item my-2">
                  <NavLink
                    to="/myAccount/upcomingProductUpload"
                    className="nav-link  d-flex align-items-center"
                    aria-current="page"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="currentColor"
                      className="bi bi-arrow-up-circle-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
                    </svg>
                    <span className="ms-2">Upcoming Product Upload</span>
                  </NavLink>
                </li>
              ) : (
                ""
              )}
              <li className="nav-item my-2">
                <NavLink
                  to="/myAccount/forumPost"
                  className="nav-link  d-flex align-items-center"
                  aria-current="page"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    className="bi bi-stickies-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.5V13a1 1 0 0 0 1 1V1.5a.5.5 0 0 1 .5-.5H14a1 1 0 0 0-1-1H1.5A1.5 1.5 0 0 0 0 1.5z" />
                    <path d="M3.5 2A1.5 1.5 0 0 0 2 3.5v11A1.5 1.5 0 0 0 3.5 16h6.086a1.5 1.5 0 0 0 1.06-.44l4.915-4.914A1.5 1.5 0 0 0 16 9.586V3.5A1.5 1.5 0 0 0 14.5 2h-11zm6 8.5a1 1 0 0 1 1-1h4.396a.25.25 0 0 1 .177.427l-5.146 5.146a.25.25 0 0 1-.427-.177V10.5z" />
                  </svg>
                  <span className="ms-2">Post on Forum</span>
                </NavLink>
              </li>
              <li className="nav-item my-2">
                <NavLink
                  to="/myAccount/myBag"
                  className="nav-link d-flex align-items-center"
                  aria-current="page"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    className="bi bi-bag-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z" />
                  </svg>
                  <span className="ms-2">My Orders</span>
                </NavLink>

                <ul className="my-order submenu ps-2">
                  <li className="nav-item my-2">
                    <NavLink
                      to="/myAccount/myBag/pending"
                      className="nav-link d-flex align-items-center"
                      aria-current="page"
                    >
                      Pending
                    </NavLink>
                  </li>
                  <li className="nav-item my-2">
                    <NavLink
                      to="/myAccount/myBag/confirmed"
                      className="nav-link d-flex align-items-center"
                      aria-current="page"
                    >
                      Confiremd
                    </NavLink>
                  </li>
                  <li className="nav-item my-2">
                    <NavLink
                      to="/myAccount/myBag/shipped"
                      className="nav-link d-flex align-items-center"
                      aria-current="page"
                    >
                      Shipped
                    </NavLink>
                  </li>
                  <li className="nav-item my-2">
                    <NavLink
                      to="/myAccount/myBag/complete"
                      className="nav-link d-flex align-items-center"
                      aria-current="page"
                    >
                      Complete
                    </NavLink>
                  </li>
                  <li className="nav-item my-2">
                    <NavLink
                      to="/myAccount/myBag/cancelled"
                      className="nav-link d-flex align-items-center"
                      aria-current="page"
                    >
                      Cancelled
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item my-2">
                <NavLink
                  to="/login"
                  className="nav-link d-flex align-items-center"
                  aria-current="page"
                  onClick={userLogout}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    className="bi bi-box-arrow-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                    />
                  </svg>
                  <span className="ms-2">Log Out</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
