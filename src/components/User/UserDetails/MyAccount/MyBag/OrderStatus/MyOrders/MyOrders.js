import React, { Fragment, useState, useEffect } from "react";
import useAuth from "../../../../../../../hooks/useAuth";
import OrderStatusTable from "../OrderStatusTable/OrderStatusTable";
import rootAPI from "../../../../../../../configurables";
import axios from "axios";

export default function MyOrders() {
  const { user } = useAuth();
  const [allOrders, setAllOrders] = useState([]);
  const [isSuccess, setIsSuccess] = useState(null);

  const myOrders = allOrders.filter((r) => r.buyerEmail === user.email)

  const loadOrders = async () => {
    await axios
      .get(`${rootAPI}/order_lists`)
      .then((res) => {
        setAllOrders((pre) => [...pre, ...res.data]);
      })
      .catch((error) => console.log(error));
  };

  const loadPrebooks = async () => {
    await axios
      .get(`${rootAPI}/all_prebookings`)
      .then((res) => {
        setAllOrders((pre) => [...pre, ...res.data]);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    loadOrders();
    loadPrebooks();
    setIsSuccess(null);
  }, [isSuccess]);
  console.log({myOrders})
  return (
    <Fragment>
      <h3>My Orders</h3>
      {
        user.role !== 'admin' && myOrders.length > 0 && <OrderStatusTable myOrders={myOrders} isSuccess={isSuccess} setIsSuccess={setIsSuccess} isMyOrder={true} />
      }
    </Fragment>
  );
}
