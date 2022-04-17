import axios, { Axios } from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../Header/Header";
import rootAPI from "../../../configurables";
import { useHistory } from "react-router-dom";

export default function Registration() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [role, setRole] = useState("");
  const [address, setAddress] = useState("");
  const [userImage, setUserImage] = useState(null);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [otp, setOtp] = useState();
  const history = useHistory();

  const handleRegFormComplete = (e) => {
    e.preventDefault();

    axios
      .post(`${rootAPI}/send_otp_for_user_reg`, {
        email: email,
      })
      .then((res) => {
        console.log(res);
        setIsFormComplete(true);
        e.target.reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    axios
      .post(`${rootAPI}/validate_OTP_before_reg`, {
        email: email,
        OTP: Number(otp),
      })
      .then((res) => {
        console.log("OTP true block");
        console.log(res);
        console.log(typeof Number(otp));
        // const formData = new FormData();
        // formData.append("name", `${firstName} ${lastName}`);
        // formData.append("mobile", number);
        // formData.append("email", email);
        // formData.append("role", role);
        // formData.append("address", address);
        // formData.append("password", password);
        // formData.append("balance", 0);
        // formData.append("file", userImage);
        // axios
        //   .post(`${rootAPI}/user_registration`, formData)
        //   .then((res) => {
        //     console.log(res);
        //     // history.replace("/myAccount");
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Header />
      <div className="container mt-4">
        <div className="row justify-content-center align-items-center">
          <div className="col-sm-9 col-lg-6">
            <h3>Registration</h3>
            {!isFormComplete ? (
              <form onSubmit={handleRegFormComplete}>
                <div className="row">
                  <div className="col-md-6  col-sm-6">
                    <label
                      className="my-3 h5 text-secondary"
                      htmlFor="firstName"
                    >
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
                    <label
                      className="my-3 h5 text-secondary"
                      htmlFor="lastName"
                    >
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
                  <label
                    className="my-3 h5 text-secondary"
                    htmlFor="loginEmail"
                  >
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
                <div className="form-group">
                  <label className="my-3 h5 text-secondary" htmlFor="address">
                    Your address
                  </label>
                  <textarea
                    required
                    id="address"
                    row="2"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter your address"
                    onChange={(e) => setAddress(e.target.value)}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label
                    className="my-3 h5 text-secondary"
                    htmlFor="selectRoll"
                  >
                    Are you Farmer/User?
                  </label>
                  <select
                    className="form-control"
                    id="selectRoll"
                    defaultValue={"DEFAULT"}
                    required
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="DEFAULT" disabled>
                      Select Your Roll
                    </option>
                    <option value="user">User</option>
                    <option value="farmar">Farmar</option>
                  </select>
                </div>

                <div className="my-3">
                  <input
                    required
                    onChange={(e) => setUserImage(e.target.files[0])}
                    type="file"
                    className="form-control"
                    name="Choose a image please..."
                  />
                </div>

                <button type="submit" className="myBtn my-4  py-2 px-3 h4">
                  Submit
                </button>
              </form>
            ) : (
              <div className="text-center">
                <p className="h5 text-center">
                  We send an OTP to your email: {email}.
                </p>
                <form onSubmit={handleRegistration}>
                  <div className="my-3">
                    <input
                      required
                      onChange={(e) => setOtp(e.target.value)}
                      type="number"
                      className="form-control"
                      name="Your OTP..."
                    />
                  </div>
                  <button type="submit" className="myBtn my-4 py-2 px-3 h4">
                    Registration
                  </button>
                </form>
              </div>
            )}

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
