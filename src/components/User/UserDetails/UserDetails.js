import React from "react";
import useAuth from "../../../hooks/useAuth";
import Header from "../../Header/Header";
import MyAccount from "./MyAccount/MyAccount";

export default function UserDetails() {
  const { user } = useAuth();
  return (
    <div>
      <Header />

      <div className="container-fluid my-4">
        {user ? (
          <MyAccount user={user} />
        ) : (
          <p className="text-center">Please Login</p>
        )}
      </div>
    </div>
  );
}
