import axios from "axios";
import React, { useState, useEffect } from "react";
import useAuth from "../../../../../hooks/useAuth";
import OrderStatusCard from "../../../../utilities/OrderStatusCard/OrderStatusCard";
import rootAPI from "../../../../../configurables";

export default function Dashboard() {
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [prebooks, setPrebooks] = useState([]);
  const [statusPending, setStatusPending] = useState(0);
  const [statusShipping, setStatusShipping] = useState(0);
  const [statusCancelled, setStatusCancelled] = useState(0);
  const [statusComplete, setStatusComplete] = useState(0);
  const [orderAPILoaded, setOrderAPILoaded] = useState(false);
  const [prebookAPILoaded, setPrebookAPILoaded] = useState(false);

  const forAdmin = allOrders?.map((r) => {
    return (
      { ...r, productDetails: r?.productDetails?.filter((e) => e?.type === 'seed')}
    )
  });
  const forFarmer = allOrders?.map((r) => {
    return (
      {
        ...r,
        productDetails: r?.productDetails?.filter((e) => e?.type !== 'seed' && e.farmerId === user['_id'])
      }
    )
  });

  const newForAdmin = forAdmin?.length > 0 && forAdmin?.filter((r) => r?.productDetails?.length > 0);
  const newForFarmer = forFarmer?.length > 0 && forFarmer?.filter((r) => r?.productDetails?.length > 0);
  const newForUser = allOrders.filter((r) => r.buyerEmail === user.email);

  const pendingForAdmin = newForAdmin?.length > 0 && newForAdmin?.filter((r) => r?.status === 'pending')?.length;
  const shippedForAdmin = newForAdmin?.length > 0 && newForAdmin?.filter((r) => r?.status === 'shipped')?.length;
  const canceledForAdmin = newForAdmin?.length > 0 && newForAdmin?.filter((r) => r?.status === 'canceled')?.length;
  const paidForAdmin = newForAdmin?.length > 0 && newForAdmin?.filter((r) => r?.status === 'paid')?.length;

  const pendingForFarmer = newForFarmer?.length > 0 && newForFarmer?.filter((r) => r?.status === 'pending')?.length;
  const shippedForFarmer = newForFarmer?.length > 0 && newForFarmer?.filter((r) => r?.status === 'shipped')?.length;
  const canceledForFarmer = newForFarmer?.length > 0 && newForFarmer?.filter((r) => r?.status === 'canceled')?.length;
  const paidForFarmer = newForFarmer?.length > 0 && newForFarmer?.filter((r) => r?.status === 'paid')?.length;

  const pendingForUser = newForUser?.length > 0 && newForUser?.filter((r) => r?.status === 'pending')?.length;
  const shippedForUser = newForUser?.length > 0 && newForUser?.filter((r) => r?.status === 'shipped')?.length;
  const canceledForUser = newForUser?.length > 0 && newForUser?.filter((r) => r?.status === 'canceled')?.length;
  const paidForUser = newForUser?.length > 0 && newForUser?.filter((r) => r?.status === 'paid')?.length;

  const revenueForAdmin = newForAdmin?.length > 0 && newForAdmin?.filter((r) => r?.status === 'paid');
  let totalRevenueAdmin = 0;
  revenueForAdmin?.length > 0 && revenueForAdmin?.forEach(data => {
    totalRevenueAdmin += parseFloat(data?.total);
  });
  const profitForAdmin = totalRevenueAdmin > 0 ? totalRevenueAdmin - (totalRevenueAdmin * 0.50) : 0;

  const revenueForFarmer = newForFarmer?.length > 0 && newForFarmer?.filter((r) => r?.status === 'paid');
  let totalRevenueFarmer = 0;
  revenueForFarmer?.length > 0 && revenueForFarmer?.forEach(data => {
    totalRevenueFarmer += parseFloat(data?.total);
  });
  const profitForFarmer = totalRevenueFarmer > 0 ? totalRevenueFarmer - (totalRevenueFarmer * 0.10) : 0;


  console.log({totalRevenueAdmin, profitForAdmin})

  const loadOrders = async () => {
    await axios
      .get(`${rootAPI}/order_lists`)
      .then((res) => {
        setOrders(res.data);
        setAllOrders((pre) => [...pre, ...res.data]);
        setOrderAPILoaded(true);
      })
      .catch((error) => console.log(error));
  };

  const loadPrebooks = async () => {
    await axios
      .get(`${rootAPI}/all_prebookings`)
      .then((res) => {
        setPrebooks(res.data);
        setAllOrders((pre) => [...pre, ...res.data]);
        setPrebookAPILoaded(true);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    loadOrders();
    if (user.role === "farmar") {
      loadPrebooks();
    }
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
      if (user.role === "admin") {
        orders.map((order) => {
          if (order.isSeedAvailable) {
            if (order.status === "pending") {
              setStatusPending((prev) => prev + 1);
            } else if (order.status === "shipped") {
              setStatusShipping((prev) => prev + 1);
            } else if (order.status === "complete") {
              setStatusCancelled((prev) => prev + 1);
            } else if (order.status === "cancel") {
              setStatusComplete((prev) => prev + 1);
            }
          }
        });
      } else if (user.role === "farmar") {
        orders.map((order) => {
          if (order.isOrganicFoodAvailable) {
            if (order.status === "pending") {
              const farmerSet = new Set([]);
              order.productDetails.map((product) => {
                if (product.farmerId) {
                  farmerSet.add(product.farmerId);
                }
              });
              farmerSet.forEach((farmerId) => {
                if (farmerId === user._id) {
                  setStatusPending((prev) => prev + 1);
                }
              });
            } else if (order.status === "shipped") {
              const farmerSet = new Set([]);
              order.productDetails.map((product) => {
                if (product.farmerId) {
                  farmerSet.add(product.farmerId);
                }
              });
              farmerSet.forEach((farmerId) => {
                if (farmerId === user._id) {
                  setStatusShipping((prev) => prev + 1);
                }
              });
            } else if (order.status === "complete") {
              const farmerSet = new Set([]);
              order.productDetails.map((product) => {
                if (product.farmerId) {
                  farmerSet.add(product.farmerId);
                }
              });
              farmerSet.forEach((farmerId) => {
                if (farmerId === user._id) {
                  setStatusCancelled((prev) => prev + 1);
                }
              });
            } else if (order.status === "cancel") {
              const farmerSet = new Set([]);
              order.productDetails.map((product) => {
                if (product.farmerId) {
                  farmerSet.add(product.farmerId);
                }
              });
              farmerSet.forEach((farmerId) => {
                if (farmerId === user._id) {
                  setStatusComplete((prev) => prev + 1);
                }
              });
            }
          }
        });
      }
    }
  }, [orderAPILoaded, user.role]);

  useEffect(() => {
    if (prebooks.length > 0) {
      prebooks.map((prebook) => {
        if (prebook.status === "pending") {
          const farmerSet = new Set([]);
          prebook.productDetails.map((product) => {
            farmerSet.add(product.farmerId);
          });
          farmerSet.forEach((farmerId) => {
            if (farmerId === user._id) {
              setStatusPending((prev) => prev + 1);
            }
          });
        } else if (prebook.status === "shipped") {
          const farmerSet = new Set([]);
          prebook.productDetails.map((product) => {
            farmerSet.add(product.farmerId);
          });
          farmerSet.forEach((farmerId) => {
            if (farmerId === user._id) {
              setStatusShipping((prev) => prev + 1);
            }
          });
        } else if (prebook.status === "cancel") {
          const farmerSet = new Set([]);
          prebook.productDetails.map((product) => {
            farmerSet.add(product.farmerId);
          });
          farmerSet.forEach((farmerId) => {
            if (farmerId === user._id) {
              setStatusCancelled((prev) => prev + 1);
            }
          });
        } else if (prebook.status === "complete") {
          const farmerSet = new Set([]);
          prebook.productDetails.map((product) => {
            farmerSet.add(product.farmerId);
          });
          farmerSet.forEach((farmerId) => {
            if (farmerId === user._id) {
              setStatusComplete((prev) => prev + 1);
            }
          });
        }
      });
    }
  }, [prebookAPILoaded, user.role]);

  const isAdmin = user.role === 'admin';
  const isFarmer = user.role === 'farmar';
  const isUser = user.role === 'user';

  return (
    <div className="mt-4">
      <h3 className="mb-4">Dashboard</h3>
      <div className="row mt-4">
        {/* pending  */}
        <div className="col-sm-6 col-lg-3">
          <OrderStatusCard
            title="pending order"
            quantity={
              (isAdmin && pendingForAdmin + (pendingForUser || 0))
                || (isFarmer && pendingForFarmer + (pendingForUser || 0))
                || (isUser && (pendingForUser || 0))
                || 0
            }
            textClass="text-warning"
          />
        </div>
        {/* shipped  */}
        <div className="col-sm-6 col-lg-3">
          <OrderStatusCard
            title="shipped order"
            quantity={
              (isAdmin && shippedForAdmin + (shippedForUser || 0))
                || (isFarmer && shippedForFarmer + (shippedForUser || 0))
                || (isUser && (shippedForUser || 0))
                || 0
            }
            textClass="text-info"
          />
        </div>
        {/* cancelled  */}
        <div className="col-sm-6 col-lg-3">
          <OrderStatusCard
            title="cancelled"
            quantity={
              (isAdmin && canceledForAdmin + (canceledForUser || 0))
                || (isFarmer && canceledForFarmer + (canceledForUser || 0))
                || (isUser && (canceledForUser || 0))
                || 0
            }
            textClass="text-danger"
          />
        </div>
        {/* complete  */}
        <div className="col-sm-6 col-lg-3">
          <OrderStatusCard
            title="complete"
            quantity={
              (isAdmin && paidForAdmin + (paidForUser || 0))
                || (isFarmer && paidForFarmer + (paidForUser || 0))
                || (isUser && (paidForUser || 0))
                || 0
            }
            textClass="text-success"
          />
        </div>
        {/* revenue  */}
        {
          !isUser && (
            <div className="col-xs-12 col-md-6">
              <OrderStatusCard
                title="total revenue"
                quantity={
                  (isAdmin && totalRevenueAdmin.toFixed(2) + ' TK')
                    || (isFarmer && totalRevenueFarmer.toFixed(2) + ' TK')
                    || 0
                }
                textClass="text-warning"
              />
            </div>
          )
        }
        {/* profit  */}
        {
          !isUser && (
            <div className="col-xs-12 col-md-6">
              <OrderStatusCard
                title="total profit"
                quantity={
                  (isAdmin && profitForAdmin.toFixed(2) + ' TK')
                    || (isFarmer && profitForFarmer.toFixed(2) + ' TK')
                    || 0
                }
                textClass="text-warning"
              />
            </div>
          )
        }
      </div>
    </div>
  );
}
