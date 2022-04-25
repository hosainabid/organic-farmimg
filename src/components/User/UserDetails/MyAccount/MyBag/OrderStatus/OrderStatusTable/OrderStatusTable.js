import React from "react";
import OrderStatusTableItem from "./OrderStatusTableItem";

export default function OrderStatusTable({ myOrders, pendingOrders, isSuccess, setIsSuccess, shippedOrders, isMyOrder }) {
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
        <tbody style={{position: 'relative'}}>
          {
            pendingOrders && pendingOrders?.map((order) => {
              return (
                <OrderStatusTableItem key={order._id} order={order} isSuccess={isSuccess} setIsSuccess={setIsSuccess} isMyOrder={isMyOrder} />
              );
            })
          }
          {
            shippedOrders && shippedOrders?.map((order) => {
              return (
                <OrderStatusTableItem key={order._id} order={order} isMyOrder={isMyOrder} />
              );
            })
          }
          {
            myOrders && myOrders?.map((order) => {
              return (
                <OrderStatusTableItem key={order._id} order={order} isMyOrder={isMyOrder} />
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
}
