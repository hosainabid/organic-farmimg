import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import useAuth from "../../../../../../../hooks/useAuth";
import OrderStatusTable from "../OrderStatusTable/OrderStatusTable";
import rootAPI from "../../../../../../../configurables";

export default function OrderComplete() {
  const { user } = useAuth();
  const [completedOrders, setCompletedOrders] = useState([]);
  const [isSuccess, setIsSuccess] = useState(null);

  const forAdmin = completedOrders?.map((r) => {
    return (
      { ...r, productDetails: r?.productDetails?.filter((e) => e?.type === 'seed')}
    )
  });
  const forFarmer = completedOrders?.map((r) => {
    return (
      { ...r, productDetails: r?.productDetails?.filter((e) => e?.type !== 'seed')}
    )
  });

  const newForAdmin = forAdmin?.length > 0 && forAdmin?.filter((r) => r?.productDetails?.length > 0);
  const newForFarmer = forFarmer?.length > 0 && forFarmer?.filter((r) => r?.productDetails?.length > 0);

  const loadOrders = async () => {
    await axios
      .get(`${rootAPI}/order_lists`)
      .then((res) => {
        console.log({res})
        setCompletedOrders((pre) => [...pre, ...res.data.filter((r) => r.status === 'paid')]);
      })
      .catch((error) => console.log(error));
  };

  const loadPrebooks = async () => {
    await axios
      .get(`${rootAPI}/all_prebookings`)
      .then((res) => {
        setCompletedOrders((pre) => [...pre, ...res.data.filter((r) => r.status === 'paid')]);
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
  console.log({forAdmin, newForAdmin, forFarmer, newForFarmer})
  return (
    <Fragment>
      <h3>Complete Orders</h3>
      {
        user.role === 'admin' && newForAdmin?.length > 0 && <OrderStatusTable shippedOrders={newForAdmin} />
      }
      {
        user.role === 'farmar' && newForFarmer?.length && <OrderStatusTable shippedOrders={newForFarmer} />
      }
    </Fragment>
  );
}
