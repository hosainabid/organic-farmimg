import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../Header/Header";

export default function Registration() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [roll, setRoll] = useState("");

  const handleRegistration = (e) => {
    e.preventDefault();
    console.log(firstName, lastName, email, password, number, roll);
  };

  return (
    <div>
      <Header />
      <div className="container mt-4">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6 col-sm-9 col-xs-12">
            <h3>Registration</h3>
            <form onSubmit={handleRegistration}>
              <div className="row">
                <div className="col-md-6  col-sm-6">
                  <label className="my-3 h5 text-secondary" htmlFor="firstName">
                    First name
                  </label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    placeholder="First name"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="col-md-6  col-sm-6">
                  <label className="my-3 h5 text-secondary" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    placeholder="Last name"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="my-3 h5 text-secondary" htmlFor="loginEmail">
                  Email address
                </label>
                <input
                  required
                  type="email"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
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
                    required
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="col-md-6  col-sm-6">
                  <label
                    className="my-3 h5 text-secondary"
                    htmlFor="confirmPassword"
                  >
                    Your Phone No
                  </label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    placeholder="Enter your phone number"
                    onChange={(e) => setNumber(e.target.value)}
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
                  required
                  onChange={(e) => setRoll(e.target.value)}
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
