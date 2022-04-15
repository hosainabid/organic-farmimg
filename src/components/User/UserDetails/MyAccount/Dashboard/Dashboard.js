import React from "react";
import useAuth from "../../../../../hooks/useAuth";
import OrderStatusCard from "../../../../utilities/OrderStatusCard/OrderStatusCard";

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <div className="mt-4">
      <h3 className="mb-4">Dashboard</h3>
      <div className="row mt-4">
        <div className="col-sm-6 col-lg-3">
          <OrderStatusCard
            title="pending order"
            quantity={10}
            textClass="text-warning"
          />
        </div>
        <div className="col-sm-6 col-lg-3">
          <OrderStatusCard
            title="shipped order"
            quantity={20}
            textClass="text-info"
          />
        </div>
        <div className="col-sm-6 col-lg-3">
          <OrderStatusCard
            title="cancelled"
            quantity={4}
            textClass="text-danger"
          />
        </div>
        <div className="col-sm-6 col-lg-3">
          <OrderStatusCard
            title="complete"
            quantity={60}
            textClass="text-success"
          />
        </div>
      </div>
    </div>
  );
}
