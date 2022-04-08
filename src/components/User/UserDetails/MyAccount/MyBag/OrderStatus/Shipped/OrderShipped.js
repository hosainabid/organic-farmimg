import React, { Fragment } from "react";
import OrderStatusTable from "../OrderStatusTable/OrderStatusTable";

export default function OrderShipped() {
  return (
    <Fragment>
      <h3>Shipped Orders</h3>
      <OrderStatusTable />
    </Fragment>
  );
}
