import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="container text-center">
        <div className="row justify-content-center align-items-center">
          <h2 className="text-big py-5">404 Not Found</h2>
          <Link className="btn btn-primary w-25" to="/home">
            Go Back Organic Farm
          </Link>
        </div>
      </div>
    </div>
  );
}
