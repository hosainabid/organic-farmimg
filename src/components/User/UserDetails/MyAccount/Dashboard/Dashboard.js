import axios from "axios";
import React, { useState, useEffect } from "react";
import useAuth from "../../../../../hooks/useAuth";
import OrderStatusCard from "../../../../utilities/OrderStatusCard/OrderStatusCard";
import rootAPI from "../../../../../configurables";

export default function Dashboard() {
	const { user } = useAuth();

	const [orders, setOrders] = useState([]);
	const [prebooks, setPrebooks] = useState([]);
	const [statusPending, setStatusPending] = useState(0);
	const [statusShipping, setStatusShipping] = useState(0);
	const [statusCancelled, setStatusCancelled] = useState(0);
	const [statusComplete, setStatusComplete] = useState(0);
	const [orderAPILoaded, setOrderAPILoaded] = useState(false);
	const [prebookAPILoaded, setPrebookAPILoaded] = useState(false);

	const loadOrders = async () => {
		await axios
			.get(`${rootAPI}/order_lists`)
			.then((res) => {
				setOrders(res.data);
				setOrderAPILoaded(true);
			})
			.catch((error) => console.log(error));
	};

	const loadPrebooks = async () => {
		await axios
			.get(`${rootAPI}/order_lists`)
			.then((res) => {
				setPrebooks(res.data);
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
							const farmerSet = new Set();
							orders.productDetails.map((product) => {
								farmerSet.add(product.farmerId);
							});

							farmerSet.filter((farmerId) => {
								if (farmerId === user._id) {
									setStatusPending((prev) => prev + 1);
								}
							});
						} else if (order.status === "shipped") {
							setStatusShipping((prev) => prev + 1);
						} else if (order.status === "complete") {
							setStatusCancelled((prev) => prev + 1);
						} else if (order.status === "cancel") {
							setStatusComplete((prev) => prev + 1);
						}
					}
				});
			}
		}
	}, [orderAPILoaded, user.role]);

	useEffect(() => {
		if (prebooks.length > 0) {
			prebooks.map((prebook) => {
				if (prebook.productDetails.farmerId === user.role) {
					if (prebook.status === "pending") {
						setStatusPending((prev) => prev + 1);
					} else if (prebook.status === "shipped") {
						setStatusShipping((prev) => prev + 1);
					} else if (prebook.status === "complete") {
						setStatusCancelled((prev) => prev + 1);
					} else if (prebook.status === "cancel") {
						setStatusComplete((prev) => prev + 1);
					}
				}
			});
		}
	}, [prebookAPILoaded, user.role]);

	return (
		<div className="mt-4">
			<h3 className="mb-4">Dashboard</h3>
			<div className="row mt-4">
				{/* pending  */}
				<div className="col-sm-6 col-lg-3">
					<OrderStatusCard
						title="pending order"
						quantity={statusPending}
						textClass="text-warning"
					/>
				</div>
				{/* shipped  */}
				<div className="col-sm-6 col-lg-3">
					<OrderStatusCard
						title="shipped order"
						quantity={statusShipping}
						textClass="text-info"
					/>
				</div>
				{/* cancelled  */}
				<div className="col-sm-6 col-lg-3">
					<OrderStatusCard
						title="cancelled"
						quantity={statusCancelled}
						textClass="text-danger"
					/>
				</div>
				{/* complete  */}
				<div className="col-sm-6 col-lg-3">
					<OrderStatusCard
						title="complete"
						quantity={statusComplete}
						textClass="text-success"
					/>
				</div>
			</div>
		</div>
	);
}
