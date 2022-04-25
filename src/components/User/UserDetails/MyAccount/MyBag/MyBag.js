import React, { Fragment, useState, useEffect } from "react";
import rootAPI from "../../../../../configurables";
import axios from "axios";
import useAuth from "../../../../../hooks/useAuth";
import OrderStatusTable from "./OrderStatus/OrderStatusTable/OrderStatusTable";

export default function MyBag() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [isSuccess, setIsSuccess] = useState(null);

  const forAdmin = orders?.map((r) => {
    return (
      { ...r, productDetails: r?.productDetails?.filter((e) => e?.type === 'seed')}
    )
  });
  const forFarmer = orders?.map((r) => {
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
        setOrders((pre) => [...pre, ...res.data]);
      })
      .catch((error) => console.log(error));
  };

  const loadPrebooks = async () => {
    await axios
      .get(`${rootAPI}/all_prebookings`)
      .then((res) => {
        setOrders((pre) => [...pre, ...res.data]);
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
      <h3>User Orders</h3>
      {
        user.role === 'admin' && newForAdmin?.length > 0 && (
          <OrderStatusTable pendingOrders={newForAdmin} isSuccess={isSuccess} setIsSuccess={setIsSuccess} />
        )
      }
      {
        user.role === 'farmar' && newForFarmer?.length > 0 && (
          <OrderStatusTable pendingOrders={newForFarmer} isSuccess={isSuccess} setIsSuccess={setIsSuccess} />
        )
      }
    </Fragment>
  );
}
