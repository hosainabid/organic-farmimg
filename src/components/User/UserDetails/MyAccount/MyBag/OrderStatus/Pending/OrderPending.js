import React, { Fragment } from "react";
import OrderStatusTable from "../OrderStatusTable/OrderStatusTable";

export default function OrderPending() {
  return (
    <Fragment>
      <h3>Pending Orders</h3>
      <OrderStatusTable />
    </Fragment>
  );
}
