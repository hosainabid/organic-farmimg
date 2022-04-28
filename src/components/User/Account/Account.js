import axios from "axios";
import React, { useState } from "react";
import rootAPI from "../../../configurables";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../../hooks/useAuth";

export default function Account() {
  const { user, setUser } = useAuth();

  const [firstName, setFirstName] = useState(user?.name?.split(' ')[0] || '');
  const [lastName, setLastName] = useState(user?.name?.split(' ')[1] || '');
  const [email, setEmail] = useState(user.email || '');
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState(user.mobile || '');
  const [role, setRole] = useState(user.role || 'DEFAULT');
  const [address, setAddress] = useState(user.address || '');
  const [userImage, setUserImage] = useState(null);
  const history = useHistory();
  console.log({userImage})

  const handleAccountUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", user._id);
    formData.append("name", `${firstName} ${lastName}`);
    formData.append("mobile", number);
    formData.append("email", email);
    formData.append("role", role);
    formData.append("address", address);
    userImage && formData.append("file", userImage);
    password.length > 0 && formData.append("password", password);
    axios
      .post(`${rootAPI}/update_user_profile`, formData)
      .then((res) => {
        console.log(res);
        if (res.data.isSuccess) {
          setUser(res.data.user_info);
          history.replace("/myAccount");
        } else {
          history.replace("/myAccount");
        }
      })
      .catch((error) => {
        console.log({error})
      })
      .finally(setUserImage(null))
  };

  return (
    <div>
      <ToastContainer />
      <div className="container mt-4">
        <div className="row justify-content-center align-items-center">
          <div className="col-sm-9 col-lg-6">
            <h3>My Account</h3>
            <form onSubmit={handleAccountUpdate}>
              <div className="row">
                <div className="col-md-6  col-sm-6">
                  <label
                    className="my-3 h5 text-secondary"
                    htmlFor="firstName"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <label
                    className="my-3 h5 text-secondary"
                    htmlFor="lastName"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="col-md-6 col-sm-6 d-flex align-items-center justify-content-center">
                  <div className="d-flex align-items-center justify-content-center">
                    <img src={`data:${user?.image?.contentType};base64,${user?.image?.img}`} alt={`Not Found`} style={{maxHeight: '190px', maxWidth: '100%'}} />
                  </div>
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
                  type="email"
                  required
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={email}
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
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
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
                    type="text"
                    className="form-control"
                    placeholder="Enter your phone number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="my-3 h5 text-secondary" htmlFor="address">
                  Your address
                </label>
                <textarea
                  id="address"
                  row="2"
                  value={address}
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
                  defaultValue={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="DEFAULT" disabled>
                    Select Your Roll
                  </option>
                  <option value="user">User</option>
                  <option value="farmar">Farmar</option>
                </select>

                <div className="my-3">
                  <input
                    onChange={(e) => setUserImage(e.target.files[0])}
                    type="file"
                    className="form-control"
                    name="Choose a image please..."
                  />
                </div>
              </div>

              <button type="submit" className="myBtn my-4  py-2 px-3 h4">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
