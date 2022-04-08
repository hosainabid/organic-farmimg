import React, { Fragment } from "react";
import OrderStatusTable from "../OrderStatusTable/OrderStatusTable";

export default function OrderCancelled() {
  return (
    <Fragment>
      <h3>Cancelled Orders</h3>
      <OrderStatusTable />
    </Fragment>
  );
}
