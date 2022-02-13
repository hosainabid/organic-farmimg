import React from "react";
import { Link } from "react-router-dom";
import Header from "../../Header/Header";

export default function Login() {
  return (
    <div>
      <Header />
      <div className="container my-4">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6 col-sm-9 col-xs-12">
            <h3>Login</h3>
            <form>
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
              <div className="form-group">
                <label
                  className="my-3 h5 text-secondary"
                  htmlFor="loginPassward"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="loginPassward"
                  placeholder="Password"
                />
              </div>
              <button type="submit" className="myBtn my-4">
                Login
              </button>
            </form>

            <h6 className="mt-4 text-secondary text-center">
              Do not have an accout?
              <Link className="myLink" to="/registration">
                Registration
              </Link>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}
