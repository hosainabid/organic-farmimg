import React from "react";
import { Link } from "react-router-dom";
import Header from "../../Header/Header";

export default function Registration() {
  return (
    <div>
      <Header />
      <div className="container mt-4">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6 col-sm-9 col-xs-12">
            <h3>Registration</h3>
            <form>
              <div className="row">
                <div className="col-md-6  col-sm-6">
                  <label className="my-3 h5 text-secondary" htmlFor="firstName">
                    First name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="First name"
                  />
                </div>
                <div className="col-md-6  col-sm-6">
                  <label className="my-3 h5 text-secondary" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Last name"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="my-3 h5 text-secondary" htmlFor="loginEmail">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="loginEmail"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
              </div>
              <div className="row justify-content-center align-items-center">
                <div className="col-md-6 col-sm-6">
                  <label
                    className="my-3 h5 text-secondary"
                    htmlFor="regPassword"
                  >
                    Password
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="regPassword"
                    placeholder="Password"
                  />
                </div>
                <div className="col-md-6  col-sm-6">
                  <label
                    className="my-3 h5 text-secondary"
                    htmlFor="confirmPassword"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                  />
                </div>
              </div>
              <div class="form-group">
                <label className="my-3 h5 text-secondary" htmlFor="selectRoll">
                  Registration as:
                </label>
                <select
                  className="form-control"
                  id="selectRoll"
                  defaultValue={"DEFAULT"}
                >
                  <option value="DEFAULT" disabled>
                    Select Your Roll
                  </option>
                  <option value="user">User</option>
                  <option value="farmar">Farmar</option>
                </select>
              </div>
              <button type="submit" className="myBtn my-4">
                Registration
              </button>
            </form>

            <h6 className="mt-4 text-secondary text-center">
              Already have an accout?
              <Link className="myLink" to="/login">
                Login
              </Link>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}
