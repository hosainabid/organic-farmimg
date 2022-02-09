import React from "react";
import "./UserInfo.css";

export default function UserInfo() {
  return (
    <div className="w-100 bg-light">
      <div className="container">
        <div className="d-flex justify-content-end ">
          <ul className="d-flex userinfo-ul align-items-center">
            <li className="list-btn">
              <a href="#">Login</a>
            </li>
            <li className="list-btn">
              <a href="#">My Account</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
