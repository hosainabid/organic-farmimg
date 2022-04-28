import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import useAuth from "../../../../../../../hooks/useAuth";
import rootAPI from "../../../../../../../configurables";
import OrderCommissionTableItem from "../OrderStatusTable/OrderCommissionTableItem";

export default function OrderCommission() {
  const { user } = useAuth();
  const [confirmedOrders, setConfirmedOrders] = useState([]);
  const [isSuccess, setIsSuccess] = useState(null);

  const forAdmin = confirmedOrders?.map((r) => {
    return (
      { ...r, productDetails: r?.productDetails?.filter((e) => e?.type !== 'seed')}
    )
  });

  const newForAdmin = forAdmin?.length > 0 && forAdmin?.filter((r) => r?.productDetails?.length > 0);

  const loadOrders = async () => {
    await axios
      .get(`${rootAPI}/order_lists`)
      .then((res) => {
        setConfirmedOrders((pre) => [...pre, ...res.data.filter((r) => r.status === 'paid')]);
      })
      .catch((error) => console.log(error));
  };

  let totalAmount = 0;
  newForAdmin && newForAdmin?.forEach((r) => {
    let newAmount = r.total * 1;
    totalAmount += newAmount;
  });
  console.log({forAdmin})

  useEffect(() => {
    loadOrders();
    setIsSuccess(null);
  }, [user, isSuccess]);
  return (
    <Fragment>
      <h3>Admin Commission</h3>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col" className="text-center">Date</th>
              <th scope="col">Status</th>
              <th scope="col">Order Details</th>
              <th scope="col" className="text-center">Total</th>
              <th scope="col" className="text-center">Commission</th>
            </tr>
          </thead>
          <tbody style={{position: 'relative'}}>
            {
              newForAdmin.length > 0 ? newForAdmin?.map((order) => <OrderCommissionTableItem key={order._id} order={order} />) : ''
            }
            <tr>
              <th>Grand Total</th>
              <th></th>
              <th></th>
              <th></th>
              <th className="text-end">{(totalAmount || 0).toFixed(2)} TK</th>
              <th className="text-end">{((totalAmount || 0) * .1).toFixed(2)} TK</th>
            </tr>
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}
