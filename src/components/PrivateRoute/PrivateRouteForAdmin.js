import React from "react";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function PrivateRouteForAdmin({ children, ...rest }) {
  const { user } = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user && user.role === "admin" ? (
          children
        ) : (
          <Redirect
            to={{ pathname: "/myAccount", state: { from: location } }}
          />
        )
      }
    ></Route>
  );
}
