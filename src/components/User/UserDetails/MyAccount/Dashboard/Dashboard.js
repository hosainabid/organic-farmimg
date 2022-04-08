import React from "react";
import useAuth from "../../../../../hooks/useAuth";

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <div className="mt-4">
      <h3 className="mb-4">Dashboard</h3>
      <div className="row mt-4">
        <div className="col-md-6 col-sm-12">
          <div className="bg-white rounded-3 p-4">
            <h4>Orders</h4>
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="bg-white">Orders</div>
        </div>
      </div>
    </div>
  );
}
