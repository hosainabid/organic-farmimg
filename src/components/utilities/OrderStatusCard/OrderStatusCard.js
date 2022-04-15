import React from "react";

export default function OrderStatusCard(props) {
  console.log(props);
  return (
    <div className="p-3 m-3 bg-white rounded shadow">
      <h4 className="text-center text-capitalize">{props.title}</h4>
      <hr />
      <div className={"py-4 fw-bold display-4 text-center " + props.textClass}>
        {props.quantity}
      </div>
    </div>
  );
}
