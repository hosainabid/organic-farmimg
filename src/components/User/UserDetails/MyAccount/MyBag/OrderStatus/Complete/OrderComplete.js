import React, { Fragment } from "react";
import OrderStatusTable from "../OrderStatusTable/OrderStatusTable";

export default function OrderComplete() {
  return (
    <Fragment>
      <h3>Complete Orders</h3>
      <OrderStatusTable />
    </Fragment>
  );
}
