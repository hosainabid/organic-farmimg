import React, { Fragment, useState, useEffect } from "react";
import useAuth from "../../../../../../../hooks/useAuth";
import OrderStatusTable from "../OrderStatusTable/OrderStatusTable";
import rootAPI from "../../../../../../../configurables";
import axios from "axios";

export default function OrderPending() {
  const { user } = useAuth();
  const [pendingOrders, setPendingOrders] = useState([]);
  const [isSuccess, setIsSuccess] = useState(null);

  const forAdmin = pendingOrders?.map((r) => {
    return (
      { ...r, productDetails: r?.productDetails?.filter((e) => e?.type === 'seed')}
    )
  });
  const forFarmer = pendingOrders?.map((r) => {
    return (
      {
        ...r,
        productDetails: r?.productDetails?.filter((e) => e?.type !== 'seed' && e.farmerId === user['_id'])
      }
    )
  });

  const newForAdmin = forAdmin?.length > 0 && forAdmin?.filter((r) => r?.productDetails?.length > 0);
  const newForFarmer = forFarmer?.length > 0 && forFarmer?.filter((r) => r?.productDetails?.length > 0);

  const loadOrders = async () => {
    await axios
      .get(`${rootAPI}/order_lists`)
      .then((res) => {
        setPendingOrders((pre) => [...pre, ...res.data.filter((r) => r.status === 'pending')]);
      })
      .catch((error) => console.log(error));
  };

  const loadPrebooks = async () => {
    await axios
      .get(`${rootAPI}/all_prebookings`)
      .then((res) => {
        setPendingOrders((pre) => [...pre, ...res.data.filter((r) => r.status === 'pending')]);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    loadOrders();
    if (user.role === "farmar") {
      loadPrebooks();
    }
    setIsSuccess(null);
  }, [user, isSuccess]);
  return (
    <Fragment>
      <h3>Pending Orders</h3>
      {
        user.role === 'admin' && newForAdmin?.length > 0 ? (
          <OrderStatusTable pendingOrders={newForAdmin} isSuccess={isSuccess} setIsSuccess={setIsSuccess} />
        ) : ''
      }
      {
        user.role === 'farmar' && newForFarmer?.length > 0 ? (
          <OrderStatusTable pendingOrders={newForFarmer} isSuccess={isSuccess} setIsSuccess={setIsSuccess} />
        ) : ''
      }
    </Fragment>
  );
}
