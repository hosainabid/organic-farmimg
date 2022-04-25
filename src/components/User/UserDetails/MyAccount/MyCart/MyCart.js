import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import useAuth from "../../../../../hooks/useAuth";
import OrganicFoodBag from "./OrganicFoodBag";
import PreOrder from "./PreOrder";
import SeedBag from "./SeedBag";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import rootAPI from "../../../../../configurables";
import StripeCheckout from "react-stripe-checkout";
export default function MyCart() {
	const { v4: uuidv4 } = require("uuid");
	const [subTotal, setSubtotal] = useState(0);
	const [seeds, setSeeds] = useState([]);
	const [prebook, setPrebook] = useState([]);
	const [crops, setCrops] = useState([]);
	const [isPaid, setPaymentSuccess] = useState(false);
	const { user, isCartUpdated, setIsCartUpdated } = useAuth();
	const [quickDelivary, setQuickDelivary] = useState();
	const [isShipOriginalAddress, setIsShipOriginalAddress] = useState();
	const [shippingAddress, setShippingAddress] = useState("");

	const settingSubtotal = () => {
		let seedsPrice = 0;
		if (seeds.length > 0) {
			seeds.map((item) => {
				seedsPrice =
					seedsPrice + parseInt(item.seed.price) * item.quantity;
			});
		}
		let prebookPrice = 0;
		if (prebook.length > 0) {
			prebook.map((item) => {
				prebookPrice =
					prebookPrice +
					parseInt(item.cropDetails.price) * item.quantity;
			});
		}
		let cropsPrice = 0;
		if (crops.length > 0) {
			crops.map((item) => {
				cropsPrice =
					cropsPrice +
					parseInt(item.cropDetails.price) * item.quantity;
			});
		}

		setSubtotal(seedsPrice + prebookPrice + cropsPrice);
	};

	useEffect(() => {
		setSeeds(JSON.parse(localStorage.getItem("organicFoodSeeds")));
		setPrebook(JSON.parse(localStorage.getItem("organicFoodPrebook")));
		setCrops(JSON.parse(localStorage.getItem("organicFood")));
	}, [isCartUpdated]);

	const placeOrder = async () => {
		if (
			!Boolean(shippingAddress.trim()) &&
			!Boolean(isShipOriginalAddress)
		) {
			toast.error("Please provide your shipping address!", {
				position: "top-center",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			return;
		}
		const orderGroupId = uuidv4();

		// prebook order ...
		if (prebook.length) {
			const addedPrebookOrders = JSON.parse(
				localStorage.getItem("organicFoodPrebook")
			);
			const productDetails = addedPrebookOrders.map((item) => {
				return {
					productId: item.cropDetails._id,
					farmerId: item.cropDetails.farmerId,
					productQuantity: item.quantity,
					type: "prebook",
				};
			});
			await axios
				.post(`${rootAPI}/prebook`, {
					orderGroupId,
					productDetails,
					buyerId: user._id,
					buyerName: user.name,
					buyerEmail: user.email,
					buyerMobile: user.number,
					buyerAddress: shippingAddress || user.address,
					total: `${
						Boolean(quickDelivary) ? subTotal + 100 : subTotal
					}`,
					date: new Date().toString(),
					status: "pending",
				})
				.then((res) => {
					if (res.data.isSuccess) {
						localStorage.setItem(
							"organicFoodPrebook",
							JSON.stringify([])
						);
					}
				})
				.catch((error) => console.log(error));
		}

		//  if seed and organic food both available then it will go - if block
		// if seed and organic food both are not available then it will go - else block

		if (seeds.length > 0 && crops.length > 0) {
			const addedSeedOrders = JSON.parse(
				localStorage.getItem("organicFoodSeeds")
			);
			const productDetails1 = addedSeedOrders.map((item) => {
				return {
					productId: item.seed._id,
					productQuantity: item.quantity,
					type: "seed",
				};
			});
			const addedOFOrders = JSON.parse(
				localStorage.getItem("organicFood")
			);
			const productDetails2 = addedOFOrders.map((item) => {
				return {
					productId: item.cropDetails._id,
					productQuantity: item.quantity,
					farmerId: item.cropDetails.farmerId,
					type: "crop",
				};
			});
			await axios
				.post(`${rootAPI}/place_order`, {
					orderGroupId,
					productDetails: [...productDetails1, ...productDetails2],
					buyerName: user.name,
					buyerEmail: user.email,
					buyerId: user["_id"],
					buyerMobile: user.number,
					buyerAddress: shippingAddress || user.address,
					total: `${
						Boolean(quickDelivary) ? subTotal + 100 : subTotal
					}`,
					date: new Date().toString(),
					isSeedAvailable: true,
					isOrganicFoodAvailable: true,
					status: "pending",
				})
				.then((res) => {
					console.log(res);
					if (res.data.isSuccess) {
						localStorage.setItem(
							"organicFoodSeeds",
							JSON.stringify([])
						);
						localStorage.setItem("organicFood", JSON.stringify([]));
					}
				})
				.catch((error) => {
					console.log(error);
				});
		} else {
			// seed order
			if (seeds.length) {
				const addedSeedOrders = JSON.parse(
					localStorage.getItem("organicFoodSeeds")
				);
				const productDetails = addedSeedOrders.map((item) => {
					return {
						productId: item.seed._id,
						productQuantity: item.quantity,
						type: "seed",
					};
				});
				console.log(productDetails);
				await axios
					.post(`${rootAPI}/place_order`, {
						orderGroupId,
						productDetails,
						buyerName: user.name,
						buyerEmail: user.email,
						buyerId: user["_id"],
						buyerMobile: user.number,
						buyerAddress: shippingAddress || user.address,
						total: `${
							Boolean(quickDelivary) ? subTotal + 100 : subTotal
						}`,
						date: new Date().toString(),
						status: "pending",
						isSeedAvailable: true,
						isOrganicFoodAvailable: false,
					})
					.then((res) => {
						console.log(res);
						if (res.data.isSuccess) {
							localStorage.setItem(
								"organicFoodSeeds",
								JSON.stringify([])
							);
						}
					})
					.catch((error) => {
						console.log(error);
					});
			}

			// OF order

			if (crops.length) {
				const addedOFOrders = JSON.parse(
					localStorage.getItem("organicFood")
				);
				const productDetails = addedOFOrders.map((item) => {
					return {
						productId: item.cropDetails._id,
						productQuantity: item.quantity,
						type: "crop",
					};
				});

				console.log(productDetails);

				await axios
					.post(`${rootAPI}/place_order`, {
						orderGroupId,
						productDetails,
						buyerName: user.name,
						buyerEmail: user.email,
						buyerId: user._id,
						buyerMobile: user.number,
						buyerAddress: shippingAddress || user.address,
						total: `${
							Boolean(quickDelivary) ? subTotal + 100 : subTotal
						}`,
						date: new Date().toString(),
						status: "pending",
						isSeedAvailable: false,
						isOrganicFoodAvailable: true,
					})
					.then((res) => {
						console.log(res);
						if (res.data.isSuccess) {
							localStorage.setItem(
								"organicFood",
								JSON.stringify([])
							);
						}
					})
					.catch((error) => {
						console.log(error);
					});
			}
		}

		setIsCartUpdated((prev) => !prev);
		toast.success("Order is successfully placed", {
			position: "top-center",
			autoClose: 4000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	};

	useEffect(() => {
		settingSubtotal();
	}, [seeds, prebook, crops]);
	return (
		<div className="my-4">
			<h3 className="text-center">My Cart</h3>
			<ToastContainer />
			{Boolean(subTotal) ? (
				<div className="row">
					<div className="col-xl-8 col-lg-12">
						<SeedBag />
						<PreOrder />
						<OrganicFoodBag />
					</div>
					<div className="col-xl-4  col-lg-12">
						<div className="my-4 p-lg-5 p-md-0">
							<h4 className="text-center mb-4">
								Purches Summery
							</h4>
							<div className="table-responsive">
								<table className="table table-borderless order-summery-table">
									<tbody>
										<tr>
											<td>Sub-Total</td>
											<td>{subTotal}/tk</td>
										</tr>
										{Boolean(seeds.length) && (
											<tr>
												<td>Seeds/Fertilizers</td>
												<td>{seeds.length} item(s)</td>
											</tr>
										)}
										{Boolean(crops.length) && (
											<tr>
												<td>Organic Foods</td>
												<td>{crops.length} item(s)</td>
											</tr>
										)}
										{Boolean(prebook.length) && (
											<tr>
												<td>Pre-Order Items</td>
												<td>
													{prebook.length} item(s)
												</td>
											</tr>
										)}
									</tbody>
								</table>
							</div>
							<hr />
							<div className="form-check">
								<input
									className="form-check-input"
									type="checkbox"
									id="quickShip"
									onChange={(e) =>
										setQuickDelivary(e.target.checked)
									}
								/>
								<label
									className="form-check-label"
									htmlFor="quickShip"
								>
									Get Delivary within minimal time.
								</label>
							</div>
							<p className="text-center my-4 h5">
								Total:{" "}
								{Boolean(quickDelivary)
									? subTotal + 100
									: subTotal}
								/tk
							</p>

							{/* <div className="paymet-area text-center">
          <StripeCheckout stripeKey="pk_test_51Kp4FSIl8Xfw3K0TXt9M2yIikCsZyc6rcQ2QgVYhb9v2tVurMV7Ok4fUDMnlEIJqkrvKUnkH5ObEhADjhR5CmdZK0020fXqYx1" />
        </div> */}

							<div className="my-4 border shadow bg-white rounded-3">
								{Boolean(user.address) ? (
									<Fragment>
										<p className="h5 px-2 py-3">
											Your corrent address is:{" "}
											{user.address}
										</p>
										<div className="form-check mx-2">
											<input
												className="form-check-input"
												type="checkbox"
												id="shippingAddress"
												onChange={(e) =>
													setIsShipOriginalAddress(
														e.target.checked
													)
												}
											/>
											<label
												className="form-check-label"
												htmlFor="shippingAddress"
											>
												Do you want to ship there?
											</label>
										</div>
									</Fragment>
								) : (
									<Fragment>
										<p className="h5 px-2 py-3">
											Your address is not provided before
										</p>
										<div className="m-2">
											<label
												className="h6"
												htmlFor="shippingAddress"
											>
												Shipping Address:
											</label>
											<textarea
												id="shippingAddress"
												className="form-control mt-1"
												rows={4}
												value={shippingAddress}
												onChange={(e) =>
													setShippingAddress(
														e.target.value
													)
												}
											></textarea>
										</div>
									</Fragment>
								)}

								{Boolean(
									Boolean(user.address) &&
										!isShipOriginalAddress
								) ? (
									<div className="m-2">
										<label
											className="h6"
											htmlFor="shippingAddress"
										>
											Shipping Address:
										</label>
										<textarea
											id="shippingAddress"
											className="form-control mt-1"
											rows={4}
											value={shippingAddress}
											onChange={(e) =>
												setShippingAddress(
													e.target.value
												)
											}
										></textarea>
									</div>
								) : (
									""
								)}

								<div className="mx-2 my-4">
									{isPaid ? (
										<button
											onClick={placeOrder}
											className="myBtn w-100 h5 py-2"
										>
											Place order
										</button>
									) : (
										<div>
											<p className="text-warning">
												Please pay first to place Order
											</p>
											<StripeCheckout
												token={(token) =>
													setPaymentSuccess(true)
												}
												// amount={product.price * 100 * quantity}
												amount={
													(Boolean(quickDelivary)
														? subTotal + 100
														: subTotal) * 100
												}
												currency="BDT"
												stripeKey="pk_test_51IZRWSKMRot2hgd9XemY5rgpL0HFUWREI1HvRZIcUdH1a6m5xbaT8EPLuPe5iKPqNXAqrIw8bfJjwC8rbbq4Sy4400hZjx6lwV"
											/>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="my-4">
					<p className="h5 text-warning text-center">
						No product is added to shopping cart
					</p>
				</div>
			)}
		</div>
	);
}
