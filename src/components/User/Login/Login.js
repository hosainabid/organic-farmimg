import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Header from "../../Header/Header";
import rootAPI from "../../../configurables";

export default function Login() {
  const [userLoginEmail, setUserLoginEmail] = useState("");
  const [userLoginPassword, setUserLoginPassword] = useState("");
  const [forgetEmail, setForgetEmail] = useState("");
  const [isForgetPass, setIsForgetPass] = useState(false);
  const [otpField, setOtpField] = useState("");
  const [isOtpSended, setIsOtpSended] = useState(false);
  const [isOtpCorrect, setIsOtpCorrect] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const { userLogin } = useAuth();
  const history = useHistory();
  const handleLogin = (e) => {
    e.preventDefault();
    userLogin(userLoginEmail, userLoginPassword, history);
    e.target.reset();
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${rootAPI}/forget_password`, {
        email: forgetEmail,
      })
      .then((res) => {
        console.log(res);
        setIsOtpSended(true);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setUserLoginEmail("");
        setUserLoginPassword("");
      });
  };

  const handleOTPSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${rootAPI}/validate_OTP`, {
        email: forgetEmail,
        OTP: Number(otpField),
      })
      .then((res) => {
        console.log(res);
        setIsOtpCorrect(true);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setOtpField("");
      });
  };

  const handleNewPassowrdSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${rootAPI}/set_new_password`, {
        email: forgetEmail,
        newPassword: newPassword,
      })
      .then((res) => {
        console.log(res);
        setIsOtpCorrect(false);
        setIsOtpSended(false);
        setIsForgetPass(false);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setNewPassword("");
        setForgetEmail("");
      });
  };
  return (
    <div>
      <Header />
      <div className="container my-4">
        <div className="row justify-content-center align-items-center">
          <div className="col-sm-9 col-lg-6 col-xs-12">
            {!isForgetPass ? (
              <div>
                <form onSubmit={handleLogin}>
                  <h3>Login</h3>
                  <div className="form-group">
                    <label
                      className="my-3 h5 text-secondary"
                      htmlFor="loginEmail"
                    >
                      Email address
                    </label>
                    <input
                      id="loginEmail"
                      required
                      type="email"
                      className="form-control"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      value={userLoginEmail}
                      onChange={(e) => setUserLoginEmail(e.target.value)}
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
                      id="loginPassward"
                      required
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={userLoginPassword}
                      onChange={(e) => setUserLoginPassword(e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    className="mt-4 d-block border-0 forget-pass"
                    onClick={() => setIsForgetPass(true)}
                  >
                    Forget Password?
                  </button>
                  <button type="submit" className="myBtn my-4 py-2 px-4 h5">
                    Login
                  </button>
                </form>
              </div>
            ) : (
              <div>
                <h3>Forget Password!</h3>
                {!isOtpSended ? (
                  <form onSubmit={handleEmailSubmit}>
                    <div className="form-group">
                      <label
                        className="my-3 h5 text-secondary"
                        htmlFor="forgetEmail"
                      >
                        Email address
                      </label>
                      <input
                        required
                        id="forgetEmail"
                        type="email"
                        value={forgetEmail}
                        className="form-control"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        onChange={(e) => setForgetEmail(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="myBtn my-4 py-2 px-4 h5">
                      Submit Email
                    </button>
                  </form>
                ) : !isOtpCorrect ? (
                  <form onSubmit={handleOTPSubmit}>
                    <div className="form-group">
                      <label className="my-3 h5 text-secondary" htmlFor="otp">
                        OTP
                      </label>
                      <input
                        required
                        id="otp"
                        type="text"
                        value={otpField}
                        className="form-control"
                        aria-describedby="emailHelp"
                        placeholder="Enter OTP..."
                        onChange={(e) => setOtpField(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="myBtn my-4 py-2 px-4 h5">
                      Submit OTP
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleNewPassowrdSubmit}>
                    <div className="form-group">
                      <label
                        className="my-3 h5 text-secondary"
                        htmlFor="newPassowrd"
                      >
                        New Password
                      </label>
                      <input
                        required
                        id="newPassowrd"
                        type="password"
                        value={newPassword}
                        className="form-control"
                        aria-describedby="emailHelp"
                        placeholder="Enter New Password..."
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="myBtn my-4 py-2 px-4 h5">
                      Set Password
                    </button>
                  </form>
                )}

                <button
                  type="button"
                  className="mt-4 d-block border-0 forget-pass"
                  onClick={() => setIsForgetPass(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                    />
                  </svg>{" "}
                  Go Back
                </button>
              </div>
            )}

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
