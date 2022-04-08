import React from "react";
import OrderStatusTableItem from "./OrderStatusTableItem";

export default function OrderStatusTable() {
  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Date</th>
            <th scope="col">Total</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <OrderStatusTableItem />
          <OrderStatusTableItem />
          <OrderStatusTableItem />
          <OrderStatusTableItem />
        </tbody>
      </table>
    </div>
  );
}
