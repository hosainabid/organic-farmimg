import React, { Fragment } from "react";
import OrderStatusTable from "../OrderStatusTable/OrderStatusTable";

export default function OrderConfirmed() {
  return (
    <Fragment>
      <h3>Confirmed Orders</h3>
      <OrderStatusTable />
    </Fragment>
  );
}
